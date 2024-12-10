import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/useAuth";

type Props = {
  initialData?: MedicationFormInputs; // Optional initial data for updating
  medicationSubmit: (e: MedicationFormInputs) => void;
};

type MedicationFormInputs = {
  MedicationID: number;
  Name: string;
  UsagePerDay: number;
  Dosage: number;
  Effects: string;
  SideEffects: string | null;
};

const validation = Yup.object().shape({
  MedicationID: Yup.number().required("MedicationID is required"),
  Name: Yup.string().required("Name is required"),
  UsagePerDay: Yup.number().required("UsagePerDay is required"),
  Dosage: Yup.number().required("Dosage is required"),
  Effects: Yup.string().required("Effects is required"),
  SideEffects: Yup.string().nullable(),
});

const CreateMedication = ({ initialData, medicationSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MedicationFormInputs>({
    resolver: yupResolver(validation) as any,
    defaultValues: initialData || {
      MedicationID: 0,
      Name: "",
      UsagePerDay: 0,
      Dosage: 0,
      Effects: "",
      SideEffects: null,
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
        <form className="mt-4 ml-4" onSubmit={handleSubmit(medicationSubmit)}>
          <input
            type="text"
            id="MedicationID"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="MedicationID"
            {...register("MedicationID")}
          />
          {errors.MedicationID ? <p>{errors.MedicationID.message}</p> : ""}
          <input
            type="text"
            id="Name"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
            {...register("Name")}
          />
          {errors.Name ? <p>{errors.Name.message}</p> : ""}
          <input
            type="text"
            id="UsagePerDay"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="UsagePerDay"
            {...register("UsagePerDay")}
          />
          {errors.UsagePerDay ? <p>{errors.UsagePerDay.message}</p> : ""}
          <input
            type="text"
            id="Dosage"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Dosage"
            {...register("Dosage")}
          />
          {errors.Dosage ? <p>{errors.Dosage.message}</p> : ""}
          <input
            type="text"
            id="Effects"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Effects"
            {...register("Effects")}
          />
          {errors.Effects ? <p>{errors.Effects.message}</p> : ""}
          <input
            type="text"
            id="SideEffects"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="SideEffects"
            {...register("SideEffects")}
          />
          {errors.SideEffects ? <p>{errors.SideEffects.message}</p> : ""}
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create new medication
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateMedication;
