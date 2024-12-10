import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/useAuth";

type Props = {
  initialData?: TreatmentFormInputs; // Optional initial data for updating
  treatmentSubmit: (e: TreatmentFormInputs) => void;
};

type TreatmentFormInputs = {
  TreatmentID: number;
  TreatmentName: string;
  Description: string | null;
  Cost: number;
};

const validation = Yup.object().shape({
  TreatmentID: Yup.number().required("TreatmentID is required"),
  TreatmentName: Yup.string().required("TreatmentName is required"),
  Description: Yup.string().nullable(),
  Cost: Yup.number().required("Cost is required"),
});

const CreateTreatment = ({ initialData, treatmentSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TreatmentFormInputs>({
    resolver: yupResolver(validation) as any, // Pass the Yup schema here
    defaultValues: initialData || {
      TreatmentID: 0,
      TreatmentName: "",
      Description: null,
      Cost: 0,
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
        <form className="mt-4 ml-4" onSubmit={handleSubmit(treatmentSubmit)}>
          <input
            type="text"
            id="TreatmentID"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="TreatmentID"
            {...register("TreatmentID")}
          />
          {errors.TreatmentID ? <p>{errors.TreatmentID.message}</p> : ""}
          <input
            type="text"
            id="TreatmentName"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="TreatmentName"
            {...register("TreatmentName")}
          />
          {errors.TreatmentName ? <p>{errors.TreatmentName.message}</p> : ""}
          <input
            type="text"
            id="Description"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
            {...register("Description")}
          />
          {errors.Description ? <p>{errors.Description.message}</p> : ""}
          <input
            type="text"
            id="Cost"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cost"
            {...register("Cost")}
          />
          {errors.Cost ? <p>{errors.Cost.message}</p> : ""}
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create new treatment
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateTreatment;
