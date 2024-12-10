import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/useAuth";

type Props = {
  initialData?: PatientFormInputs; // Optional initial data for updating
  patientSubmit: (e: PatientFormInputs) => void;
};

type PatientFormInputs = {
  PatientID: number;
  Name: string;
  DateOfBirth: string;
  PhoneNumber: string;
  Gender: string;
};

const validation = Yup.object().shape({
  PatientID: Yup.number().required("PatientID is required"),
  Name: Yup.string().required("Name is required"),
  DateOfBirth: Yup.string().required("DOB is required"),
  PhoneNumber: Yup.string().required("PhoneNumber is required"),
  Gender: Yup.string().required("Gender is required"),
});

const CreatePatient = ({ initialData, patientSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormInputs>({
    resolver: yupResolver(validation),
    defaultValues: initialData || {
      PatientID: 0,
      Name: "",
      DateOfBirth: "",
    },
  });

  const { role } = useAuth();

  const [showForm, setShowForm] = useState<boolean>(!!initialData);

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
        <form className="mt-4 ml-4" onSubmit={handleSubmit(patientSubmit)}>
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
            id="Name"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
            {...register("Name")}
          />
          {errors.Name ? <p>{errors.Name.message}</p> : ""}
          <input
            type="text"
            id="DateOfBirth"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="DOB"
            {...register("DateOfBirth")}
          />
          {errors.DateOfBirth ? <p>{errors.DateOfBirth.message}</p> : ""}
          <input
            type="text"
            id="PhoneNumber"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="PhoneNumber"
            {...register("PhoneNumber")}
          />
          {errors.PhoneNumber ? <p>{errors.PhoneNumber.message}</p> : ""}
          <input
            type="text"
            id="Gender"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Gender"
            {...register("Gender")}
          />
          {errors.Gender ? <p>{errors.Gender.message}</p> : ""}
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create new patient
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatePatient;
