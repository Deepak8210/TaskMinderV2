import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Today from "../pages/Today";
import TaskForm from "../pages/TaskForm";
import Weekly from "../pages/Weekly";
import Overdue from "../pages/Overdue";
import HighPriority from "../pages/HighPriority";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "tasks/today",
        element: <Today />,
      },
      {
        path: "tasks/new",
        element: <TaskForm />,
      },
      {
        path: "tasks/weekly",
        element: <Weekly />,
      },
      {
        path: "tasks/overdue",
        element: <Overdue />,
      },
      {
        path: "tasks/high-priority",
        element: <HighPriority />,
      },
    ],
  },
]);

export default router;
