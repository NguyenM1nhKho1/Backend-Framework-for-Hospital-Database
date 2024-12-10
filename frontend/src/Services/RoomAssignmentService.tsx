import axios from "axios";
import { RoomAssignment } from "../company";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:3001/room_assignment/";

export const roomAssignmentGetAPI = async () => {
  try {
    const data = await axios.get<RoomAssignment[]>(api);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const roomAssignmentPostAPI = async (
  AssignmentNumber: number,
  RoomID: number,
  StartDate: string,
  EndDate: string | null
) => {
  try {
    const data = await axios.post<RoomAssignment>(api, {
      AssignmentNumber: AssignmentNumber,
      RoomID: RoomID,
      StartDate: StartDate,
      EndDate: EndDate,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const roomAssignmentPutAPI = async (
  AssignmentNumber: number,
  RoomID: number,
  StartDate: string,
  EndDate: string | null
) => {
  try {
    const data = await axios.put<RoomAssignment>(
      `${api}${AssignmentNumber}/${RoomID}`,
      {
        StartDate: StartDate,
        EndDate: EndDate,
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const roomAssignmentDeleteAPI = async (
  AssignmentNumber: number,
  RoomID: number
) => {
  try {
    const data = await axios.delete<RoomAssignment>(
      `${api}${AssignmentNumber}/${RoomID}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
