import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type Props = {
  initialData?: BillFormInputs; // Optional initial data for updating
  billSubmit: (e: BillFormInputs) => void;
};

type BillFormInputs = {
  BillID: number;
  PatientID: number;
  TotalAmount: number;
  DateIssued: string;
};

const validation = Yup.object().shape({
  BillID: Yup.number().required("BillID is required"),
  PatientID: Yup.number().required("PatientID is required"),
  TotalAmount: Yup.number().required("TotalAmount is required"),
  DateIssued: Yup.string().required("DateIssued is required"),
});

const CreateBill = ({ initialData, billSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillFormInputs>({
    resolver: yupResolver(validation),
    defaultValues: initialData || {
      BillID: 0,
      PatientID: 0,
      TotalAmount: 0,
      DateIssued: "",
    },
  });

  return (
    <form className="mt-4" onSubmit={handleSubmit(billSubmit)}>
      <input
        type="number"
        id="BillID"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="BillID"
        {...register("BillID")}
        disabled={!!initialData} // Disable BillID for updates
      />
      {errors.BillID && <p>{errors.BillID.message}</p>}
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
        id="TotalAmount"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="TotalAmount"
        {...register("TotalAmount")}
      />
      {errors.TotalAmount && <p>{errors.TotalAmount.message}</p>}
      <input
        type="text"
        id="DateIssued"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="DateIssued"
        {...register("DateIssued")}
      />
      {errors.DateIssued && <p>{errors.DateIssued.message}</p>}
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        {initialData ? "Update Bill" : "Create Bill"}
      </button>
    </form>
  );
};

export default CreateBill;
