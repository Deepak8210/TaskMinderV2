import {
  Calendar,
  ChevronDown,
  CircleCheck,
  CircleCheckBig,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { MdSwapVert } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import Chart from "react-apexcharts";
import ApexChart from "../components/ApexChart";
import Badge from "../components/Badge";

const cardList = [
  {
    id: 1,
    label: "Tasks Completed",
    value: 24,
    icon: CircleCheckBig,
    iconClass: "bg-success/10 text-success",
  },
  {
    id: 2,
    label: "Productivity Score",
    value: 85,
    icon: TrendingUp,
    iconClass: "bg-primary/10 text-primary",
  },
  {
    id: 3,
    label: "Tasks In Progress",
    value: 12,
    icon: FaHourglassHalf,
    iconClass: "bg-priority-medium/20 text-priority-medium",
  },
];

const series = [22, 56, 22]; // [High, Medium, Low]

const options = {
  labels: ["High", "Medium", "Low"],
  colors: ["#e25b56", "#f0b14a", "#59c7ea"],
  chart: {
    type: "donut",
    background: "transparent",
  },
  stroke: {
    width: 6,
    colors: ["#1e2328"], // background color to create slice gap
  },
  plotOptions: {
    pie: {
      donut: {
        size: "70%",
      },
    },
  },
  dataLabels: { enabled: false },
  legend: {
    show: true,
    position: "right",
    labels: { colors: "#fff" },
    itemMargin: {
      horizontal: 10,
      vertical: 6,
    },
    markers: {
      width: 12,
      height: 12,
    },
  },
};

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto pr-1">
      <div className="flex justify-between mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-text-dark">
            Analytics Dashboard
          </h1>
          <div className="flex">
            <p className="text-muted-dark">
              Here's your performance summary for this week.
            </p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 h-10 px-4 text-sm font-semibold text-text-dark bg-card-dark border border-border-dark rounded-lg hover:bg-primary/10 overflow-hidden">
          <Calendar size={18} />
          <span className="truncate">This Week</span>
          <ChevronDown />
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {cardList?.map((cardItem) => {
          const Icon = cardItem?.icon;
          return (
            <div className=" border rounded-lg bg-card-dark p-6 border-border-dark">
              <div key={cardItem?.id} className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${cardItem.iconClass}`}>
                  <span className="text-3xl">
                    <Icon strokeWidth={3} size={30} />
                  </span>
                </div>
                <div>
                  <p class="text-muted-dark text-sm">{cardItem?.label}</p>
                  <p class="text-3xl text-text-dark font-bold">
                    {cardItem?.value}{" "}
                    {cardItem?.label?.includes("Productivity Score") && (
                      <span>%</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <div className="col-span-3 border rounded-lg bg-card-dark p-6 border-border-dark">
          <h3 className="text-lg text-text-dark font-bold mb-1">
            Productivity
          </h3>
          <p className="text-muted-dark text-sm mb-4">
            You've completed 24 out of 28 tasks this week.
          </p>
          <div class="w-full bg-background-dark rounded-full h-4">
            <div class="bg-primary h-4 rounded-full w-[80%]"></div>
          </div>
        </div>
        <div className="col-span-2 border rounded-lg bg-card-dark p-6 border-border-dark">
          <h3 class="text-lg text-text-dark font-bold mb-4">
            Priorities Breakdown
          </h3>
          <div className="flex items-center justify-center h-64">
            <ApexChart
              type="donut"
              width={400}
              height={400}
              series={series}
              options={options}
            />
          </div>
        </div>
        <div className=" border rounded-lg bg-card-dark p-6 border-border-dark">
          <h3 className="text-lg text-text-dark font-bold mb-4">
            Upcoming Deadlines
          </h3>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="">
                <p className="font-medium text-text-dark">
                  Launch new marketing campaign
                </p>
                <p className="text-sm text-muted-dark">Due in 2 days</p>
              </div>
              <Badge priority="high" className="font-semibold">
                High
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
