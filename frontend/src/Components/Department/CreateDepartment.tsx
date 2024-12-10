import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/useAuth";

type Props = {
  initialData?: DepartmentFormInputs; // Optional initial data for updating
  departmentSubmit: (e: DepartmentFormInputs) => void;
};

type DepartmentFormInputs = {
  DepartmentID: number;
  DepartmentName: string;
  Location: string;
};

const validation = Yup.object().shape({
  DepartmentID: Yup.number().required("DepartmentID is required"),
  DepartmentName: Yup.string().required("DepartmentName is required"),
  Location: Yup.string().required("Location is required"),
});

const CreateDepartment = ({ initialData, departmentSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormInputs>({
    resolver: yupResolver(validation),
    defaultValues: initialData || {
      DepartmentID: 0,
      DepartmentName: "",
      Location: "",
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
        <form className="mt-4 ml-4" onSubmit={handleSubmit(departmentSubmit)}>
          <input
            type="text"
            id="DepartmentID"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="DepartmentID"
            {...register("DepartmentID")}
          />
          {errors.DepartmentID ? <p>{errors.DepartmentID.message}</p> : ""}
          <input
            type="text"
            id="DepartmentName"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="DepartmentName"
            {...register("DepartmentName")}
          />
          {errors.DepartmentName ? <p>{errors.DepartmentName.message}</p> : ""}
          <input
            type="text"
            id="Location"
            className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Location"
            {...register("Location")}
          />
          {errors.Location ? <p>{errors.Location.message}</p> : ""}
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create new department
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateDepartment;
