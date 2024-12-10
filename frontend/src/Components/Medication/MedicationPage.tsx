import React, { useEffect, useState } from "react";
import { Medication } from "../../company";

import Table from "./MedicationTable";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import { toast } from "react-toastify";
import {
  medicationDeleteAPI,
  medicationGetAPI,
  medicationPostAPI,
  medicationPutAPI,
} from "../../Services/MedicationService";
import CreateMedication from "./CreateMedication";
import EditMedication from "./EditMedication";
import { useAuth } from "../../Context/useAuth";

type Props = {};

type MedicationFormInputs = {
  MedicationID: number;
  Name: string;
  UsagePerDay: number;
  Dosage: number;
  Effects: string;
  SideEffects: string | null;
};

const configs = [
  {
    label: "MedicationID",
    render: (medication: Medication) => medication.MedicationID,
  },
  {
    label: "Name",
    render: (medication: Medication) => medication.Name,
  },
  {
    label: "UsagePerDay",
    render: (medication: Medication) => medication.UsagePerDay,
  },
  {
    label: "Dosage",
    render: (medication: Medication) => medication.Dosage,
  },
  {
    label: "Effects",
    render: (medication: Medication) => medication.Effects,
  },
  {
    label: "SideEffects",
    render: (medication: Medication) => medication.SideEffects,
  },
];

const MedicationPage = (props: Props) => {
  const { role } = useAuth();
  const [medication, setMedication] = useState<Medication[]>();

  const [editingRow, setEditingRow] = useState<Medication | null>(null);

  const [deletedRow, setDeletedRow] = useState<Medication | null>(null);

  const handleEdit = (row: Medication) => {
    setEditingRow(row); // Open edit form for the selected row
  };

  const handleDelete = (row: Medication) => {
    setDeletedRow(row); // Open edit form for the selected row
  };

  const handleCancel = () => {
    setEditingRow(null); // Close edit form without saving
  };

  useEffect(() => {
    medicationGet();
  }, []);

  useEffect(() => {
    if (deletedRow) {
      // Call delete function when a row is selected for deletion
      medicationDelete(deletedRow);
    }
  }, [deletedRow]);

  const medicationGet = async () => {
    const result = await medicationGetAPI();
    setMedication(result!.data);
  };

  const medicationPost = async (e: MedicationFormInputs) => {
    medicationPostAPI(
      e.MedicationID,
      e.Name,
      e.UsagePerDay,
      e.Dosage,
      e.Effects,
      e.SideEffects
    )
      .then((res) => {
        if (res) {
          toast.success("Medication created successfully!");
          medicationGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const medicationPut = async (e: MedicationFormInputs) => {
    medicationPutAPI(
      e.MedicationID,
      e.Name,
      e.UsagePerDay,
      e.Dosage,
      e.Effects,
      e.SideEffects
    )
      .then((res) => {
        if (res) {
          toast.success("Medication updated successfully!");
          medicationGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setEditingRow(null);
  };

  const medicationDelete = async (e: MedicationFormInputs) => {
    medicationDeleteAPI(e.MedicationID)
      .then((res) => {
        if (res) {
          toast.success("Medication deleted successfully!");
          medicationGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setDeletedRow(null);
  };
  return (
    <>
      {medication ? (
        <>
          <Table
            config={configs}
            data={medication}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <CreateMedication medicationSubmit={medicationPost} />
          {editingRow && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Edit Medication</h2>
              <EditMedication
                initialData={editingRow}
                onSubmit={medicationPut}
              />
            </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default MedicationPage;
