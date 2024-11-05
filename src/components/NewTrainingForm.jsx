import { useState } from 'react';
import { addTraining } from "@/components/filter_table/data/trainingData";
import { useToast } from "@/hooks/use-toast.ts";
import { Button } from "@/components/ui/button"

const NewTrainingForm = () => {
  const { toast } = useToast();

  const [trainingData, setTrainingData] = useState({
    name: '',
    facilitator: '',
    date: '',
    startTime: '',
    duration: '',
    type: 'Staff Training'
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainingData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const training = {
        name: trainingData.name,
        facilitator: trainingData.facilitator,
        duration: trainingData.duration.toString(),
        startTime: trainingData.startTime,
        type: trainingData.type,
        date: trainingData.date
      };
      
      console.log('Submitting training data:', training);
      
      const success = await addTraining(training);
      if (success) {
        setTrainingData({
          name: '',
          facilitator: '',
          date: '',
          startTime: '',
          duration: '',
          type: ''
        });
        toast({
          variant: "success",
          description: "Training added successfully!"
        })
      } else {
        alert("Failed to add training");
      }
    } catch (error) {
      console.error("Error adding training:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  }

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="">
            <div className="mt-10 flex flex-col gap-6">
              <div className="flex gap-7">
                <div>
                  <label htmlFor="agenda" className="block text-sm font-medium leading-6 text-gray-900">
                    Agenda/Topic
                  </label>
                  <div className="mt-2">
                    <input
                        id="agenda"
                        name="name"
                        value={trainingData.name}
                        onChange={handleChange}
                        type="text"
                        className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="facilitator" className="block text-sm font-medium leading-6 text-gray-900">
                    Facilitator
                  </label>
                  <div className="mt-2">
                    <input
                        id="facilitator"
                        name="facilitator"
                        value={trainingData.facilitator}
                        onChange={handleChange}
                        type="text"
                        className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="training_type" className="block text-sm font-medium leading-6 text-gray-900">
                  Training Type
                </label>
                <div className="mt-2">
                  <select
                      id="training-type"
                      name="type"
                      value={trainingData.type}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:outline-none sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="Staff Training">Staff Training</option>
                    <option value="Staff forum">Staff forum</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                  Date
                </label>
                <div className="mt-2">
                  <input
                      type="date"
                      name="date"
                      value={trainingData.date}
                      onChange={handleChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                    type="time"
                    name="startTime"
                    value={trainingData.startTime}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (in hours)
                </label>
                <input
                    type="number"
                    name="duration"
                    value={trainingData.duration}
                    onChange={handleChange}
                    required
                    min="1"
                    step="0.5"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 mt-7">
          <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
  );
};

export default NewTrainingForm;