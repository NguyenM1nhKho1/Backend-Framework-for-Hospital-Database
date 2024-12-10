import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useAuth } from "../../Context/useAuth";

type Props = {};

const Sidebar = (props: Props) => {
  const { role } = useAuth();
  return (
    <nav className="block py-4 px-6 top-0 bottom-0 w-64 bg-white shadow-xl left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full">
      <button className="md:hidden flex items-center justify-center cursor-pointer text-blueGray-700 w-6 h-10 border-l-0 border-r border-t border-b border-solid border-blueGray-100 text-xl leading-none bg-white rounded-r border border-solid border-transparent absolute top-1/2 -right-24-px focus:outline-none z-9998">
        <i className="fas fa-ellipsis-v"></i>
      </button>

      <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
        <div className="flex bg-white flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 items-center flex-1 rounded w-full">
          <div className="md:flex-col md:min-w-full flex flex-col list-none">
            {(role === "Admin" || role === "Finance" || role === "Patient") && (
              <Link
                to="bill"
                className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
              >
                <FaHome />
                <h6 className="ml-3">Bill</h6>
              </Link>
            )}
            {role === "Admin" && (
              <Link
                to="department"
                className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
              >
                <FaHome />
                <h6 className="ml-3">Department</h6>
              </Link>
            )}
            {(role === "Admin" || role === "Patient" || role === "Doctor") && (
              <Link
                to="patient"
                className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
              >
                <FaHome />
                <h6 className="ml-3">Patient</h6>
              </Link>
            )}
            {(role === "Admin" || role === "Room_mgmt") && (
              <Link
                to="room"
                className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
              >
                <FaHome />
                <h6 className="ml-3">Room</h6>
              </Link>
            )}
            {(role === "Admin" || role === "Room_mgmt") && (
              <Link
                to="room-assignment"
                className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
              >
                <FaHome />
                <h6 className="ml-3">Room Assignment</h6>
              </Link>
            )}
            {(role === "Admin" || role === "Doctor") && (
              <Link
                to="treatment"
                className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
              >
                <FaHome />
                <h6 className="ml-3">Treatment</h6>
              </Link>
            )}
            {(role === "Admin" || role === "Doctor" || role === "Patient") && (
              <Link
                to="medical-record"
                className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
              >
                <FaHome />
                <h6 className="ml-3">Medical Record</h6>
              </Link>
            )}
            {role === "Admin" && (
              <Link
                to="doctor"
                className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
              >
                <FaHome />
                <h6 className="ml-3">Doctor</h6>
              </Link>
            )}
            {(role === "Admin" || role === "Doctor") && (
              <Link
                to="schedule"
                className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
              >
                <FaHome />
                <h6 className="ml-3">Schedule</h6>
              </Link>
            )}
            {(role === "Admin" || role === "Doctor" || role === "Pharmacy") && (
              <Link
                to="medication"
                className="flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-4 no-underline"
              >
                <FaHome />
                <h6 className="ml-3">Medication</h6>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
