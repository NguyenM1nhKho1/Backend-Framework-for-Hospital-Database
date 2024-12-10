import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type Props = {
  initialData?: DoctorFormInputs;
  onSubmit: (data: DoctorFormInputs) => void;
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

const DoctorForm = ({ initialData, onSubmit }: Props) => {
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

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        id="DoctorID"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="DoctorID"
        {...register("DoctorID")}
        disabled={!!initialData} // Disable DoctorID for updates
      />
      {errors.DoctorID && <p>{errors.DoctorID.message}</p>}
      <input
        type="text"
        id="DoctorName"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="DoctorName"
        {...register("Name")}
      />
      {errors.Name && <p>{errors.Name.message}</p>}
      <input
        type="text"
        id="Specialization"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
        placeholder="Specialization"
        {...register("Specialization")}
      />
      {errors.Specialization && <p>{errors.Specialization.message}</p>}
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
        placeholder="DepartmentID"
        {...register("DepartmentID")}
      />
      {errors.DepartmentID ? <p>{errors.DepartmentID.message}</p> : ""}
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        {initialData ? "Update Doctor" : "Create Doctor"}
      </button>
    </form>
  );
};

export default DoctorForm;
