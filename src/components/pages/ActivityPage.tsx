import React, { useState, useEffect } from "react";
import { Grid, Button, Divider, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import DynamicTable from "../organisms/table";
import {
  getActivityCategories,
  getSeasonStages,
  getActivityStatuses,
  deleteActivity,
  createActivity,
  updateActivity,
  getNotes,
  getActivities,
} from "../../api-ffm-service";

import GenericConfirmDialog from "../organisms/genericConfirmDialog";
import ActivitiesDialog from "../organisms/activityDialog";
import moment from "moment";
import Loading from "./loading";
import { useGlobalState } from "../../GlobalState";
import { useFetchData, fetchData } from "../../hooks/useFethData";
import DynamicChip from "../atom/dynamicChip";
import { getFields } from "../../api-gs-service";
import KanbanBoard from "../organisms/kanbanBoard/kanbanOverview";

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
  const { selectedOrganization, activeAccount } = useGlobalState();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);

  useFetchData(getActivities, setActivities, setIsLoading, [
    selectedOrganization?.organizationId ?? 0,
  ]);
  useFetchData(getNotes, setNotes, undefined, [
    selectedOrganization?.organizationId ?? 0,
  ]);

  useFetchData(getActivityCategories, setActivityCategories);
  useFetchData(getActivityStatuses, setActivityStatuses);
  useFetchData(getSeasonStages, setSeasonStages);
  useFetchData(getFields, setFields, setIsLoading, [
    selectedOrganization?.partyIdentifier ?? 0,
  ]);

  const handleOpenForm = () => {
    setFormOpen(true);
    setSelectedActivity(null);
  };

  const handleCloseForm = () => {
    setSelectedActivity(null);
    setFormOpen(false);
    setIsLoading(false);
  };

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setFormOpen(true);
  };

  const handleDelete = () => {
    setSelectedActivity(selectedActivity);
    setConfirmOpen(true);
  };

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    formData.partyId = selectedOrganization?.partyId;
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

    fetchData(getActivities, setActivities, setIsLoading, [
      selectedOrganization?.organizationId ?? 0,
    ]);
    handleCloseForm();
  };

  const handleConfirmDelete = async () => {
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
      label: "Name",
      dataKey: "name",
      renderCell: (item) => <span>{item.name}</span>,
    },
    {
      label: "Category",
      dataKey: "category",
      renderCell: (item) => (
        <DynamicChip name={item.category} types={activityCategories} />
      ),
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
      label: "",
      dataKey: "actionButtons",
      renderCell: (item) => (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Edit />}
          onClick={() => handleEdit(item)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Activity Management</Typography>
            <Divider sx={{ marginTop: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <ActivitiesDialog
              isOpen={formOpen}
              onClose={handleCloseForm}
              onSubmit={handleSubmit}
              formData={selectedActivity}
              activityCategory={activityCategories}
              activityStatus={activityStatuses}
              seasonStages={seasonStages}
              notes={notes}
              fieldsMap={fields}
              handleDelete={handleDelete}
            />
            <KanbanBoard></KanbanBoard>
            <GenericConfirmDialog
              open={confirmOpen}
              onCancel={() => setConfirmOpen(false)}
              onConfirm={handleConfirmDelete}
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
