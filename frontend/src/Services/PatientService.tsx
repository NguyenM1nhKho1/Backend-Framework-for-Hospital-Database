import axios from "axios";
import { Patient } from "../company";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:3001/patients/";

export const patientGetAPI = async () => {
  try {
    const data = await axios.get<Patient[]>(api);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const patientPostAPI = async (
  PatientID: number,
  Name: string,
  DateOfBirth: string,
  PhoneNumber: string,
  Gender: string
) => {
  try {
    const data = await axios.post<Patient>(api, {
      PatientID: PatientID,
      Name: Name,
      DateOfBirth: DateOfBirth,
      PhoneNumber: PhoneNumber,
      Gender: Gender,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const patientPutAPI = async (
  PatientID: number,
  Name: string,
  DateOfBirth: string,
  PhoneNumber: string,
  Gender: string
) => {
  try {
    const data = await axios.put<Patient>(`${api}${PatientID}`, {
      Name: Name,
      DateOfBirth: DateOfBirth,
      PhoneNumber: PhoneNumber,
      Gender: Gender,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const patientDeleteAPI = async (PatientID: number) => {
  try {
    const data = await axios.delete<Patient>(`${api}${PatientID}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
