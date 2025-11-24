import React from "react";
import { MdSwapVert } from "react-icons/md";
import {
  formatDate,
  getWeekStartEnd,
  groupTasksForWeek,
} from "../utils/helpers";
import { taskList } from "../data";
import CustomCheckbox from "../components/CustomCheckbox";
import Badge from "../components/Badge";

const groupedTasks = groupTasksForWeek(taskList);

const TaskCard = ({ task }) => {
  const isCompleted = task?.status?.toLowerCase() === "completed";
  return (
    <div
      className={`flex items-center gap-4 p-4 border border-border-dark ${
        isCompleted ? "bg-[#15191d]" : "bg-card-dark"
      } rounded-lg hover:shadow-md hover:border-primary/50 transition-all`}
    >
      <CustomCheckbox />
      <p
        className={`flex-1 font-medium ${
          isCompleted ? "line-through text-gray-500" : "text-text-dark"
        }`}
      >
        {task?.name}
      </p>
      <div className="flex items-center gap-4">
        <Badge priority={task?.priority} className="font-semibold" size="md">
          {task?.priority}
        </Badge>
        <span
          className={`text-sm ${
            isCompleted ? "line-through text-gray-500" : "dark:text-muted-dark"
          }`}
        >
          {formatDate(task?.dueDate)}
        </span>
        <Badge status={task?.status} size="md">
          {task?.status}
        </Badge>
      </div>
    </div>
  );
};

const Weekly = () => {
  const { weekStart, weekEnd } = getWeekStartEnd();

  return (
    <div className="flex flex-col h-full overflow-y-auto pr-1">
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
        <button className="flex items-center justify-center gap-2 h-10 px-4 text-sm font-semibold text-text-dark bg-card-dark border border-border-dark rounded-lg hover:bg-primary/10 overflow-hidden">
          <MdSwapVert size={18} />
          <span className="truncate">Sort by Due Date</span>
        </button>
      </div>

      <div className="space-y-6">
        {groupedTasks?.map((group) => (
          <div key={group?.date ?? group?.label} className="space-y-2">
            <h2 className="text-lg font-semibold text-text-dark">
              {group?.label}{" "}
              <span className="text-base font-normal text-muted-dark">
                - {formatDate(group?.date, "mixed")}
              </span>
            </h2>
            <div className="space-y-3">
              {group?.tasks?.map((taskItem) => (
                <TaskCard
                  key={taskItem?.id ?? taskItem?.name ?? Math.random()}
                  task={taskItem}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weekly;
