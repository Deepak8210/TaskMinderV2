import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import CustomDropdown from "../components/CustomDropdown";
import CustomDatePicker from "../components/CustomDatePicker";
import Button from "../components/Button";

const options = ["Work", "Personal Project", "Home", "Home", "Home", "Home"];

const TaskForm = () => {
  const [category, setCategory] = useState("");
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex justify-between mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-text-dark">Add New Task</h1>
          <p className="text-muted-dark">
            Fill out the details below to create a new task.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center">
        <div className=" bg-card-dark border border-border-dark rounded-xl p-8 max-w-3xl w-full">
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="task-title"
                className="text-sm font-medium text-text-dark"
              >
                Task Title
              </label>
              <input
                type="text"
                className="form-inputs "
                placeholder="e.g., Finalize quarterly report"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="task-notes"
                className="text-sm font-medium text-text-dark"
              >
                Notes
              </label>
              <textarea
                className="form-inputs"
                placeholder="Add any additional details..."
                rows="4"
              />
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="due-date"
                  className="text-sm font-medium text-text-dark"
                >
                  Due Date
                </label>

                <CustomDatePicker />
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-text-dark"
                >
                  Category / List
                </label>
                <CustomDropdown
                  options={options}
                  value={category}
                  onChange={(val) => setCategory(val)}
                  className="form-inputs"
                />
              </div>
            </div>
            <div>
              <label className="block text-text-dark text-sm font-medium mb-1.5">
                Priority Level
              </label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 cursor-pointer p-3 px-4 rounded-lg border-2 border-priority-high/50 bg-priority-high/10 has-checked:bg-priority-high/20 has-checked:border-priority-high">
                  <input
                    className="radio-priority-high"
                    name="priority"
                    type="radio"
                    value="high"
                  />
                  <span className="font-semibold text-sm text-priority-high">
                    High
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-3 px-4 rounded-lg border-2 border-priority-medium/50 bg-priority-medium/10 has-checked:bg-priority-medium/20 has-checked:border-priority-medium">
                  <input
                    className="radio-priority-medium"
                    name="priority"
                    type="radio"
                    value="medium"
                  />
                  <span className="font-semibold text-sm text-priority-medium">
                    Medium
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-3 px-4 rounded-lg border-2 border-priority-low/50 bg-priority-low/10 has-checked:bg-priority-low/20 has-checked:border-priority-low">
                  <input
                    className="radio-priority-low"
                    name="priority"
                    type="radio"
                    value="low"
                  />
                  <span className="font-semibold text-sm text-priority-low">
                    Low
                  </span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" className="text-sm">
                Cancel
              </Button>
              <Button className="text-sm">Create Task</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
