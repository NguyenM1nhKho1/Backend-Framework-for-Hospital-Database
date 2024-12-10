import React, { useEffect, useState } from "react";
import { Room } from "../../company";

import Table from "./RoomTable";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import {
  roomDeleteAPI,
  roomGetAPI,
  roomPostAPI,
  roomPutAPI,
} from "../../Services/RoomService";
import { toast } from "react-toastify";
import CreateRoom from "./CreateRoom";
import EditRoom from "./EditRoom";

type Props = {};

type RoomFormInputs = {
  RoomID: number;
  RoomNumber: number;
  RoomType: string;
  PatientID: number;
};

const configs = [
  {
    label: "RoomID",
    render: (room: Room) => room.RoomID,
  },
  {
    label: "RoomNumber",
    render: (room: Room) => room.RoomNumber,
  },
  {
    label: "RoomType",
    render: (room: Room) => room.RoomType,
  },
  {
    label: "PatientID",
    render: (room: Room) => room.PatientID,
  },
];

const RoomPage = (props: Props) => {
  const [room, setRoom] = useState<Room[]>();

  const [editingRow, setEditingRow] = useState<Room | null>(null);

  const [deletedRow, setDeletedRow] = useState<Room | null>(null);

  const handleEdit = (row: Room) => {
    setEditingRow(row); // Open edit form for the selected row
  };

  const handleDelete = (row: Room) => {
    setDeletedRow(row); // Open edit form for the selected row
  };

  const handleCancel = () => {
    setEditingRow(null); // Close edit form without saving
  };

  useEffect(() => {
    roomGet();
  }, []);

  useEffect(() => {
    if (deletedRow) {
      // Call delete function when a row is selected for deletion
      roomDelete(deletedRow);
    }
  }, [deletedRow]);

  const roomGet = async () => {
    const result = await roomGetAPI();
    setRoom(result!.data);
  };

  const roomPost = async (e: RoomFormInputs) => {
    roomPostAPI(e.RoomID, e.RoomNumber, e.RoomType, e.PatientID)
      .then((res) => {
        if (res) {
          toast.success("Room created successfully!");
          roomGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const roomPut = async (e: RoomFormInputs) => {
    roomPutAPI(e.RoomID, e.RoomNumber, e.RoomType, e.PatientID)
      .then((res) => {
        if (res) {
          toast.success("Room updated successfully!");
          roomGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setEditingRow(null);
  };

  const roomDelete = async (e: RoomFormInputs) => {
    roomDeleteAPI(e.RoomID)
      .then((res) => {
        if (res) {
          toast.success("Room deleted successfully!");
          roomGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setDeletedRow(null);
  };
  return (
    <>
      {room ? (
        <>
          <Table
            config={configs}
            data={room}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <CreateRoom roomSubmit={roomPost} />
          {editingRow && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Edit Room</h2>
              <EditRoom initialData={editingRow} roomSubmit={roomPut} />
            </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default RoomPage;
