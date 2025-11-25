import { MdSwapVert } from "react-icons/md";
import { taskList } from "../data";
import Card from "../components/Card";

const Today = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto pr-1">
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

      <div className="flex flex-1 flex-col gap-3">
        {taskList.map((task) => (
          <Card task={task} />
        ))}
      </div>
    </div>
  );
};

export default Today;
