import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/useAuth";

type Props = {
  initialData?: DoctorFormInputs; // Optional initial data for updating
  doctorSubmit: (e: DoctorFormInputs) => void;
};

type DoctorFormInputs = {
  DoctorID: number;
  Name: string;
  Specialization: string;
  PhoneNumber: string;
  DepartmentID: number;
};

const validation = Yup.object().shape({
  DoctorID: Yup.number().required("DoctorID is required"),
  Name: Yup.string().required("Name is required"),
  Specialization: Yup.string().required("Specialization is required"),
  PhoneNumber: Yup.string().required("PhoneNumber is required"),
  DepartmentID: Yup.number().required("DepartmentID is required"),
});

const CreateDoctor = ({ initialData, doctorSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormInputs>({
    resolver: yupResolver(validation),
    defaultValues: initialData || {
      DoctorID: 0,
      Name: "",
      Specialization: "",
      PhoneNumber: "",
      DepartmentID: 0,
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
        <form className="mt-4 ml-4" onSubmit={handleSubmit(doctorSubmit)}>
          <input
            type="text"
            id="DoctorID"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="DoctorID"
            {...register("DoctorID")}
          />
          {errors.DoctorID ? <p>{errors.DoctorID.message}</p> : ""}
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
            id="Specialization"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Specialization"
            {...register("Specialization")}
          />
          {errors.Specialization ? <p>{errors.Specialization.message}</p> : ""}
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
            id="DepartmentID"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="DepartmentID"
            {...register("DepartmentID")}
          />
          {errors.DepartmentID ? <p>{errors.DepartmentID.message}</p> : ""}
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create new doctor
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateDoctor;
