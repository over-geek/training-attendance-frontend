import React, {useState} from 'react';
import { Slider } from "../../components/ui/slider.tsx"
import { Button } from "../../components/ui/button.tsx"
import {useNavigate, useParams} from "react-router-dom";
import { set } from 'zod';

function QuestionsPage() {
  const navigate = useNavigate()
  const { token } = useParams();

  const [expectations, setExpectations] = useState(1);
  const [knowledge, setKnowledge] = useState(1);
  const [objectives, setObjectives] = useState(1);
  const [content, setContent] = useState(1);
  const [trainers, setTrainers] = useState(1);
  const [quality, setQuality] = useState(1);
  const [participation, setParticipation] = useState(1);
  const [time, setTime] = useState(1);

  const responses = {
    response: expectations,
    response2: knowledge,
    response3: objectives,
    response4: content,
    response5: trainers,
    response6: quality,
    response7: participation,
    response8: time,
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(responses);
    navigate(`/evaluation/${token}/3`, { state: { responses } });
  }

  return (
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="font-semibold">The training met my expectations</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>1</div>
              <div className="w-11/12">
                <Slider
                    value={[expectations]}
                    onValueChange={({ value }) => setExpectations(value[0])}
                    max={5}
                    min={1}
                    step={1}
                    colorPalette="blue"
                    variant="solid"
                />
              </div>
              <div>5</div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Strongly disagree</p>
              <p className="text-sm">Strongly Agree</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">I will be able to apply the knowledge learned.</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>1</div>
              <div className="w-11/12">
                <Slider
                    value={[knowledge]}
                    onValueChange={({ value }) => setKnowledge(value[0])}
                    max={5}
                    min={1}
                    step={1}
                    colorPalette="pink"
                    variant="solid"
                />
              </div>
              <div>5</div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Strongly disagree</p>
              <p className="text-sm">Strongly Agree</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">The training objectives for each topic were identified and followed.</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>1</div>
              <div className="w-11/12">
                <Slider
                    value={[objectives]}
                    onValueChange={({ value }) => setObjectives(value[0])}
                    max={5}
                    min={1}
                    step={1}
                    colorPalette="red"
                    variant="solid"
                />
              </div>
              <div>5</div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Strongly disagree</p>
              <p className="text-sm">Strongly Agree</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">The content was organized and easy to follow.</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>1</div>
              <div className="w-11/12">
                <Slider
                    value={[content]}
                    onValueChange={({ value }) => setContent(value[0])}
                    max={5}
                    min={1}
                    step={1}
                    colorPalette="yellow"
                    variant="solid"
                />
              </div>
              <div>5</div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Strongly disagree</p>
              <p className="text-sm">Strongly Agree</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">The trainers were knowledgeable.</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>1</div>
              <div className="w-11/12">
                <Slider
                    value={[trainers]}
                    onValueChange={({ value }) => setTrainers(value[0])}
                    max={5}
                    min={1}
                    step={1}
                    colorPalette="green"
                    variant="solid"
                />
              </div>
              <div>5</div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Strongly disagree</p>
              <p className="text-sm">Strongly Agree</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">The quality of training was good.</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>1</div>
              <div className="w-11/12">
                <Slider
                    value={[quality]}
                    onValueChange={({ value }) => setQuality(value[0])}
                    max={5}
                    min={1}
                    step={1}
                    colorPalette="purple"
                    variant="solid"
                />
              </div>
              <div>5</div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Strongly disagree</p>
              <p className="text-sm">Strongly Agree</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Class participation and interactions were encouraged.</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>1</div>
              <div className="w-11/12">
                <Slider
                    value={[participation]}
                    onValueChange={({ value }) => setParticipation(value[0])}
                    max={5}
                    min={1}
                    step={1}
                    colorPalette="brown"
                    variant="solid"
                />
              </div>
              <div>5</div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Strongly disagree</p>
              <p className="text-sm">Strongly Agree</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Adequate time was provided for questions and discussions.</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>1</div>
              <div className="w-11/12">
                <Slider
                    value={[time]}
                    onValueChange={({ value }) => setTime(value[0])}
                    max={5}
                    min={1}
                    step={1}
                    colorPalette="teal"
                    variant="solid"
                />
              </div>
              <div>5</div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Strongly disagree</p>
              <p className="text-sm">Strongly Agree</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="rounded-xl" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
  );
}

export default QuestionsPage;