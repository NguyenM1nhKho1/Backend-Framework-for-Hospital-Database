import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/useAuth";

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
  const [showForm, setShowForm] = useState<boolean>(!!initialData);
  const { role } = useAuth();

  const handleButtonClick = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle form visibility
  };
  return (
    <div>
      {role === "Admin" && (
        <button
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          onClick={handleButtonClick}
        >
          {showForm ? "Hide Form" : "Show Form"}
        </button>
      )}
      {showForm && (
        <form className="mt-4 ml-4" onSubmit={handleSubmit(scheduleSubmit)}>
          <input
            type="text"
            id="ScheduleID"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ScheduleID"
            {...register("ScheduleID")}
          />
          {errors.ScheduleID ? <p>{errors.ScheduleID.message}</p> : ""}
          <input
            type="text"
            id="DoctorID"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="DoctorID"
            {...register("DoctorID")}
          />
          {errors.DoctorID ? <p>{errors.DoctorID.message}</p> : ""}
          <input
            type="text"
            id="Time"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Time"
            {...register("Time")}
          />
          {errors.Time ? <p>{errors.Time.message}</p> : ""}
          <input
            type="text"
            id="Day"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Day"
            {...register("Day")}
          />
          {errors.Day ? <p>{errors.Day.message}</p> : ""}
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create new schedule
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateSchedule;
