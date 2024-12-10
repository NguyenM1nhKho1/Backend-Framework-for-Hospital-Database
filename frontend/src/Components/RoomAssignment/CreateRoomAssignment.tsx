import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/useAuth";

type Props = {
  initialData?: RoomAssignmentFormInputs; // Optional initial data for updating
  roomAssignmentSubmit: (e: RoomAssignmentFormInputs) => void;
};

type RoomAssignmentFormInputs = {
  AssignmentNumber: number;
  RoomID: number;
  StartDate: string;
  EndDate: string | null;
};

const validation = Yup.object().shape({
  AssignmentNumber: Yup.number().required("AssignmentNumber is required"),
  RoomID: Yup.number().required("RoomID is required"),
  StartDate: Yup.string().required("Details is required"),
  EndDate: Yup.string().nullable(),
});

const CreateRoomAssignment = ({ initialData, roomAssignmentSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomAssignmentFormInputs>({
    resolver: yupResolver(validation) as any,
    defaultValues: initialData || {
      AssignmentNumber: 0,
      RoomID: 0,
      StartDate: "",
      EndDate: null,
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
        <form
          className="mt-4 ml-4"
          onSubmit={handleSubmit(roomAssignmentSubmit)}
        >
          <input
            type="text"
            id="AssignmentNumber"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="AssignmentNumber"
            {...register("AssignmentNumber")}
          />
          {errors.AssignmentNumber ? (
            <p>{errors.AssignmentNumber.message}</p>
          ) : (
            ""
          )}
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
            id="StartDate"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="StartDate"
            {...register("StartDate")}
          />
          {errors.StartDate ? <p>{errors.StartDate.message}</p> : ""}
          <input
            type="text"
            id="EndDate"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="EndDate"
            {...register("EndDate")}
          />
          {errors.EndDate ? <p>{errors.EndDate.message}</p> : ""}
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create new roomAssignment
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateRoomAssignment;
