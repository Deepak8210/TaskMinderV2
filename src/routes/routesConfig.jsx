import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Today from "../pages/Today";
import TaskForm from "../pages/TaskForm";
import Weekly from "../pages/Weekly";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
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
    ],
  },
]);

export default router;
