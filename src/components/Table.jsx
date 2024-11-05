import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ headers, data }) => {
  return (
      <div className="relative overflow-x-auto pt-5">
        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header, index) => (
                <th
                    key={index}
                    scope="col"
                    className="px-6 py-3"
                >
                  {header}
                </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {data.map((row, rowIndex) => (
              <tr
                  key={rowIndex}
                  className={`bg-white border-b dark:bg-gray-800 ${
                      rowIndex === data.length - 1 ? '' : 'dark:border-gray-700'
                  }`}
              >
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {row.date}
                </th>
                <td className="px-6 py-4">{row.agenda}</td>
                <td className="px-6 py-4">{row.facilitator}</td>
                <td className="px-6 py-4">{row.trainingType}</td>
                <td className="px-6 py-4">{row.startTime}</td>
                <td className="px-6 py-4">{row.duration}</td>
                <td className="px-6 py-4">{row.endTime}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

Table.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array.isRequired,
}

export default Table;