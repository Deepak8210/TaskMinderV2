import {
  format,
  startOfWeek,
  endOfWeek,
  isToday,
  isYesterday,
  isTomorrow,
  differenceInCalendarDays,
  parseISO,
  isValid,
  addDays,
  isWithinInterval,
} from "date-fns";

export function formatDate(date, type = "default") {
  const d = new Date(date);

  switch (type) {
    case "full":
      return format(d, "EEEE, MMMM d"); // Monday, October 28

    case "full-month":
      return format(d, "MMMM d"); // October 28

    case "short":
      return format(d, "MMM d"); // Oct 28

    case "mixed":
      return format(d, "EEEE, MMM d"); // Monday, Oct 28

    case "day-first":
      return format(d, "d MMM"); // 28 Oct

    case "with-year":
      return format(d, "MMM d, yyyy"); // Oct 28, 2025

    default:
      return format(d, "MMM d"); // Fallback: Oct 28
  }
}

export const getWeekStartEnd = () => {
  const today = new Date();

  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 }); // Sunday

  return {
    weekStart,
    weekEnd,
  };
};

export function getDateLabel(dateString) {
  const date = parseISO(dateString);
  const today = new Date();

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  if (isTomorrow(date)) return "Tomorrow";

  const diff = differenceInCalendarDays(date, today);

  // within next 7 days → show weekday (Mon, Tue, etc.)
  if (diff > 1 && diff < 7) {
    return format(date, "EEEE"); // Full weekday name
  }

  // fallback → formatted date
  return format(date, "MMM d"); // "Oct 28"
}

/**
 * Group tasks for a given week and return ordered groups:
 *  - weekday names for days before Yesterday (chronological)
 *  - Yesterday
 *  - Today
 *  - Tomorrow
 *  - weekday names for days after Tomorrow (chronological)
 *
 * @param {Array} tasks - [{ id, name, dueDate: "YYYY-MM-DD" | Date, ... }, ...]
 * @param {Object} opts
 *   - weekStart: Date|string (optional)
 *   - weekEnd: Date|string (optional)
 *   - weekStartsOn: number (0=Sunday,1=Monday) - passed only if you want to compute week start/end
 *
 * @returns {Array} groups: [{ label: 'Today'|'Monday'|..., date: Date, tasks: [...] }, ...]
 */
export function groupTasksForWeek(tasks = [], opts = {}) {
  const { weekStart: optStart, weekEnd: optEnd } = opts;

  // compute weekStart/weekEnd with fallback to helper
  const { weekStart: defaultStart, weekEnd: defaultEnd } = getWeekStartEnd();
  const weekStart = optStart
    ? optStart instanceof Date
      ? optStart
      : parseISO(optStart)
    : defaultStart;
  const weekEnd = optEnd
    ? optEnd instanceof Date
      ? optEnd
      : parseISO(optEnd)
    : defaultEnd;

  // normalize and filter tasks that fall inside the week interval
  const inWeekTasks = tasks
    .map((t) => {
      const d =
        t.dueDate instanceof Date ? t.dueDate : parseISO(String(t.dueDate));
      return { ...t, __date: isValid(d) ? d : null };
    })
    .filter(
      (t) =>
        t.__date &&
        isWithinInterval(t.__date, { start: weekStart, end: weekEnd })
    );

  if (inWeekTasks.length === 0) return [];

  // group tasks by dayKey (yyyy-MM-dd)
  const tasksByDay = {};
  inWeekTasks.forEach((t) => {
    const key = format(t.__date, "yyyy-MM-dd");
    if (!tasksByDay[key]) tasksByDay[key] = [];
    tasksByDay[key].push(t);
  });

  // precompute special days
  const today = new Date();
  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, 1);

  // collect three buckets of dates that have tasks
  const beforeYesterday = []; // days < yesterday
  const middle = []; // yesterday, today, tomorrow if present (we'll ensure ordering)
  const afterTomorrow = []; // days > tomorrow

  // iterate through the week dates and classify
  for (let d = new Date(weekStart); d <= weekEnd; d = addDays(d, 1)) {
    const key = format(d, "yyyy-MM-dd");
    const items = tasksByDay[key];
    if (!items) continue;

    // compare day to yesterday/today/tomorrow
    if (format(d, "yyyy-MM-dd") === format(yesterday, "yyyy-MM-dd")) {
      middle.push({ date: new Date(d), tasks: items, type: "yesterday" });
    } else if (format(d, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")) {
      middle.push({ date: new Date(d), tasks: items, type: "today" });
    } else if (format(d, "yyyy-MM-dd") === format(tomorrow, "yyyy-MM-dd")) {
      middle.push({ date: new Date(d), tasks: items, type: "tomorrow" });
    } else if (d < yesterday) {
      beforeYesterday.push({ date: new Date(d), tasks: items });
    } else if (d > tomorrow) {
      afterTomorrow.push({ date: new Date(d), tasks: items });
    }
  }

  // sort before/after buckets chronologically ascending (already by loop, but ensure stable)
  // assemble final ordered groups
  const groups = [];

  // helper to push with label
  const pushGroup = ({ date, tasks: dayTasks, type }) => {
    let label;
    if (type === "yesterday") label = "Yesterday";
    else if (type === "today") label = "Today";
    else if (type === "tomorrow") label = "Tomorrow";
    else label = format(date, "EEEE"); // full weekday name

    groups.push({
      label,
      date,
      tasks: dayTasks,
    });
  };

  // before yesterday
  beforeYesterday.forEach(pushGroup);

  // ensure middle order exactly: Yesterday, Today, Tomorrow
  const findMiddle = (t) => middle.find((m) => m.type === t);
  ["yesterday", "today", "tomorrow"].forEach((t) => {
    const m = findMiddle(t);
    if (m) pushGroup(m);
  });

  // after tomorrow
  afterTomorrow.forEach(pushGroup);

  return groups;
}
