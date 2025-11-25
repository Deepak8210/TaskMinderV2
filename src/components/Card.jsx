import { formatDate } from "../utils/helpers";
import Badge from "./Badge";
import CustomCheckbox from "./CustomCheckbox";
import { AlertCircle } from "lucide-react";

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

export default Card;
