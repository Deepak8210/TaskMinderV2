import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Bell, Plus } from "lucide-react";
import Button from "./Button";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className=" p-4 border-b border-border-dark flex justify-between">
      <SearchBar />
      <div className="flex items-center gap-5">
        <button className="hover:bg-card-dark rounded-full p-3 transition-colors">
          <Bell className="text-muted-dark" />
        </button>

        <Button onClick={() => navigate("/tasks/new")}>
          <Plus className="text-white" />{" "}
          <span className="truncate text-white">Add Task</span>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
