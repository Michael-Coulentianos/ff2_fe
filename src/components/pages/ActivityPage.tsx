import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import DynamicTable from "../organisms/table";
// import {
//   getActivities,
//   deleteActivity,
//   createActivity,
//   updateActivity,
//   getOrganizations,
//   getActivityTypes,
// } from "../../apiService";

import GenericConfirmDialog from "../organisms/genericConfirmDialog";
import ActivitysDialog from "../organisms/activityDialog";

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
  const [activityTypes, setActivityTypes] = useState<any[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [organizations, setOrganizations] = useState<any[]>([]);

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

  // useFetchData(getActivities, setActivities, setIsLoading);
  // useFetchData(getActivityTypes, setActivityTypes, setIsLoading);
  // useFetchData(getOrganizations, setOrganizations, setIsLoading);

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
    formData.partyId = organizations.find(
      (org) => org.name === formData.party
    )?.partyId;
    formData.activityTypeId = activityTypes.find(
      (nt) => nt.name === formData.activityType
    )?.activityTypeId;

    const currentDate = new Date();

    // Extract individual components of the date
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const milliseconds = String(currentDate.getMilliseconds()).padStart(7, "0");

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;

    formData.createdDate = formattedDate;

    const properties = {};
    addPropertyIfNotEmpty(properties, "severityType", formData.severityType);
    addPropertyIfNotEmpty(
      properties,
      "severitySubType",
      formData.severitySubType
    );
    addPropertyIfNotEmpty(properties, "cropType", formData.cropType);
    addPropertyIfNotEmpty(
      properties,
      "yieldEstimateHeads",
      formData.yieldEstimateHeads
    );
    addPropertyIfNotEmpty(
      properties,
      "yieldEstimateRowWidth",
      formData.yieldEstimateRowWidth
    );
    addPropertyIfNotEmpty(
      properties,
      "yieldEstimateGrams",
      formData.yieldEstimateGrams
    );
    addPropertyIfNotEmpty(
      properties,
      "cropAnalysisType",
      formData.cropAnalysisType
    );
    addPropertyIfNotEmpty(properties, "cropSubType", formData.cropSubType);
    addPropertyIfNotEmpty(properties, "severityScale", formData.severityScale);

    if (selectedActivity) {
      try {
        formData.property = JSON.stringify(properties);
        // await updateActivity(formData);
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
        // await createActivity(formData);
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
        // await deleteActivity(selectedActivity.activityId);
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
      label: "Owner",
      dataKey: "owner",
      renderCell: (item) => <span>{item.party}</span>,
    },
    {
      label: "Title",
      dataKey: "title",
      renderCell: (item) => <span>{item.title}</span>,
    },
    {
      label: "Location",
      dataKey: "location",
      renderCell: (item) => <span>{item.location}</span>,
    },
    {
      label: "Description",
      dataKey: "description",
      renderCell: (item) => <span>{item.description}</span>,
    },
    {
      label: "Date Created ",
      dataKey: "date",
      renderCell: (item) => <span>{item.createdDate}</span>,
    },
    {
      label: "Action Buttons",
      dataKey: "actionBtns",
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
          <Button variant="contained" onClick={handleOpenForm} color="primary">
            Add Activity
          </Button>
          <ActivitysDialog
            isOpen={formOpen}
            onClose={handleCloseForm}
            onSubmit={handleSubmit}
            formData={selectedActivity}
            activityTypes={activityTypes}
            organizations={organizations}
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
