import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/useAuth";

type Props = {
  initialData?: RecordFormInputs; // Optional initial data for updating
  recordSubmit: (e: RecordFormInputs) => void;
};

type RecordFormInputs = {
  RecordNumber: number;
  PatientID: number;
  Details: string;
  Date: string;
};

const validation = Yup.object().shape({
  RecordNumber: Yup.number().required("RecordNumber is required"),
  PatientID: Yup.number().required("PatientID is required"),
  Details: Yup.string().required("Details is required"),
  Date: Yup.string().required("Date is required"),
});

const CreateRecord = ({ initialData, recordSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecordFormInputs>({
    resolver: yupResolver(validation),
    defaultValues: initialData || {
      RecordNumber: 0,
      PatientID: 0,
      Details: "",
      Date: "",
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
          {showForm ? "Add" : "Add"}
        </button>
      )}
      {showForm && (
        <form className="mt-4 ml-4" onSubmit={handleSubmit(recordSubmit)}>
          <input
            type="text"
            id="RecordNumber"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="RecordNumber"
            {...register("RecordNumber")}
          />
          {errors.RecordNumber ? <p>{errors.RecordNumber.message}</p> : ""}
          <input
            type="text"
            id="PatientID"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="PatientID"
            {...register("PatientID")}
          />
          {errors.PatientID ? <p>{errors.PatientID.message}</p> : ""}
          <input
            type="text"
            id="Details"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Details"
            {...register("Details")}
          />
          {errors.Details ? <p>{errors.Details.message}</p> : ""}
          <input
            type="text"
            id="Date"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Date"
            {...register("Date")}
          />
          {errors.Date ? <p>{errors.Date.message}</p> : ""}
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create new record
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateRecord;
