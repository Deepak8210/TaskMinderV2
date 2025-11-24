import Badge from "../components/Badge";
import { MdSwapVert } from "react-icons/md";
import CustomCheckbox from "../components/CustomCheckbox";
import { formatDate } from "../utils/helpers";
import { taskList } from "../data";

const Card = ({ task }) => {
  const isCompletedStatus = task?.status.toLowerCase() === "completed";
  return (
    <div
      className={`flex items-center gap-4 p-4 border border-border-dark ${
        isCompletedStatus ? "bg-[#15191d]" : "bg-card-dark"
      }  rounded-lg hover:shadow-md hover:border-primary/50 transition-all`}
    >
      <CustomCheckbox />
      <p
        className={`flex-1  font-medium ${
          isCompletedStatus ? "line-through text-gray-500" : "text-text-dark"
        }`}
      >
        {task?.name}
      </p>
      <div className="flex items-center gap-4">
        <Badge priority={task?.priority} className="font-semibold" size="md">
          {task?.priority}
        </Badge>

        <span
          className={`${
            isCompletedStatus
              ? "line-through text-gray-500"
              : "dark:text-muted-dark"
          } text-sm  `}
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

const Today = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-text-dark">Today</h1>
          <p className="text-muted-dark">Monday, October 28</p>
        </div>
        <button className="flex text-text-dark items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-card-dark text-sm font-semibold border border-border-dark hover:bg-primary/10 gap-2">
          <MdSwapVert size={18} />
          <span className="truncate">Sort by Due Date</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto rounded-t-lg pr-1">
        {taskList.map((task) => (
          <Card task={task} />
        ))}
      </div>
    </div>
  );
};

export default Today;
