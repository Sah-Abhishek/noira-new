import React, { useEffect, useState } from "react";
import axios from "axios";

import sessionIcon from "../../assets/icons/sessions.svg";
import clockIcon from "../../assets/icons/clock.svg";
import chartIcon from "../../assets/icons/chart.svg";
import starIcon from "../../assets/icons/star.svg";

import StatusCard from "./StatusCard.jsx";
import StatusCardsRowSkeleton from "./StatusCardsRowSkeleton.jsx";

const StatusCardsRow = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const therapistId = localStorage.getItem("therapistId")
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/therapist/dashboard/${therapistId}`);
        console.log("This is the resposne for status card: ", res.data);
        setDashboardData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    if (therapistId) {
      fetchDashboardData();
    }
  }, [therapistId,]);

  if (!dashboardData) {
    return (
      < div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 gap-6 w-full" >
        <StatusCardsRowSkeleton />
        <StatusCardsRowSkeleton />
        <StatusCardsRowSkeleton />
        <StatusCardsRowSkeleton />
      </div > // you can replace with a skeleton/loader
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 gap-6 w-full">
      <StatusCard
        title="Today's Sessions"
        value={dashboardData.todaysSessions ?? 0}
        color="text-yellow-400"
        icon={sessionIcon}
      />
      <StatusCard
        title="Pending Requests"
        value={dashboardData.pendingRequests ?? 0}
        color="text-yellow-500"
        icon={clockIcon}
      />
      <StatusCard
        title="This Week"
        value={dashboardData.weekSessions ?? 0}
        color="text-green-400"
        icon={chartIcon}
      />
      <StatusCard
        title="Rating"
        value={dashboardData.averageRating?.toFixed(1) ?? "0.0"}
        color="text-yellow-300"
        icon={starIcon}
      />
    </div>
  );
};

export default StatusCardsRow;
