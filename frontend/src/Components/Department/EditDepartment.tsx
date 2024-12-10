import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type DepartmentFormInputs = {
  DepartmentID: number;
  DepartmentName: string;
  Location: string;
};

type Props = {
  initialData?: DepartmentFormInputs;
  onSubmit: (data: DepartmentFormInputs) => void;
};

const validationSchema = Yup.object().shape({
  DepartmentID: Yup.number().required("DepartmentID is required"),
  DepartmentName: Yup.string().required("DepartmentName is required"),
  Location: Yup.string().required("Location is required"),
});

const DepartmentForm = ({ initialData, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData || {
      DepartmentID: 0,
      DepartmentName: "",
      Location: "",
    },
  });

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        id="DepartmentID"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="DepartmentID"
        {...register("DepartmentID")}
        disabled={!!initialData} // Disable DepartmentID for updates
      />
      {errors.DepartmentID && <p>{errors.DepartmentID.message}</p>}
      <input
        type="text"
        id="DepartmentName"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="DepartmentName"
        {...register("DepartmentName")}
      />
      {errors.DepartmentName && <p>{errors.DepartmentName.message}</p>}
      <input
        type="text"
        id="Location"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="Location"
        {...register("Location")}
      />
      {errors.Location && <p>{errors.Location.message}</p>}
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        {initialData ? "Update Department" : "Create Department"}
      </button>
    </form>
  );
};

export default DepartmentForm;
