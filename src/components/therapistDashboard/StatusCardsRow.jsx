import React from "react";

import sessionIcon from "../../assets/icons/sessions.svg";
import clockIcon from "../../assets/icons/clock.svg";
import chartIcon from "../../assets/icons/chart.svg";
import starIcon from "../../assets/icons/star.svg";

import StatusCard from "./StatusCard.jsx";

const StatusCardsRow = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 gap-6 w-full">
      <StatusCard
        title="Today's Sessions"
        value="5"
        color="text-yellow-400"
        icon={sessionIcon}
      />
      <StatusCard
        title="Pending Requests"
        value="3"
        color="text-yellow-500"
        icon={clockIcon}
      />
      <StatusCard
        title="This Week"
        value="28"
        color="text-green-400"
        icon={chartIcon}
      />
      <StatusCard
        title="Rating"
        value="4.9"
        color="text-yellow-300"
        icon={starIcon}
      />
    </div>
  );
};

export default StatusCardsRow;
