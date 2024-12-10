import axios from "axios";
import { MedicalRecord } from "../company";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:3001/medical_record/";

export const recordGetAPI = async () => {
  try {
    const data = await axios.get<MedicalRecord[]>(api);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const recordPostAPI = async (
  RecordNumber: number,
  PatientID: number,
  Details: string,
  Date: string
) => {
  try {
    const data = await axios.post<MedicalRecord>(api, {
      RecordNumber: RecordNumber,
      PatientID: PatientID,
      Details: Details,
      Date: Date,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const recordPutAPI = async (
  RecordNumber: number,
  PatientID: number,
  Details: string,
  Date: string
) => {
  try {
    const data = await axios.put<MedicalRecord>(
      `${api}${RecordNumber}/${PatientID}`,
      {
        Details: Details,
        Date: Date,
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const recordDeleteAPI = async (
  RecordNumber: number,
  PatientID: number
) => {
  try {
    const data = await axios.delete<MedicalRecord>(
      `${api}${RecordNumber}/${PatientID}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
