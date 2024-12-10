import axios from "axios";
import { Bill } from "../company";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:3001/bill/";

export const billGetAPI = async () => {
  try {
    const data = await axios.get<Bill[]>(api);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const billPostAPI = async (
  BillID: number,
  PatientID: number,
  TotalAmount: number,
  DateIssued: string
) => {
  try {
    const data = await axios.post<Bill>(api, {
      BillID: BillID,
      PatientID: PatientID,
      TotalAmount: TotalAmount,
      DateIssued: DateIssued,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const billPutAPI = async (
  BillID: number,
  PatientID: number,
  TotalAmount: number,
  DateIssued: string
) => {
  try {
    const data = await axios.put<Bill>(`${api}${BillID}`, {
      PatientID: PatientID,
      TotalAmount: TotalAmount,
      DateIssued: DateIssued,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const billDeleteAPI = async (BillID: number) => {
  try {
    const data = await axios.delete<Bill>(`${api}${BillID}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
