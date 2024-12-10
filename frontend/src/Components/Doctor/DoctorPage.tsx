import React, { useEffect, useState } from "react";
import { Doctor } from "../../company";

import Table from "./DoctorTable";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import { toast } from "react-toastify";
import {
  doctorDeleteAPI,
  doctorGetAPI,
  doctorPostAPI,
  doctorPutAPI,
} from "../../Services/DoctorService";
import CreateDoctor from "./CreateDoctor";
import EditDoctor from "./EditDoctor";
import { useAuth } from "../../Context/useAuth";

type Props = {};

type DoctorFormInputs = {
  DoctorID: number;
  Name: string;
  Specialization: string;
  PhoneNumber: string;
  DepartmentID: number;
};

const configs = [
  {
    label: "DoctorID",
    render: (doctor: Doctor) => doctor.DoctorID,
  },
  {
    label: "Name",
    render: (doctor: Doctor) => doctor.Name,
  },
  {
    label: "Specialization",
    render: (doctor: Doctor) => doctor.Specialization,
  },
  {
    label: "PhoneNumber",
    render: (doctor: Doctor) => doctor.PhoneNumber,
  },
  {
    label: "DepartmentID",
    render: (doctor: Doctor) => doctor.DepartmentID,
  },
];

const DoctorPage = (props: Props) => {
  const { role } = useAuth();
  const [doctor, setDoctor] = useState<Doctor[]>();

  const [editingRow, setEditingRow] = useState<Doctor | null>(null);

  const [deletedRow, setDeletedRow] = useState<Doctor | null>(null);

  const handleEdit = (row: Doctor) => {
    setEditingRow(row); // Open edit form for the selected row
  };

  const handleDelete = (row: Doctor) => {
    setDeletedRow(row); // Open edit form for the selected row
  };

  const handleCancel = () => {
    setEditingRow(null); // Close edit form without saving
  };

  useEffect(() => {
    doctorGet();
  }, []);

  useEffect(() => {
    if (deletedRow) {
      // Call delete function when a row is selected for deletion
      doctorDelete(deletedRow);
    }
  }, [deletedRow]);

  const doctorGet = async () => {
    const result = await doctorGetAPI();
    setDoctor(result!.data);
  };

  const doctorPost = async (e: DoctorFormInputs) => {
    doctorPostAPI(
      e.DoctorID,
      e.Name,
      e.Specialization,
      e.PhoneNumber,
      e.DepartmentID
    )
      .then((res) => {
        if (res) {
          toast.success("Doctor created successfully!");
          doctorGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const doctorPut = async (e: DoctorFormInputs) => {
    doctorPutAPI(
      e.DoctorID,
      e.Name,
      e.Specialization,
      e.PhoneNumber,
      e.DepartmentID
    )
      .then((res) => {
        if (res) {
          toast.success("Doctor updated successfully!");
          doctorGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setEditingRow(null);
  };

  const doctorDelete = async (e: DoctorFormInputs) => {
    doctorDeleteAPI(e.DoctorID)
      .then((res) => {
        if (res) {
          toast.success("Doctor deleted successfully!");
          doctorGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setDeletedRow(null);
  };
  return (
    <>
      {doctor ? (
        <>
          <Table
            config={configs}
            data={doctor}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <CreateDoctor doctorSubmit={doctorPost} />
          {editingRow && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Edit Doctor</h2>
              <EditDoctor initialData={editingRow} onSubmit={doctorPut} />
            </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default DoctorPage;
