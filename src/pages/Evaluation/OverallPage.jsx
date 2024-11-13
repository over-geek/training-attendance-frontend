import React, { useState } from 'react';
import { Slider } from "../../components/ui/slider.tsx"
import {Button} from "../../components/ui/button.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { evalApi } from '../../services/apis.js';

function OverallPage() {
  const { state } = useLocation()
  const { token } = useParams()
  const { responses } = state || {};
  const [overallRating, setOverallRating] = useState(1)
  const [comments, setComments] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async () => {
    const submissionData = {
      ...responses,
      q9Response: overallRating,
      additionalComment: comments,
      token
    }

    try {
      const response = await evalApi.post('/submit', submissionData)
      console.log('response: ', response)
      if (response.status === 200) {
        navigate(`/evaluation/${token}/success`)
      }
      
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="font-semibold text-2xl">Overall Experience</h3>
          <p>How do you rate the training overall?</p>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>1</div>
              <div className="w-11/12">
                <Slider
                    value={[overallRating]}
                    onValueChange={({ value }) => setOverallRating(value[0])}
                    min={1}
                    max={5}
                    step={1}
                />
              </div>
              <div>5</div>
            </div>
            <div className="flex justify-between">
              <p>Poor</p>
              <p>Excellent</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-2xl">
            What aspects of the training could be improved?
          </h3>
          <textarea
              name="addtional-comments"
              id=""
              cols="30"
              rows="10"
              placeholder="Short answers are recommended."
              className="w-full bg-gray-100 focus:outline-none p-3 rounded-xl"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Button className="rounded-xl" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
  );
}

export default OverallPage;