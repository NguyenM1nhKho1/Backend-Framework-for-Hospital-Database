import React, { useEffect, useState } from "react";
import { Schedule } from "../../company";

import Table from "./ScheduleTable";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import {
  scheduleDeleteAPI,
  scheduleGetAPI,
  schedulePostAPI,
  schedulePutAPI,
} from "../../Services/ScheduleService";
import { toast } from "react-toastify";
import CreateSchedule from "./CreateSchedule";
import EditSchedule from "./EditSchedule";

type Props = {};

type ScheduleFormInputs = {
  ScheduleID: number;
  DoctorID: number;
  Time: string;
  Day: string;
};

const configs = [
  {
    label: "ScheduleID",
    render: (schedule: Schedule) => schedule.ScheduleID,
  },
  {
    label: "DoctorID",
    render: (schedule: Schedule) => schedule.DoctorID,
  },
  {
    label: "Time",
    render: (schedule: Schedule) => schedule.Time,
  },
  {
    label: "Day",
    render: (schedule: Schedule) => schedule.Day,
  },
];

const SchedulePage = (props: Props) => {
  const [schedule, setSchedule] = useState<Schedule[]>();

  const [editingRow, setEditingRow] = useState<Schedule | null>(null);

  const [deletedRow, setDeletedRow] = useState<Schedule | null>(null);

  const handleEdit = (row: Schedule) => {
    setEditingRow(row); // Open edit form for the selected row
  };

  const handleDelete = (row: Schedule) => {
    setDeletedRow(row); // Open edit form for the selected row
  };

  const handleCancel = () => {
    setEditingRow(null); // Close edit form without saving
  };

  useEffect(() => {
    scheduleGet();
  }, []);

  useEffect(() => {
    if (deletedRow) {
      // Call delete function when a row is selected for deletion
      scheduleDelete(deletedRow);
    }
  }, [deletedRow]);

  const scheduleGet = async () => {
    const result = await scheduleGetAPI();
    setSchedule(result!.data);
  };

  const schedulePost = async (e: ScheduleFormInputs) => {
    schedulePostAPI(e.ScheduleID, e.DoctorID, e.Time, e.Day)
      .then((res) => {
        if (res) {
          toast.success("Schedule created successfully!");
          scheduleGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const schedulePut = async (e: ScheduleFormInputs) => {
    schedulePutAPI(e.ScheduleID, e.DoctorID, e.Time, e.Day)
      .then((res) => {
        if (res) {
          toast.success("Schedule updated successfully!");
          scheduleGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setEditingRow(null);
  };

  const scheduleDelete = async (e: ScheduleFormInputs) => {
    scheduleDeleteAPI(e.ScheduleID, e.DoctorID)
      .then((res) => {
        if (res) {
          toast.success("Schedule deleted successfully!");
          scheduleGet();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    setDeletedRow(null);
  };
  return (
    <>
      {schedule ? (
        <>
          <Table
            config={configs}
            data={schedule}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <CreateSchedule scheduleSubmit={schedulePost} />
          {editingRow && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Edit Schedule</h2>
              <EditSchedule
                initialData={editingRow}
                scheduleSubmit={schedulePut}
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

export default SchedulePage;
