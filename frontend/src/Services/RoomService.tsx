import axios from "axios";
import { Room } from "../company";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:3001/rooms/";

export const roomGetAPI = async () => {
  try {
    const data = await axios.get<Room[]>(api);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const roomPostAPI = async (
  RoomID: number,
  RoomNumber: number,
  RoomType: string,
  PatientID: number
) => {
  try {
    const data = await axios.post<Room>(api, {
      RoomID: RoomID,
      RoomNumber: RoomNumber,
      RoomType: RoomType,
      PatientID: PatientID,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const roomPutAPI = async (
  RoomID: number,
  RoomNumber: number,
  RoomType: string,
  PatientID: number
) => {
  try {
    const data = await axios.put<Room>(`${api}${RoomID}`, {
      RoomNumber: RoomNumber,
      RoomType: RoomType,
      PatientID: PatientID,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const roomDeleteAPI = async (RoomID: number) => {
  try {
    const data = await axios.delete<Room>(`${api}${RoomID}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
