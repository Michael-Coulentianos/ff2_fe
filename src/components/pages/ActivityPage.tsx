import React, { useState, useEffect } from "react";
import { Grid, Button, Divider } from "@mui/material";
import ActionButtons from "../molecules/ActionButtons";
import DynamicTable from "../organisms/Table";
import {
  getActivityCategories,
  getSeasonStages,
  getActivityStatuses,
  deleteActivity,
  createActivity,
  updateActivity,
  getNotes,
  getActivities,
  getOrganizations,
} from "../../apiService";
import GenericConfirmDialog from "../organisms/GenericConfirmDialog";
import ActivitiesDialog from "../organisms/ActivityDialog";
import moment from "moment";
import Loading from "./Loading";

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
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [activityCategories, setActivityCategories] = useState<any[]>([]);
  const [activityStatuses, setActivityStatuses] = useState<any[]>([]);
  const [seasonStages, setSeasonStages] = useState<any[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);

  async function fetchData(fetchFunction, setData) {
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
    };
  }
  
  function useFetchData(fetchFunction, setData) {
    useEffect(() => {
      fetchData(fetchFunction, setData);
    }, [fetchFunction, setData]);
  }

  useFetchData(getActivities, setActivities);
  useFetchData(getOrganizations, setOrganizations);
  useFetchData(getNotes, setNotes);
  useFetchData(getActivityCategories, setActivityCategories);
  useFetchData(getActivityStatuses, setActivityStatuses);
  useFetchData(getSeasonStages, setSeasonStages);

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
    const properties = {};
    formData.properties = properties;//JSON.stringify(properties);
    formData.startDate = "2024/04/30";
    formData.endDate = "2024/04/30";
    console.log(formData);
    if (selectedActivity) {
      try {
        await updateActivity(formData);
      } catch (error) {
        console.error("Error updating activity:", error);
      }
    } else {
      try {
        await createActivity(formData);
      } catch (error) {
        console.error("Error creating activity:", error);
      }
    }

    fetchData(getActivities, setActivities);
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
      setIsLoading(false);
      setConfirmOpen(false);
      handleCloseForm();
    }
  };

  const myColumns: ColumnConfig[] = [
    {
      label: "Name",
      dataKey: "name",
      renderCell: (item) => <span>{item.name}</span>,
    },
    {
      label: "Category",
      dataKey: "category",
      renderCell: (item) => <span>{item.category}</span>,
    },
    {
      label: "Field",
      dataKey: "field",
      renderCell: (item) => <span>{item.field}</span>,
    },
    {
      label: "Description",
      dataKey: "description",
      renderCell: (item) => <span>{item.description}</span>,
    },
    {
      label: "Status",
      dataKey: "status",
      renderCell: (item) => <span>{item.status}</span>,
    },
    {
      label: "Date",
      dataKey: "date",
      renderCell: (item) => (
        <span>
          <p>Start Date: {moment(item.startDate).format("DD MMMM YYYY")}</p>
          <p>End Date: {moment(item.endDate).format("DD MMMM YYYY")}</p>
        </span>
      ),
    },
    {
      label: "Cost",
      dataKey: "cost",
      renderCell: (item) => <span>R{item.cost}</span>,
    },
    {
      label: "Assignee",
      dataKey: "assignee",
      renderCell: (item) => <span>{item.assignedTo}</span>,
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
      {isLoading && <Loading />}
      {!isLoading && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1 className="title">Activity Management</h1>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleOpenForm}
              color="primary"
            >
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
              organizations={organizations}
            />
          </Grid>
          <Grid item xs={12}>
            <DynamicTable
              data={activities}
              columns={myColumns}
              rowsPerPage={5}
            />
            <GenericConfirmDialog
              open={confirmOpen}
              onCancel={() => setConfirmOpen(false)}
              onConfirm={handleConfirm}
              title="Confirm Deletion"
              content="Are you sure you want to delete this activity?"
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Activities;
