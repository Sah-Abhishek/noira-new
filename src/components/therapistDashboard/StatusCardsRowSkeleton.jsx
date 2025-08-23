
import React, { useEffect, useState } from "react";
import axios from "axios";

import sessionIcon from "../../assets/icons/sessions.svg";
import clockIcon from "../../assets/icons/clock.svg";
import chartIcon from "../../assets/icons/chart.svg";
import starIcon from "../../assets/icons/star.svg";

import StatusCard from "./StatusCard.jsx";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center shadow-md">
      <div className="w-10 h-10 bg-gray-700 rounded-full mb-4"></div>
      <div className="w-24 h-4 bg-gray-700 rounded mb-2"></div>
      <div className="w-12 h-4 bg-gray-700 rounded"></div>
    </div>
  );
};

const StatusCardsRow = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const therapistId = localStorage.getItem("therapistId");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/therapist/dashboard/${therapistId}`);
        console.log("This is the response for status card: ", res.data);
        setDashboardData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    if (therapistId) {
      fetchDashboardData();
    }
  }, [therapistId]);

  if (!dashboardData) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 gap-6 w-full">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
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
