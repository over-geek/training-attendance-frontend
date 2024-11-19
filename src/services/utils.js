import axios from 'axios';

export const fetchEvalResponseLength = async (trainingId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/training/${trainingId}/responses`);
    return response.data.length;
  } catch (error) {
    console.error("Error fetching evaluation response length:", error);
  }
}