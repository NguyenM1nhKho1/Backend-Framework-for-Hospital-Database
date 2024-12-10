import React, { useEffect, useState } from "react";
import { RoomAssignment } from "../../company";

import Table from "./RoomAssignmentTable";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import {
  roomAssignmentDeleteAPI,
  roomAssignmentGetAPI,
  roomAssignmentPostAPI,
  roomAssignmentPutAPI,
} from "../../Services/RoomAssignmentService";
import { toast } from "react-toastify";
import CreateRoomAssignment from "./CreateRoomAssignment";
import EditRoomAssignment from "./EditRoomAssignment";

type Props = {};

type RoomAssignmentFormInputs = {
  AssignmentNumber: number;
  RoomID: number;
  StartDate: string;
  EndDate: string | null;
};

const configs = [
  {
    label: "AssignmentNumber",
    render: (roomAssignment: RoomAssignment) => roomAssignment.AssignmentNumber,
  },
  {
    label: "RoomID",
    render: (roomAssignment: RoomAssignment) => roomAssignment.RoomID,
  },
  {
    label: "StartDate",
    render: (roomAssignment: RoomAssignment) => roomAssignment.StartDate,
  },
  {
    label: "EndDate",
    render: (roomAssignment: RoomAssignment) => roomAssignment.EndDate,
  },
];

const RoomAssignmentPage = (props: Props) => {
  const [roomAssignment, setRoomAssignment] = useState<RoomAssignment[]>();

  const [editingRow, setEditingRow] = useState<RoomAssignment | null>(null);

  const [deletedRow, setDeletedRow] = useState<RoomAssignment | null>(null);

  const handleEdit = (row: RoomAssignment) => {
    setEditingRow(row); // Open edit form for the selected row
  };

  const handleDelete = (row: RoomAssignment) => {
    setDeletedRow(row); // Open edit form for the selected row
  };

  const handleCancel = () => {
    setEditingRow(null); // Close edit form without saving
  };

  useEffect(() => {
    roomAssignmentGet();
  }, []);

  useEffect(() => {
    if (deletedRow) {
      // Call delete function when a row is selected for deletion
      roomAssignmentDelete(deletedRow);
    }
  }, [deletedRow]);

  const roomAssignmentGet = async () => {
    const result = await roomAssignmentGetAPI();
    setRoomAssignment(result!.data);
  };

  const roomAssignmentPost = async (e: RoomAssignmentFormInputs) => {
    roomAssignmentPostAPI(e.AssignmentNumber, e.RoomID, e.StartDate, e.EndDate)
      .then((res) => {
        if (res) {
          toast.success("RoomAssignment created successfully!");
          roomAssignmentGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const roomAssignmentPut = async (e: RoomAssignmentFormInputs) => {
    roomAssignmentPutAPI(e.AssignmentNumber, e.RoomID, e.StartDate, e.EndDate)
      .then((res) => {
        if (res) {
          toast.success("RoomAssignment updated successfully!");
          roomAssignmentGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setEditingRow(null);
  };

  const roomAssignmentDelete = async (e: RoomAssignmentFormInputs) => {
    roomAssignmentDeleteAPI(e.AssignmentNumber, e.RoomID)
      .then((res) => {
        if (res) {
          toast.success("RoomAssignment deleted successfully!");
          roomAssignmentGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setDeletedRow(null);
  };
  return (
    <>
      {roomAssignment ? (
        <>
          <Table
            config={configs}
            data={roomAssignment}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <CreateRoomAssignment roomAssignmentSubmit={roomAssignmentPost} />
          {editingRow && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Edit RoomAssignment</h2>
              <EditRoomAssignment
                initialData={editingRow}
                roomAssignmentSubmit={roomAssignmentPut}
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

export default RoomAssignmentPage;
