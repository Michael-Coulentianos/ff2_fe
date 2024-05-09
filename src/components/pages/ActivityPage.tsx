import React, { useState, useEffect } from "react";
import { Grid, Button, Divider } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import DynamicTable from "../organisms/table";
import {
  getActivityCategories,
  getSeasonStages,
  getActivityStatuses,
  deleteActivity,
  createActivity,
  updateActivity,
  getNotes,
  getActivities
} from "../../apiService";
import GenericConfirmDialog from "../organisms/genericConfirmDialog";
import ActivitiesDialog from "../organisms/activityDialog";

interface DataItem {
  id: string;
  [key: string]: any;
}

interface ColumnConfig {
  label: string;
  dataKey: keyof DataItem;
  renderCell: (item: DataItem) => React.ReactNode;
}

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [activityCategories, setActivityCategories] = useState<any[]>([]);
  const [activityStatuses, setActivityStatuses] = useState<any[]>([]);
  const [seasonStages, setSeasonStages] = useState<any[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);

  function useFetchData(fetchFunction, setData, setIsLoading) {
    useEffect(() => {
      async function fetchData() {
        setIsLoading(true);
        try {
          const data = await fetchFunction();
          setData(data);
        } catch (error) {
          console.error(
            `Error fetching data from ${fetchFunction.name}:`,
            error
          );
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();
    }, [fetchFunction, setData, setIsLoading]);
  }

  useFetchData(getActivities, setActivities, setIsLoading);
  useFetchData(getNotes, setNotes, setIsLoading);
  useFetchData(getActivityCategories, setActivityCategories, setIsLoading);
  useFetchData(getActivityStatuses, setActivityStatuses, setIsLoading);
  useFetchData(getSeasonStages, setSeasonStages, setIsLoading);

  const handleOpenForm = () => {
    setFormOpen(true);
    setSelectedActivity(null);
  };

  const handleCloseForm = () => {
    setSelectedActivity(null);
    setFormOpen(false);
  };

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setFormOpen(true);
  };

  const handleDelete = (activity) => {
    setSelectedActivity(activity);
    setConfirmOpen(true);
  };

  const addPropertyIfNotEmpty = (obj, key, value) => {
    if (value !== null && value !== "" && value !== undefined) {
      obj[key] = value;
    }
  };

  const handleSubmit = async (formData: any) => {
    formData.noteId = notes.find(
      (note) => note.title === formData.title
    )?.noteId;
    formData.activityTypeId = activityCategories.find(
      (nt) => nt.name === formData.activityType
    )?.activityTypeId;

    const formatDate = (date: Date) => {
      const pad = (num: number) => String(num).padStart(2, "0");
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());
      const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    const startDate = new Date();
    const endDate = new Date();

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    formData.startDate = formattedStartDate;
    formData.createdDate = formattedStartDate;
    formData.endDate = formattedEndDate;

    const properties = {};
    addPropertyIfNotEmpty(
      properties,
      "activityStatus",
      formData.yieldEstimateHeads
    );

    if (selectedActivity) {
      try {
        formData.property = JSON.stringify(properties);
        await updateActivity(formData);
        const updatedActivities = activities.filter(
          (activity) => activity.activityId !== formData.activityId
        );
        setActivities([...updatedActivities, formData]);
      } catch (error) {
        console.error("Error updating activity:", error);
      }
    } else {
      try {
        
        formData.property = JSON.stringify(properties);
        await createActivity(formData);
        setActivities([...activities, formData]);
      } catch (error) {
        console.error("Error creating activity:", error);
      }
    }
    
    setIsLoading(false);
    handleCloseForm();
  };

  const handleConfirm = async () => {
    if (selectedActivity) {
      setIsLoading(true);
      try {
        await deleteActivity(selectedActivity.activityId);
        setActivities(
          activities.filter(
            (activity) => activity.activityId !== selectedActivity.activityId
          )
        );
      } catch (error) {
        console.error("Failed to delete organization:", error);
      }
      setConfirmOpen(false);
      handleCloseForm();
    }
  };

  const myColumns: ColumnConfig[] = [
    {
      label: "Category",
      dataKey: "category",
      renderCell: (item) => <span>{item.party}</span>,
    },
    {
      label: "Date range",
      dataKey: "date range",
      renderCell: (item) => <span>{item.title}</span>,
    },
    {
      label: "Fields",
      dataKey: "fields",
      renderCell: (item) => <span>{item.description}</span>,
    },
    {
      label: "Name",
      dataKey: "name",
      renderCell: (item) => <span>{item.createdDate}</span>,
    },
    {
      label: "Description",
      dataKey: "description",
      renderCell: (item) => <span>{item.description}</span>,
    },
    {
      label: "Notes",
      dataKey: "notes",
      renderCell: (item) => <span>{item.createdDate}</span>,
    },
    {
      label: "Contract work cost",
      dataKey: "contract work cost",
      renderCell: (item) => <span>{item.createdDate}</span>,
    },
    {
      label: "Assignee",
      dataKey: "assignee",
      renderCell: (item) => <span>{item.createdDate}</span>,
    },
    {
      label: "Action Buttons",
      dataKey: "actionButtons",
      renderCell: (item) => (
        <ActionButtons
          onEdit={() => handleEdit(item)}
          onDelete={() => handleDelete(item)}
        ></ActionButtons>
      ),
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 className="title">Activity Management</h1>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleOpenForm} color="primary">
            Add Activity
          </Button>
          <ActivitiesDialog
            isOpen={formOpen}
            onClose={handleCloseForm}
            onSubmit={handleSubmit}
            formData={selectedActivity}
            activityCategory={activityCategories}
            activityStatus={activityStatuses}
            seasonStages={seasonStages}
            noteList={notes}
          />
        </Grid>
        <Grid item xs={12}>
          <DynamicTable data={activities} columns={myColumns} rowsPerPage={5} />
          <GenericConfirmDialog
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={handleConfirm}
            title="Confirm Deletion"
            content="Are you sure you want to delete this activity?"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Activities;
