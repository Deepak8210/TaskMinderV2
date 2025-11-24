import React from "react";
import { MdSwapVert } from "react-icons/md";
import {
  formatDate,
  getWeekStartEnd,
  groupTasksForWeek,
} from "../utils/helpers";
import { taskList } from "../data";

const weeklyTaskList = groupTasksForWeek(taskList);
console.log(weeklyTaskList);

const Weekly = () => {
  const { weekStart, weekEnd } = getWeekStartEnd();
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-text-dark">This Week</h1>
          <div className="flex">
            <p className="text-muted-dark">
              {formatDate(weekStart, "full-month")}
            </p>
            <span className="px-1 text-muted-dark">-</span>
            <p className="text-muted-dark">
              {formatDate(weekEnd, "full-month")}
            </p>
          </div>
        </div>
        <button className="flex text-text-dark items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-card-dark text-sm font-semibold border border-border-dark hover:bg-primary/10 gap-2">
          <MdSwapVert size={18} />
          <span className="truncate">Sort by Due Date</span>
        </button>
      </div>
    </div>
  );
};

export default Weekly;
