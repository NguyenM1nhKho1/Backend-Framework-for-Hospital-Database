import axios from "axios";
import { Treatment } from "../company";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:3001/treatments/";

export const treatmentGetAPI = async () => {
  try {
    const data = await axios.get<Treatment[]>(api);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const treatmentPostAPI = async (
  TreatmentID: number,
  TreatmentName: string,
  Description: string | null,
  Cost: number
) => {
  try {
    const data = await axios.post<Treatment>(api, {
      TreatmentID: TreatmentID,
      TreatmentName: TreatmentName,
      Description: Description,
      Cost: Cost,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const treatmentPutAPI = async (
  TreatmentID: number,
  TreatmentName: string,
  Description: string | null,
  Cost: number
) => {
  try {
    const data = await axios.put<Treatment>(`${api}${TreatmentID}`, {
      TreatmentName: TreatmentName,
      Description: Description,
      Cost: Cost,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const treatmentDeleteAPI = async (TreatmentID: number) => {
  try {
    const data = await axios.delete<Treatment>(`${api}${TreatmentID}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
