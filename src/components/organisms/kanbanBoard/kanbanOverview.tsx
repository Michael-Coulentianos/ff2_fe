import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import { registerLicense } from "@syncfusion/ej2-base";
import {
  getActivities,
  getActivityStatuses,
  updateActivityStatus,
  getActivityCategories,
  getSeasonStages,
  updateActivity,
  createActivity,
  getNotes,
  deleteActivity,
} from "../../../api-ffm-service";
import { getFields } from "../../../api-gs-service";
import { useGlobalState } from "../../../GlobalState";
import { fetchData } from "../../../hooks/useFethData";
import "./overview.css";
import ActivityDialog from "../../organisms/activityDialog";
import { Status } from "../../../models/status.interface";
import { Button, CircularProgress } from "@mui/material";
import GenericConfirmDialog from "../genericConfirmDialog";
import Loading from "../../pages/loading";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVtpR2Nbe05yflRAal5QVAciSV9jS3pTc0VqWX1fdnZWQmhbUw=="
);

interface Task {
  Id: number;
  Title: string;
  Status: string;
  Summary: string;
  Type: string;
  Priority: string;
  Tags: string;
  Estimate: number;
  Assignee: string;
  RankId: number;
  Color: string;
  ClassName: string;
  activity: any;
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [activityStatuses, setActivityStatuses] = useState<any[]>([]);
  const { selectedOrganization, activeAccount } = useGlobalState();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activityCategories, setActivityCategories] = useState<any[]>([]);
  const [seasonStages, setSeasonStages] = useState<any[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [fields, setFields] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchData(getActivities, setActivities, undefined, [
            selectedOrganization?.organizationId ?? 0,
          ]),
          fetchData(getActivityStatuses, setActivityStatuses),
          fetchData(getActivityCategories, setActivityCategories),
          fetchData(getSeasonStages, setSeasonStages),
          fetchData(getFields, setFields, undefined, [
            selectedOrganization?.partyIdentifier ?? 0,
          ]),
          fetchData(getNotes, setNotes, undefined, [
            selectedOrganization?.organizationId ?? 0,
          ]),
        ]);
        setIsDataFetched(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, [selectedOrganization?.organizationId]);

  useEffect(() => {
    if (activities.length > 0 && activityStatuses.length > 0) {
      const transformedData = activities.map((activity) => ({
        Id: activity.activityId,
        Title: activity.name,
        Status: activity.status,
        Summary: activity.description,
        Type: "Task",
        Priority: "Normal",
        Tags: activity.category,
        Estimate: 1,
        Assignee: activity.assignedTo,
        RankId: 0,
        Color: "#02897B",
        ClassName: "e-task, e-normal, e-assignee",
        activity: activity,
      }));
      setTasks(transformedData);
    }
  }, [activities, activityStatuses]);

  const handleDelete = () => {
    setSelectedTask(selectedTask);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedTask) {
      try {
        await deleteActivity(selectedTask.activity.activityId);
        setActivities(
          activities.filter(
            (activity) => activity.activityId !== selectedTask.activity.activityId
          )
        );
      } catch (error) {
        console.error("Failed to delete organization:", error);
      }

      setConfirmOpen(false);
      closeModal();
    }
  };

  const handleDragStop = async (args) => {
    const { data } = args;
    const movedTask = data[0];

    const newStatusObj = activityStatuses.find(
      (status) => status.value === movedTask.Status
    );
    if (!newStatusObj) {
      console.error("Error: New Status not found");
      return;
    }

    const statusUpdate: Status = {
      statusId: newStatusObj.key,
      activityId: movedTask.Id,
      azureUserId: activeAccount?.azureUserId ?? "",
    };

    try {
      await updateActivityStatus(statusUpdate);
      console.log(movedTask);
      const updatedTasks = tasks.map((task) => {
        if (task.Id === movedTask.Id) {
          return {
            ...task,
            Status: movedTask.Status,
            activity: {
              ...task.activity,
              status: movedTask.Status,
              activityStatusId: newStatusObj.key,
            },
          };
        }
        return task;
      });

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleCardClick = (args) => {
    setSelectedTask(args.data);
    setShowModal(true);
  };
  const handleOpenForm = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleFormSubmit = async (formData) => {
    formData.partyId = selectedOrganization?.partyId;
    try {
      if (selectedTask) {
        await updateActivity(formData);
      } else {
        await createActivity(formData);
      }
      await fetchData(getActivities, setActivities, undefined, [
        selectedOrganization?.organizationId ?? 0,
      ]);
    } catch (error) {
      console.error(
        `Error ${selectedTask ? "updating" : "creating"} activity:`,
        error
      );
    }
    closeModal();
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenForm}
            sx={{ marginBottom: "5px", marginLeft: "5px" }}
          >
            Add Activity
          </Button>
          <div className="kanban-control-section">
            <div className="col-lg-12 control-section">
              <div className="control-wrapper">
                {isDataFetched ? (
                  <KanbanComponent
                    id="kanban"
                    keyField="Status"
                    dataSource={tasks}
                    cardSettings={{
                      contentField: "Summary",
                      headerField: "Title",
                      tagsField: "Tags",
                      grabberField: "Color",
                      footerCssField: "Assignee",
                    }}
                    dragStop={handleDragStop}
                    cardClick={handleCardClick}
                  >
                    <ColumnsDirective>
                      {activityStatuses.map((status) => (
                        <ColumnDirective
                          key={status.key}
                          headerText={status.value}
                          keyField={status.value}
                        />
                      ))}
                    </ColumnsDirective>
                  </KanbanComponent>
                ) : (
                  <CircularProgress color="primary" />
                )}
              </div>
            </div>
          </div>
          <ActivityDialog
            isOpen={showModal}
            onClose={closeModal}
            onSubmit={handleFormSubmit}
            activityCategory={activityCategories}
            activityStatus={activityStatuses}
            seasonStages={seasonStages}
            handleDelete={handleDelete}
            notes={notes}
            fieldsMap={fields}
            formData={selectedTask?.activity}
          />
          <GenericConfirmDialog
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Confirm Deletion"
            content="Are you sure you want to delete this activity?"
          />
        </>
      )}
    </>
  );
};

export default KanbanBoard;
