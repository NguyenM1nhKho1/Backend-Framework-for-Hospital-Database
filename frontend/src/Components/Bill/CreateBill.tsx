import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/useAuth";

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

  const { role } = useAuth();

  const [showForm, setShowForm] = useState<boolean>(!!initialData);

  const handleButtonClick = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle form visibility
  };
  return (
    <div>
      {(role === "Admin" || role === "Finance") && (
        <button
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          onClick={handleButtonClick}
        >
          {showForm ? "Add" : "Add"}
        </button>
      )}
      {showForm && (
        <form className="mt-4 ml-4" onSubmit={handleSubmit(billSubmit)}>
          <input
            type="text"
            id="BillID"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="BillID"
            {...register("BillID")}
          />
          {errors.BillID ? <p>{errors.BillID.message}</p> : ""}
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
            id="TotalAmount"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="TotalAmount"
            {...register("TotalAmount")}
          />
          {errors.TotalAmount ? <p>{errors.TotalAmount.message}</p> : ""}
          <input
            type="text"
            id="DateIssued"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="DateIssued"
            {...register("DateIssued")}
          />
          {errors.DateIssued ? <p>{errors.DateIssued.message}</p> : ""}
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create new bill
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateBill;
