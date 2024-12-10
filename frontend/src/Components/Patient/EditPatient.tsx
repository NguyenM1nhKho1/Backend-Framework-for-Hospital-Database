import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type PatientFormInputs = {
  PatientID: number;
  Name: string;
  DateOfBirth: string;
  PhoneNumber: string;
  Gender: string;
};

type Props = {
  initialData?: PatientFormInputs;
  onSubmit: (data: PatientFormInputs) => void;
};

const validationSchema = Yup.object().shape({
  PatientID: Yup.number().required("PatientID is required"),
  Name: Yup.string().required("Name is required"),
  DateOfBirth: Yup.string().required("DOB is required"),
  PhoneNumber: Yup.string().required("PhoneNumber is required"),
  Gender: Yup.string().required("Gender is required"),
});

const PatientForm = ({ initialData, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData || {
      PatientID: 0,
      Name: "",
      DateOfBirth: "",
    },
  });

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        id="PatientID"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="PatientID"
        {...register("PatientID")}
        disabled={!!initialData} // Disable PatientID for updates
      />
      {errors.PatientID && <p>{errors.PatientID.message}</p>}
      <input
        type="text"
        id="PatientName"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="PatientName"
        {...register("Name")}
      />
      {errors.Name && <p>{errors.Name.message}</p>}
      <input
        type="text"
        id="DateOfBirth"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="DOB"
        {...register("DateOfBirth")}
      />
      {errors.DateOfBirth && <p>{errors.DateOfBirth.message}</p>}
      <input
        type="text"
        id="PhoneNumber"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="PhoneNumber"
        {...register("PhoneNumber")}
      />
      {errors.PhoneNumber ? <p>{errors.PhoneNumber.message}</p> : ""}
      <input
        type="text"
        id="Gender"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="Gender"
        {...register("Gender")}
      />
      {errors.Gender ? <p>{errors.Gender.message}</p> : ""}
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        {initialData ? "Update Patient" : "Create Patient"}
      </button>
    </form>
  );
};

export default PatientForm;
