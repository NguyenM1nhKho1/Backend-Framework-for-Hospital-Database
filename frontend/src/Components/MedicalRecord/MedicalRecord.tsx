import React, { useEffect, useState } from "react";
import { MedicalRecord } from "../../company";

import Table from "./RecordTable";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import {
  recordDeleteAPI,
  recordGetAPI,
  recordPostAPI,
  recordPutAPI,
} from "../../Services/RecordService";
import { toast } from "react-toastify";
import CreateRecord from "./CreateRecord";
import EditRecord from "./EditRecord";

type Props = {};

type RecordFormInputs = {
  RecordNumber: number;
  PatientID: number;
  Details: string;
  Date: string;
};

const configs = [
  {
    label: "RecordNumber",
    render: (record: MedicalRecord) => record.RecordNumber,
  },
  {
    label: "PatientID",
    render: (record: MedicalRecord) => record.PatientID,
  },
  {
    label: "Details",
    render: (record: MedicalRecord) => record.Details,
  },
  {
    label: "Date",
    render: (record: MedicalRecord) => record.Date,
  },
];

const RecordPage = (props: Props) => {
  const [record, setRecord] = useState<MedicalRecord[]>();

  const [editingRow, setEditingRow] = useState<MedicalRecord | null>(null);

  const [deletedRow, setDeletedRow] = useState<MedicalRecord | null>(null);

  const handleEdit = (row: MedicalRecord) => {
    setEditingRow(row); // Open edit form for the selected row
  };

  const handleDelete = (row: MedicalRecord) => {
    setDeletedRow(row); // Open edit form for the selected row
  };

  const handleCancel = () => {
    setEditingRow(null); // Close edit form without saving
  };

  useEffect(() => {
    recordGet();
  }, []);

  useEffect(() => {
    if (deletedRow) {
      // Call delete function when a row is selected for deletion
      recordDelete(deletedRow);
    }
  }, [deletedRow]);

  const recordGet = async () => {
    const result = await recordGetAPI();
    setRecord(result!.data);
  };

  const recordPost = async (e: RecordFormInputs) => {
    recordPostAPI(e.RecordNumber, e.PatientID, e.Details, e.Date)
      .then((res) => {
        if (res) {
          toast.success("Record created successfully!");
          recordGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const recordPut = async (e: RecordFormInputs) => {
    recordPutAPI(e.RecordNumber, e.PatientID, e.Details, e.Date)
      .then((res) => {
        if (res) {
          toast.success("Record updated successfully!");
          recordGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setEditingRow(null);
  };

  const recordDelete = async (e: RecordFormInputs) => {
    recordDeleteAPI(e.RecordNumber, e.PatientID)
      .then((res) => {
        if (res) {
          toast.success("Record deleted successfully!");
          recordGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setDeletedRow(null);
  };
  return (
    <>
      {record ? (
        <>
          <Table
            config={configs}
            data={record}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <CreateRecord recordSubmit={recordPost} />
          {editingRow && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Edit Record</h2>
              <EditRecord initialData={editingRow} recordSubmit={recordPut} />
            </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default RecordPage;
