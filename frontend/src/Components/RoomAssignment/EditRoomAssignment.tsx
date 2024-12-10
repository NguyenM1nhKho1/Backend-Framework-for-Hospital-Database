import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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

  return (
    <form className="mt-4" onSubmit={handleSubmit(roomAssignmentSubmit)}>
      <input
        type="number"
        id="AssignmentNumber"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="AssignmentNumber"
        {...register("AssignmentNumber")}
        disabled={!!initialData} // Disable RoomAssignmentID for updates
      />
      {errors.AssignmentNumber && <p>{errors.AssignmentNumber.message}</p>}
      <input
        type="text"
        id="RoomID"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="RoomID"
        {...register("RoomID")}
        disabled={!!initialData}
      />
      {errors.RoomID && <p>{errors.RoomID.message}</p>}
      <input
        type="text"
        id="StartDate"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="StartDate"
        {...register("StartDate")}
      />
      {errors.StartDate && <p>{errors.StartDate.message}</p>}
      <input
        type="text"
        id="EndDate"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="EndDate"
        {...register("EndDate")}
      />
      {errors.EndDate && <p>{errors.EndDate.message}</p>}
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        {initialData ? "Update RoomAssignment" : "Create RoomAssignment"}
      </button>
    </form>
  );
};

export default CreateRoomAssignment;
