import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type Props = {
  initialData?: MedicationFormInputs;
  onSubmit: (data: MedicationFormInputs) => void;
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

const MedicationForm = ({ initialData, onSubmit }: Props) => {
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

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        id="MedicationID"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="MedicationID"
        {...register("MedicationID")}
        disabled={!!initialData} // Disable MedicationID for updates
      />
      {errors.MedicationID && <p>{errors.MedicationID.message}</p>}
      <input
        type="text"
        id="Name"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="Name"
        {...register("Name")}
      />
      {errors.Name && <p>{errors.Name.message}</p>}
      <input
        type="text"
        id="UsagePerDay"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="UsagePerDay"
        {...register("UsagePerDay")}
      />
      {errors.UsagePerDay && <p>{errors.UsagePerDay.message}</p>}
      <input
        type="text"
        id="Dosage"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="Dosage"
        {...register("Dosage")}
      />
      {errors.Dosage ? <p>{errors.Dosage.message}</p> : ""}
      <input
        type="text"
        id="Effects"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="Effects"
        {...register("Effects")}
      />
      {errors.Effects ? <p>{errors.Effects.message}</p> : ""}
      <input
        type="text"
        id="SideEffects"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="SideEffects"
        {...register("SideEffects")}
      />
      {errors.SideEffects ? <p>{errors.SideEffects.message}</p> : ""}
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        {initialData ? "Update Medication" : "Create Medication"}
      </button>
    </form>
  );
};

export default MedicationForm;
