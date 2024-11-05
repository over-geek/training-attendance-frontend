import React from 'react';
import PropTypes from "prop-types";

const StatsCards = ({ iconName, statTitle, statScore }) => {
  return (
      <div
        className="flex flex-col gap-2 rounded-md w-48 h-32 bg-white px-5 py-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-100 shadow-sm"
      >
        <div className="flex gap-2">
          <div className="flex justify-center w-full">
            <img src={iconName} alt="" className="w-7" />
          </div>
        </div>
        <div>
          <div>
            <p>{statTitle}</p>
          </div>
          <div className="text-center">
            <span className="font-semibold text-4xl text-blue-900">{statScore}</span>
          </div>
        </div>
      </div>
  );
};

StatsCards.propTypes = {
  iconName: PropTypes.string,
  statTitle: PropTypes.string,
  statScore: PropTypes.number,
}

export default StatsCards;