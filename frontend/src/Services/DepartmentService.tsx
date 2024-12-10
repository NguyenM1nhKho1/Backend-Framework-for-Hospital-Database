import axios from "axios";
import { Department } from "../company";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:3001/departments/";

export const departmentGetAPI = async () => {
  try {
    const data = await axios.get<Department[]>(api);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const departmentPostAPI = async (
  DepartmentID: number,
  DepartmentName: string,
  Location: string
) => {
  try {
    const data = await axios.post<Department>(api, {
      DepartmentID: DepartmentID,
      DepartmentName: DepartmentName,
      Location: Location,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const departmentPutAPI = async (
  DepartmentID: number,
  DepartmentName: string,
  Location: string
) => {
  try {
    const data = await axios.put<Department>(`${api}${DepartmentID}`, {
      DepartmentName: DepartmentName,
      Location: Location,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const departmentDeleteAPI = async (DepartmentID: number) => {
  try {
    const data = await axios.delete<Department>(`${api}${DepartmentID}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
