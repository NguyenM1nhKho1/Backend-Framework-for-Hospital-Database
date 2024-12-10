import React, { useEffect, useState } from "react";
import { Department } from "../../company";

import Table from "./DepartmentTable";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import {
  departmentDeleteAPI,
  departmentGetAPI,
  departmentPostAPI,
  departmentPutAPI,
} from "../../Services/DepartmentService";
import { toast } from "react-toastify";
import CreateDepartment from "./CreateDepartment";
import EditDepartment from "./EditDepartment";

type Props = {};

type DepartmentFormInputs = {
  DepartmentID: number;
  DepartmentName: string;
  Location: string;
};

const configs = [
  {
    label: "DepartmentID",
    render: (department: Department) => department.DepartmentID,
  },
  {
    label: "DepartmentName",
    render: (department: Department) => department.DepartmentName,
  },
  {
    label: "Location",
    render: (department: Department) => department.Location,
  },
];

const DepartmentPage = (props: Props) => {
  const [department, setDepartment] = useState<Department[]>();

  const [editingRow, setEditingRow] = useState<Department | null>(null);

  const [deletedRow, setDeletedRow] = useState<Department | null>(null);

  const handleEdit = (row: Department) => {
    setEditingRow(row); // Open edit form for the selected row
  };

  const handleDelete = (row: Department) => {
    setDeletedRow(row); // Open edit form for the selected row
  };

  const handleCancel = () => {
    setEditingRow(null); // Close edit form without saving
  };

  useEffect(() => {
    departmentGet();
  }, []);

  useEffect(() => {
    if (deletedRow) {
      // Call delete function when a row is selected for deletion
      departmentDelete(deletedRow);
    }
  }, [deletedRow]);

  const departmentGet = async () => {
    const result = await departmentGetAPI();
    setDepartment(result!.data);
  };

  const departmentPost = async (e: DepartmentFormInputs) => {
    departmentPostAPI(e.DepartmentID, e.DepartmentName, e.Location)
      .then((res) => {
        if (res) {
          toast.success("Department created successfully!");
          departmentGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const departmentPut = async (e: DepartmentFormInputs) => {
    departmentPutAPI(e.DepartmentID, e.DepartmentName, e.Location)
      .then((res) => {
        if (res) {
          toast.success("Department updated successfully!");
          departmentGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setEditingRow(null);
  };

  const departmentDelete = async (e: DepartmentFormInputs) => {
    departmentDeleteAPI(e.DepartmentID)
      .then((res) => {
        if (res) {
          toast.success("Department deleted successfully!");
          departmentGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setDeletedRow(null);
  };
  return (
    <>
      {department ? (
        <>
          <Table
            config={configs}
            data={department}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <CreateDepartment departmentSubmit={departmentPost} />
          {editingRow && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Edit Department</h2>
              <EditDepartment
                initialData={editingRow}
                onSubmit={departmentPut}
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

export default DepartmentPage;
