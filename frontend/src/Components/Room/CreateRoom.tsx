import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/useAuth";

type Props = {
  initialData?: RoomFormInputs; // Optional initial data for updating
  roomSubmit: (e: RoomFormInputs) => void;
};

type RoomFormInputs = {
  RoomID: number;
  RoomNumber: number;
  RoomType: string;
  PatientID: number;
};

const validation = Yup.object().shape({
  RoomID: Yup.number().required("RoomID is required"),
  RoomNumber: Yup.number().required("RoomNumber is required"),
  RoomType: Yup.string().required("RoomType is required"),
  PatientID: Yup.number().required("PatientID is required"),
});

const CreateRoom = ({ initialData, roomSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomFormInputs>({
    resolver: yupResolver(validation),
    defaultValues: initialData || {
      RoomID: 0,
      RoomNumber: 0,
      RoomType: "",
      PatientID: 0,
    },
  });
  const [showForm, setShowForm] = useState<boolean>(!!initialData);
  const { role } = useAuth();

  const handleButtonClick = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle form visibility
  };
  return (
    <div>
      {(role === "Admin" || role === "Room_mgmt") && (
        <button
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          onClick={handleButtonClick}
        >
          {showForm ? "Add" : "Add"}
        </button>
      )}
      {showForm && (
        <form className="mt-4 ml-4" onSubmit={handleSubmit(roomSubmit)}>
          <input
            type="text"
            id="RoomID"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="RoomID"
            {...register("RoomID")}
          />
          {errors.RoomID ? <p>{errors.RoomID.message}</p> : ""}
          <input
            type="text"
            id="RoomNumber"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="RoomNumber"
            {...register("RoomNumber")}
          />
          {errors.RoomNumber ? <p>{errors.RoomNumber.message}</p> : ""}
          <input
            type="text"
            id="RoomType"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="RoomType"
            {...register("RoomType")}
          />
          {errors.RoomType ? <p>{errors.RoomType.message}</p> : ""}
          <input
            type="text"
            id="PatientID"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="PatientID"
            {...register("PatientID")}
          />
          {errors.PatientID ? <p>{errors.PatientID.message}</p> : ""}
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create new room
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateRoom;
