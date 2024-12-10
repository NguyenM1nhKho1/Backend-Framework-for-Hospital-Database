import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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

  return (
    <form className="mt-4" onSubmit={handleSubmit(roomSubmit)}>
      <input
        type="number"
        id="RoomID"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="RoomID"
        {...register("RoomID")}
        disabled={!!initialData} // Disable RoomID for updates
      />
      {errors.RoomID && <p>{errors.RoomID.message}</p>}
      <input
        type="text"
        id="RoomNumber"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="RoomNumber"
        {...register("RoomNumber")}
      />
      {errors.RoomNumber && <p>{errors.RoomNumber.message}</p>}
      <input
        type="text"
        id="RoomType"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="RoomType"
        {...register("RoomType")}
      />
      {errors.RoomType && <p>{errors.RoomType.message}</p>}
      <input
        type="text"
        id="PatientID"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="PatientID"
        {...register("PatientID")}
      />
      {errors.PatientID && <p>{errors.PatientID.message}</p>}
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        {initialData ? "Update Room" : "Create Room"}
      </button>
    </form>
  );
};

export default CreateRoom;
