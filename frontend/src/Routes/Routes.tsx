import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import DepartmentPage from "../Components/Department/DepartmentPage";
import DesignPage from "../Pages/DesignPage/DesignPage";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashFlowStatement from "../Components/CashFlowStatement/CashFlowStatement";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import MedicalRecord from "../Components/MedicalRecord/MedicalRecord";
import PatientPage from "../Components/Patient/PatientPage";
import BillPage from "../Components/Bill/BillPage";
import RoomPage from "../Components/Room/RoomPage";
import TreatmentPage from "../Components/Treatment/TreatmentPage";
import RecordPage from "../Components/MedicalRecord/MedicalRecord";
import RoomAssignmentPage from "../Components/RoomAssignment/RoomAssignmentPage";
import SchedulePage from "../Components/Schedule/SchedulePage";
import DoctorPage from "../Components/Doctor/DoctorPage";
import MedicationPage from "../Components/Medication/MedicationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "medical-record/:date",
        element: <MedicalRecord />,
      },
      {
        path: "company/",
        element: <CompanyPage />,
        children: [
          {
            path: "bill",
            element: <BillPage />,
          },
          {
            path: "department",
            element: <DepartmentPage />,
          },
          {
            path: "patient",
            element: <PatientPage />,
          },
          {
            path: "room",
            element: <RoomPage />,
          },
          {
            path: "room-assignment",
            element: <RoomAssignmentPage />,
          },
          {
            path: "treatment",
            element: <TreatmentPage />,
          },
          {
            path: "medical-record",
            element: <RecordPage />,
          },
          {
            path: "doctor",
            element: <DoctorPage />,
          },
          {
            path: "schedule",
            element: <SchedulePage />,
          },
          {
            path: "medication",
            element: <MedicationPage />,
          },
        ],
      },
    ],
  },
]);
