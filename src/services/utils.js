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

export const fetchDashboardMetrics = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/metrics/dashboard-summary`);
    return response.data;
  } catch (error) {
    console.error("Error fetching training metrics:", error);
  }
}

export const fetchTrainingMetrics = async (agenda) => {
  try {
    const response = await axios.get(`${BASE_URL}/metrics/training`, {
      params: {
        agenda: agenda
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching training metrics:', error);
    throw error;
  }
};

export const fetchPendingTrainings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trainings/pending`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending trainings:", error);
  }
}

export const fetchActivityLogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/activity_logs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching activity logs:", error);
  }
}