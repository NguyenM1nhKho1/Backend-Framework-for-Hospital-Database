import React, { useEffect, useState } from "react";
import { Patient } from "../../company";

import Table from "./PatientTable";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import { toast } from "react-toastify";
import {
  patientDeleteAPI,
  patientGetAPI,
  patientPostAPI,
  patientPutAPI,
} from "../../Services/PatientService";
import CreatePatient from "./CreatePatient";
import EditPatient from "./EditPatient";
import { useAuth } from "../../Context/useAuth";

type Props = {};

type PatientFormInputs = {
  PatientID: number;
  Name: string;
  DateOfBirth: string;
  PhoneNumber: string;
  Gender: string;
};

const configs = [
  {
    label: "PatientID",
    render: (patient: Patient) => patient.PatientID,
  },
  {
    label: "Name",
    render: (patient: Patient) => patient.Name,
  },
  {
    label: "DOB",
    render: (patient: Patient) => patient.DateOfBirth,
  },
  {
    label: "PhoneNumber",
    render: (patient: Patient) => patient.PhoneNumber,
  },
  {
    label: "Gender",
    render: (patient: Patient) => patient.Gender,
  },
];

const PatientPage = (props: Props) => {
  const { role } = useAuth();
  const [patient, setPatient] = useState<Patient[]>();

  const [editingRow, setEditingRow] = useState<Patient | null>(null);

  const [deletedRow, setDeletedRow] = useState<Patient | null>(null);

  const handleEdit = (row: Patient) => {
    setEditingRow(row); // Open edit form for the selected row
  };

  const handleDelete = (row: Patient) => {
    setDeletedRow(row); // Open edit form for the selected row
  };

  const handleCancel = () => {
    setEditingRow(null); // Close edit form without saving
  };

  useEffect(() => {
    patientGet();
  }, []);

  useEffect(() => {
    if (deletedRow) {
      // Call delete function when a row is selected for deletion
      patientDelete(deletedRow);
    }
  }, [deletedRow]);

  const patientGet = async () => {
    const result = await patientGetAPI();
    setPatient(result!.data);
  };

  const patientPost = async (e: PatientFormInputs) => {
    patientPostAPI(e.PatientID, e.Name, e.DateOfBirth, e.PhoneNumber, e.Gender)
      .then((res) => {
        if (res) {
          toast.success("Patient created successfully!");
          patientGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const patientPut = async (e: PatientFormInputs) => {
    patientPutAPI(e.PatientID, e.Name, e.DateOfBirth, e.PhoneNumber, e.Gender)
      .then((res) => {
        if (res) {
          toast.success("Patient updated successfully!");
          patientGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setEditingRow(null);
  };

  const patientDelete = async (e: PatientFormInputs) => {
    patientDeleteAPI(e.PatientID)
      .then((res) => {
        if (res) {
          toast.success("Patient deleted successfully!");
          patientGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setDeletedRow(null);
  };
  return (
    <>
      {patient ? (
        <>
          <Table
            config={configs}
            data={patient}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <CreatePatient patientSubmit={patientPost} />
          {editingRow && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Edit Patient</h2>
              <EditPatient initialData={editingRow} onSubmit={patientPut} />
            </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PatientPage;
