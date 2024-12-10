import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type Props = {
  initialData?: ScheduleFormInputs; // Optional initial data for updating
  scheduleSubmit: (e: ScheduleFormInputs) => void;
};

type ScheduleFormInputs = {
  ScheduleID: number;
  DoctorID: number;
  Time: string;
  Day: string;
};

const validation = Yup.object().shape({
  ScheduleID: Yup.number().required("ScheduleID is required"),
  DoctorID: Yup.number().required("DoctorID is required"),
  Time: Yup.string().required("Time is required"),
  Day: Yup.string().required("Day is required"),
});

const CreateSchedule = ({ initialData, scheduleSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormInputs>({
    resolver: yupResolver(validation),
    defaultValues: initialData || {
      ScheduleID: 0,
      DoctorID: 0,
      Time: "",
      Day: "",
    },
  });

  return (
    <form className="mt-4" onSubmit={handleSubmit(scheduleSubmit)}>
      <input
        type="number"
        id="ScheduleID"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="ScheduleID"
        {...register("ScheduleID")}
        disabled={!!initialData} // Disable ScheduleID for updates
      />
      {errors.ScheduleID && <p>{errors.ScheduleID.message}</p>}
      <input
        type="text"
        id="DoctorID"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="DoctorID"
        {...register("DoctorID")}
      />
      {errors.DoctorID && <p>{errors.DoctorID.message}</p>}
      <input
        type="text"
        id="Time"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="Time"
        {...register("Time")}
      />
      {errors.Time && <p>{errors.Time.message}</p>}
      <input
        type="text"
        id="Day"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="Day"
        {...register("Day")}
      />
      {errors.Day && <p>{errors.Day.message}</p>}
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        {initialData ? "Update Schedule" : "Create Schedule"}
      </button>
    </form>
  );
};

export default CreateSchedule;
