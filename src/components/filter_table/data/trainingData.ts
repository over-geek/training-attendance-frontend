import {Training} from "@/components/filter_table/data/type";
import { postTraining } from "@/components/filter_table/data/type";
import axios from "axios";

const API_URL = "http://localhost:8080/api/trainings"

export async function fetchTrainingData(): Promise<Training[]> {
    try {
        const response = await axios.get<Training[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching training data:", error);
        return []; // Fallback or error handling as needed
    }
}

export async function fetchTrainingStats(): Promise<{ upcomingTrainings: number; completedThisYear: number; }> {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        const response = await axios.get<Training[]>(API_URL);
        const trainings = response.data;
        const upcomingTrainings = trainings.filter((training: Training) => training.status === "upcoming").length;

        const completedThisYear = trainings.filter((training: Training) => {
            const trainingDate = new Date(training.date);
            return training.status === "done" && trainingDate.getFullYear() === currentYear;
        }).length

        return {
            upcomingTrainings,
            completedThisYear,
        }
    } catch (error) {
        console.error("Error fetching training data:", error);
        return { upcomingTrainings: 0, completedThisYear: 0 }; // Fallback or error handling as needed
    }
}

export async function deleteTraining(id: string): Promise<boolean> {
    try {
        console.log(`Attempting to delete training at: ${API_URL}/${id}`);
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.status >= 200 && response.status < 300;
    } catch (error) {
        console.error("Error deleting training:", error);
        if (axios.isAxiosError(error)) {
            console.error("Status:", error.response?.status);
            console.error("Server response:", error.response?.data);
        }
        return false;
    }
}

export async function addTraining(training: postTraining): Promise<boolean> {
    try {
        await axios.post(API_URL, training);
        console.log("Training added successfully: ", training);
        return true;
    } catch (error) {
        console.error("Error adding training:", error);
        return false;
    }
}

export async function updateTrainingStatus(id: string, status: string) {
    try {
        const response = await axios.patch(`http://localhost:8080/api/trainings/${id}/status`, { status });
        return response.data;
    } catch (error) {
        console.error("Error updating training status:", error);
        throw error;
    }
}

export async function startTrainingSession(id: string): Promise<boolean> {
    try {
        const response = await axios.post(`http://localhost:8080/api/card-reader/start-session/${id}`);
        return response.status >= 200 && response.status < 300;
    } catch (error) {
        console.error("Error starting training session:", error);
        return false;
    }
}

export async function fetchTrainingById(id: string): Promise<Training | null> {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching training:", error);
        return null;
    }
}

export async function endTrainingSession(id: string): Promise<boolean> {
    try {
        const response = await axios.post(`http://localhost:8080/api/card-reader/end-session/${id}`);
        if (response.status >= 200 && response.status < 300 ) {
            console.log("Training session ended successfully");
            return response.status >= 200 && response.status < 300;
        } else {
            console.error("Error ending training session:", response);
            return false;
        }
    } catch (error) {
        console.error("Error ending training session:", error);
        return false;
    }
}