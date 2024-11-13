import React from 'react';
import {ChevronRightIcon} from "@radix-ui/react-icons";
import {Link, useParams} from 'react-router-dom'

function HomePage() {
  const { token } = useParams();
  return (
      <div className="flex flex-col gap-3">
        <div className="text-center flex flex-col gap-3 mt-6">
          <h1 className="font-semibold text-3xl">Training Evaluation Form</h1>
          <p>Answer this quick survey to help us improve</p>
          <div className="flex justify-center">
            <Link to={`/evaluation/${token}/1`} className="flex gap-0.5 items-center justify-center font-semibold">
              Next <ChevronRightIcon className="mt-1"/>
            </Link>
          </div>
        </div>
      </div>
  );
}

export default HomePage;