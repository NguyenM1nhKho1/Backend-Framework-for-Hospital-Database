import axios from "axios";
import { Medication } from "../company";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:3001/medications/";

export const medicationGetAPI = async () => {
  try {
    const data = await axios.get<Medication[]>(api);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const medicationPostAPI = async (
  MedicationID: number,
  Name: string,
  UsagePerDay: number,
  Dosage: number,
  Effects: string,
  SideEffects: string | null
) => {
  try {
    const data = await axios.post<Medication>(api, {
      MedicationID: MedicationID,
      Name: Name,
      UsagePerDay: UsagePerDay,
      Dosage: Dosage,
      Effects: Effects,
      SideEffects: SideEffects,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const medicationPutAPI = async (
  MedicationID: number,
  Name: string,
  UsagePerDay: number,
  Dosage: number,
  Effects: string,
  SideEffects: string | null
) => {
  try {
    const data = await axios.put<Medication>(`${api}${MedicationID}`, {
      Name: Name,
      UsagePerDay: UsagePerDay,
      Dosage: Dosage,
      Effects: Effects,
      SideEffects: SideEffects,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const medicationDeleteAPI = async (MedicationID: number) => {
  try {
    const data = await axios.delete<Medication>(`${api}${MedicationID}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
