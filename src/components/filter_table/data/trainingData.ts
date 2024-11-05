import {Training} from "@/components/filter_table/data/type";
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
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting training:", error);
        return false;
    }
}

export async function addTraining(training: Training): Promise<boolean> {
    try {
        await axios.post(API_URL, training);
        console.log("Training added successfully");
        return true;
    } catch (error) {
        console.error("Error adding training:", error);
        return false;
    }
}