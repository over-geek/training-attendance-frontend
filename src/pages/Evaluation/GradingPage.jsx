import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {ChevronRightIcon} from "@radix-ui/react-icons";

function GradingPage(props) {
  const { token } = useParams();
  return (
      <div className="text-center flex flex-col gap-3">
        <div>
          <h1 className="font-semibold text-2xl">Feedback Grading</h1>
        </div>
        <div>
          <ul>
            <li>Strongly Agree</li>
            <li>Agree</li>
            <li>Neutral</li>
            <li>Disagree</li>
            <li>Strongly Disagree</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <Link to={`/evaluation/${token}/2`} className="flex gap-0.5 items-center justify-center font-semibold">
            Next <ChevronRightIcon className="mt-1" />
          </Link>
        </div>

      </div>
  );
}

export default GradingPage;