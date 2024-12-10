import axios from "axios";
import { Schedule } from "../company";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:3001/schedules/";

export const scheduleGetAPI = async () => {
  try {
    const data = await axios.get<Schedule[]>(api);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const schedulePostAPI = async (
  ScheduleID: number,
  DoctorID: number,
  Time: string,
  Day: string
) => {
  try {
    const data = await axios.post<Schedule>(api, {
      ScheduleID: ScheduleID,
      DoctorID: DoctorID,
      Time: Time,
      Day: Day,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const schedulePutAPI = async (
  ScheduleID: number,
  DoctorID: number,
  Time: string,
  Day: string
) => {
  try {
    const data = await axios.put<Schedule>(`${api}${ScheduleID}`, {
      DoctorID: DoctorID,
      Time: Time,
      Day: Day,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const scheduleDeleteAPI = async (
  ScheduleID: number,
  DoctorID: number
) => {
  try {
    const data = await axios.delete<Schedule>(
      `${api}${ScheduleID}/${DoctorID}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
