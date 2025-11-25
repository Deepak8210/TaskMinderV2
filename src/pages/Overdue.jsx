import { MdSwapVert } from "react-icons/md";
import { taskList } from "../data";
import Card from "../components/Card";

const overdueList = taskList.filter((task) => {
  const due = new Date(task.dueDate);
  return due < new Date() && task.status?.toLowerCase() !== "completed";
});

const Overdue = () => {
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
