import {useEffect, useState} from 'react';
import StatsCards from "../../components/StatsCards.jsx";
import { DataTable } from "../../components/filter_table/dataTable.tsx"
import {fetchTrainingStats} from "../../components/filter_table/data/trainingData.ts";
import calendarIcon from "../../assets/images/calendarIcon.png"
import teachIcon from "../../assets/images/teachIcon.png"

const TrainingsHome = () => {
  const [upcomingTrainingsScore, setUpcomingTrainingsScore] = useState(0);
  const [completedTrainingPerYearScore, setCompletedTrainingPerYearScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrainingStats = async () => {
      try {
        const { upcomingTrainings, completedThisYear,
        } = await fetchTrainingStats();
        setUpcomingTrainingsScore(upcomingTrainings);
        setCompletedTrainingPerYearScore(completedThisYear);
      } catch (error) {
        console.log("error fetching training stats: ", error)
      } finally {
        setLoading(false);
      }

    }
    loadTrainingStats();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
      <section className="px-7 bg-gray-50 py-10 h-full">
        <div className="flex items-center gap-6 px-7 mb-14">
          <StatsCards iconName={calendarIcon} statTitle="Upcoming Trainings" statScore={upcomingTrainingsScore}/>
          {/*<StatsCards iconName="work" statTitle="Avg Absents" statScore={0}/>*/}
          <StatsCards iconName={teachIcon} statTitle="Trainings this year" statScore={completedTrainingPerYearScore}/>
          <div className="py-4 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400 shadow-sm">
          </div>
        </div>
        <div className="bg-white py-7 px-3 rounded-md">
          <DataTable />
        </div>
      </section>
  );
};

export default TrainingsHome;