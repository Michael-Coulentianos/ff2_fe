import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import { registerLicense } from "@syncfusion/ej2-base";
import { formatDate } from "../../../utils/Utilities";
import {
  getActivities,
  getActivityStatuses,
  updateActivityStatus,
  getActivityCategories,
  getSeasonStages,
  updateActivity,
} from "../../../api-ffm-service";
import { useGlobalState } from "../../../GlobalState";
import { fetchData, useFetchData } from "../../../hooks/useFethData";
import "./overview.css";
import ActivityDialog from "../../organisms/activityDialog";
import { Status } from "../../../models/status.interface";

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
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activityCategories, setActivityCategories] = useState<any[]>([]);

  const [seasonStages, setSeasonStages] = useState<any[]>([]);

  useFetchData(getActivities, setActivities, undefined, [
    selectedOrganization?.organizationId ?? 0,
  ]);

  useFetchData(getActivityStatuses, setActivityStatuses);
  useFetchData(getActivityCategories, setActivityCategories);
  useFetchData(getSeasonStages, setSeasonStages);

  useEffect(() => {
    if (activities.length > 0 && activityStatuses.length > 0) {
      const transformedData = activities.map((activity) => {
        return {
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
          activity: activity
          ,
        };
      });
      setTasks(transformedData);

    }
  }, [activities, activityStatuses]);

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
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleCardClick = (args) => {
    setSelectedTask(args.data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleFormSubmit = async (formData) => {
    formData.partyId = selectedOrganization?.partyId;
    try {
      const ty = await updateActivity(formData);

    } catch (error) {
      console.error("Error updating activity:", error);
    }

    fetchData(getActivities, setActivities, undefined, [selectedOrganization?.organizationId ?? 0]);
    closeModal();
  };

  return (
    <>
      <div className="kanban-control-section">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper">
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
          </div>
        </div>
      </div>

      {showModal && selectedTask && (
        <ActivityDialog
          isOpen={showModal}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          activityCategory={activityCategories}
          activityStatus={activityStatuses}
          seasonStages={seasonStages}
          notes={[]}
          fields={[]}
          formData={selectedTask.activity}
        />
      )}
    </>
  );
};

export default KanbanBoard;
