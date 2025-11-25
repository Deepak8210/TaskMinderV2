import React from "react";
import { formatDate, getWeekStartEnd } from "../utils/helpers";
import { MdSwapVert } from "react-icons/md";
import { taskList } from "../data";
import CustomCheckbox from "../components/CustomCheckbox";
import Badge from "../components/Badge";
import { AlertCircle } from "lucide-react";

const overdueList = taskList.filter((task) => {
  const due = new Date(task.dueDate);
  return due < new Date() && task.status?.toLowerCase() !== "completed";
});

const Card = ({ task }) => {
  const isCompleted = task?.status?.toLowerCase() === "completed";
  const isOverdue = new Date(task?.dueDate) < new Date() && !isCompleted;

  return (
    <div
      className={`flex items-center gap-4 p-4 border 
  ${isCompleted ? "bg-[#15191d]" : isOverdue ? "bg-red-900/20" : "bg-card-dark"}
  rounded-lg hover:shadow-md hover:border-primary/50 transition-all 
  ${isOverdue ? "border-red-500/30" : "border-border-dark"}
`}
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
        {isOverdue ? (
          <Badge status="overdue" size="md" className="flex items-center gap-1">
            <span>
              <AlertCircle size={15} />
            </span>{" "}
            Overdue
          </Badge>
        ) : (
          <Badge status={task?.status} size="md">
            {task?.status}
          </Badge>
        )}
      </div>
    </div>
  );
};

const Overdue = () => {
  const { weekStart, weekEnd } = getWeekStartEnd();

  return (
    <div className="flex flex-col h-full overflow-y-auto pr-1">
      <div className="flex justify-between mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-text-dark">Overdue</h1>
          <div className="flex">
            <p className="text-muted-dark">
              Tasks that are passed their due date
            </p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 h-10 px-4 text-sm font-semibold text-text-dark bg-card-dark border border-border-dark rounded-lg hover:bg-primary/10 overflow-hidden">
          <MdSwapVert size={18} />
          <span className="truncate">Sort by Due Date</span>
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        {overdueList.map((task) => (
          <Card task={task} />
        ))}
      </div>
    </div>
  );
};

export default Overdue;
