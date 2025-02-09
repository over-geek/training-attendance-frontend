import React from 'react';
import PropTypes from "prop-types";

const StatsCards = ({ statTitle, statScore }) => {
  return (
      <div
        className="flex flex-col gap-2 rounded-md h-full w-56 bg-white px-4 py-3 text-sm text-gray-900 ring-1 ring-inset ring-gray-100 shadow-sm"
      >
        <div className='flex flex-col gap-5'>
          <div>
            <p className='text-10'>{statTitle}</p>
          </div>
          <div>
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