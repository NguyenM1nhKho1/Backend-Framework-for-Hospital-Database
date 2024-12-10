import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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

  return (
    <form className="mt-4" onSubmit={handleSubmit(recordSubmit)}>
      <input
        type="number"
        id="RecordNumber"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="RecordNumber"
        {...register("RecordNumber")}
        disabled={!!initialData} // Disable RecordID for updates
      />
      {errors.RecordNumber && <p>{errors.RecordNumber.message}</p>}
      <input
        type="text"
        id="PatientID"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="PatientID"
        {...register("PatientID")}
        disabled={!!initialData}
      />
      {errors.PatientID && <p>{errors.PatientID.message}</p>}
      <input
        type="text"
        id="Details"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="Details"
        {...register("Details")}
      />
      {errors.Details && <p>{errors.Details.message}</p>}
      <input
        type="text"
        id="Date"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="Date"
        {...register("Date")}
      />
      {errors.Date && <p>{errors.Date.message}</p>}
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        {initialData ? "Update Record" : "Create Record"}
      </button>
    </form>
  );
};

export default CreateRecord;
