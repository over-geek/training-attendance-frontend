import NewTrainingForm from "../../components/NewTrainingForm.jsx";

const NewTraining = () => {
  return (
      <div className="bg-gray-50 h-full overflow-y-auto px-7 py-7">
        <div className="bg-white border border-white rounded-lg shadow-sm px-5 pb-7">
          <NewTrainingForm />
        </div>

      </div>
  );
};

export default NewTraining;