import { MdSwapVert } from "react-icons/md";
import Card from "../components/Card";
import { taskList } from "../data";

const highPriorityList = taskList.filter(
  (tasks) => tasks?.priority.toLowerCase() === "high"
);
console.log(highPriorityList);

const HighPriority = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto pr-1">
      <div className="flex justify-between mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-text-dark">High Priority</h1>
          <div className="flex">
            <p className="text-muted-dark">All tasks marked as high priority</p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 h-10 px-4 text-sm font-semibold text-text-dark bg-card-dark border border-border-dark rounded-lg hover:bg-primary/10 overflow-hidden">
          <MdSwapVert size={18} />
          <span className="truncate">Sort by Due Date</span>
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        {highPriorityList.map((task) => (
          <Card task={task} />
        ))}
      </div>
    </div>
  );
};

export default HighPriority;
