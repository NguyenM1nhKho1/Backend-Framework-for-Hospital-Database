import React, { useEffect, useState } from "react";
import { Treatment } from "../../company";

import Table from "./TreatmentTable";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import {
  treatmentDeleteAPI,
  treatmentGetAPI,
  treatmentPostAPI,
  treatmentPutAPI,
} from "../../Services/TreatmentService";
import { toast } from "react-toastify";
import CreateTreatment from "./CreateTreatment";
import EditTreatment from "./EditTreatment";

type Props = {};

type TreatmentFormInputs = {
  TreatmentID: number;
  TreatmentName: string;
  Description: string | null;
  Cost: number;
};

const configs = [
  {
    label: "TreatmentID",
    render: (treatment: Treatment) => treatment.TreatmentID,
  },
  {
    label: "TreatmentName",
    render: (treatment: Treatment) => treatment.TreatmentName,
  },
  {
    label: "Description",
    render: (treatment: Treatment) => treatment.Description,
  },
  {
    label: "Cost",
    render: (treatment: Treatment) => treatment.Cost,
  },
];

const TreatmentPage = (props: Props) => {
  const [treatment, setTreatment] = useState<Treatment[]>();

  const [editingRow, setEditingRow] = useState<Treatment | null>(null);

  const [deletedRow, setDeletedRow] = useState<Treatment | null>(null);

  const handleEdit = (row: Treatment) => {
    setEditingRow(row); // Open edit form for the selected row
  };

  const handleDelete = (row: Treatment) => {
    setDeletedRow(row); // Open edit form for the selected row
  };

  const handleCancel = () => {
    setEditingRow(null); // Close edit form without saving
  };

  useEffect(() => {
    treatmentGet();
  }, []);

  useEffect(() => {
    if (deletedRow) {
      // Call delete function when a row is selected for deletion
      treatmentDelete(deletedRow);
    }
  }, [deletedRow]);

  const treatmentGet = async () => {
    const result = await treatmentGetAPI();
    setTreatment(result!.data);
  };

  const treatmentPost = async (e: TreatmentFormInputs) => {
    treatmentPostAPI(e.TreatmentID, e.TreatmentName, e.Description, e.Cost)
      .then((res) => {
        if (res) {
          toast.success("Treatment created successfully!");
          treatmentGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const treatmentPut = async (e: TreatmentFormInputs) => {
    treatmentPutAPI(e.TreatmentID, e.TreatmentName, e.Description, e.Cost)
      .then((res) => {
        if (res) {
          toast.success("Treatment updated successfully!");
          treatmentGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setEditingRow(null);
  };

  const treatmentDelete = async (e: TreatmentFormInputs) => {
    treatmentDeleteAPI(e.TreatmentID)
      .then((res) => {
        if (res) {
          toast.success("Treatment deleted successfully!");
          treatmentGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setDeletedRow(null);
  };
  return (
    <>
      {treatment ? (
        <>
          <Table
            config={configs}
            data={treatment}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <CreateTreatment treatmentSubmit={treatmentPost} />
          {editingRow && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Edit Treatment</h2>
              <EditTreatment
                initialData={editingRow}
                treatmentSubmit={treatmentPut}
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

export default TreatmentPage;
