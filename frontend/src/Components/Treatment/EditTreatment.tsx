import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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

  return (
    <form className="mt-4" onSubmit={handleSubmit(treatmentSubmit)}>
      <input
        type="number"
        id="TreatmentID"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="TreatmentID"
        {...register("TreatmentID")}
        disabled={!!initialData} // Disable TreatmentID for updates
      />
      {errors.TreatmentID && <p>{errors.TreatmentID.message}</p>}
      <input
        type="text"
        id="TreatmentName"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="TreatmentName"
        {...register("TreatmentName")}
      />
      {errors.TreatmentName && <p>{errors.TreatmentName.message}</p>}
      <input
        type="text"
        id="Description"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="Description"
        {...register("Description")}
      />
      {errors.Description && <p>{errors.Description.message}</p>}
      <input
        type="text"
        id="Cost"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="Cost"
        {...register("Cost")}
      />
      {errors.Cost && <p>{errors.Cost.message}</p>}
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        {initialData ? "Update Treatment" : "Create Treatment"}
      </button>
    </form>
  );
};

export default CreateTreatment;
