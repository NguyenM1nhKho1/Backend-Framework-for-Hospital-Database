import React, { useEffect, useState } from "react";
import { Bill } from "../../company";

import Table from "./BillTable";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import {
  billDeleteAPI,
  billGetAPI,
  billPostAPI,
  billPutAPI,
} from "../../Services/BillService";
import { toast } from "react-toastify";
import CreateBill from "./CreateBill";
import EditBill from "./EditBill";

type Props = {};

type BillFormInputs = {
  BillID: number;
  PatientID: number;
  TotalAmount: number;
  DateIssued: string;
};

const configs = [
  {
    label: "BillID",
    render: (bill: Bill) => bill.BillID,
  },
  {
    label: "PatientID",
    render: (bill: Bill) => bill.PatientID,
  },
  {
    label: "TotalAmount",
    render: (bill: Bill) => bill.TotalAmount,
  },
  {
    label: "DateIssued",
    render: (bill: Bill) => bill.DateIssued,
  },
];

const BillPage = (props: Props) => {
  const [bill, setBill] = useState<Bill[]>();

  const [editingRow, setEditingRow] = useState<Bill | null>(null);

  const [deletedRow, setDeletedRow] = useState<Bill | null>(null);

  const handleEdit = (row: Bill) => {
    setEditingRow(row); // Open edit form for the selected row
  };

  const handleDelete = (row: Bill) => {
    setDeletedRow(row); // Open edit form for the selected row
  };

  const handleCancel = () => {
    setEditingRow(null); // Close edit form without saving
  };

  useEffect(() => {
    billGet();
  }, []);

  useEffect(() => {
    if (deletedRow) {
      // Call delete function when a row is selected for deletion
      billDelete(deletedRow);
    }
  }, [deletedRow]);

  const billGet = async () => {
    const result = await billGetAPI();
    setBill(result!.data);
  };

  const billPost = async (e: BillFormInputs) => {
    billPostAPI(e.BillID, e.PatientID, e.TotalAmount, e.DateIssued)
      .then((res) => {
        if (res) {
          toast.success("Bill created successfully!");
          billGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const billPut = async (e: BillFormInputs) => {
    billPutAPI(e.BillID, e.PatientID, e.TotalAmount, e.DateIssued)
      .then((res) => {
        if (res) {
          toast.success("Bill updated successfully!");
          billGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setEditingRow(null);
  };

  const billDelete = async (e: BillFormInputs) => {
    billDeleteAPI(e.BillID)
      .then((res) => {
        if (res) {
          toast.success("Bill deleted successfully!");
          billGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setDeletedRow(null);
  };
  return (
    <>
      {bill ? (
        <>
          <Table
            config={configs}
            data={bill}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <CreateBill billSubmit={billPost} />
          {editingRow && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Edit Bill</h2>
              <EditBill initialData={editingRow} billSubmit={billPut} />
            </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default BillPage;
