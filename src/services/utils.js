import axios from 'axios';
import { BASE_URL } from './apis';

export const fetchEvalResponseLength = async (trainingId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/training/${trainingId}/responses`);
    return response.data.length;
  } catch (error) {
    console.error("Error fetching evaluation response length:", error);
  }
}

export const fetchTrainingMetrics = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/metrics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching training metrics:", error);
  }
}