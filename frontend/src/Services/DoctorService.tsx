import axios from "axios";
import { Doctor } from "../company";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:3001/doctors/";

export const doctorGetAPI = async () => {
  try {
    const data = await axios.get<Doctor[]>(api);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const doctorPostAPI = async (
  DoctorID: number,
  Name: string,
  Specialization: string,
  PhoneNumber: string,
  DepartmentID: number
) => {
  try {
    const data = await axios.post<Doctor>(api, {
      DoctorID: DoctorID,
      Name: Name,
      Specialization: Specialization,
      PhoneNumber: PhoneNumber,
      DepartmentID: DepartmentID,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const doctorPutAPI = async (
  DoctorID: number,
  Name: string,
  Specialization: string,
  PhoneNumber: string,
  DepartmentID: number
) => {
  try {
    const data = await axios.put<Doctor>(`${api}${DoctorID}`, {
      Name: Name,
      Specialization: Specialization,
      PhoneNumber: PhoneNumber,
      DepartmentID: DepartmentID,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const doctorDeleteAPI = async (DoctorID: number) => {
  try {
    const data = await axios.delete<Doctor>(`${api}${DoctorID}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
