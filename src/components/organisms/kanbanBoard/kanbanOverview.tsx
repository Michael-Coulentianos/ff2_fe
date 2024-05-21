import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import { registerLicense } from "@syncfusion/ej2-base";
import { getActivities, getActivityStatuses, updateActivityStatus } from "../../../api-ffm-service";
import { useGlobalState } from '../../../GlobalState';
import { useFetchData } from '../../../hooks/useFethData';
import "./overview.css";
import ActivityDialog from "../../organisms/activityDialog";
import { Status } from "../../../models/status.interface";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVtpR2Nbe05yflRAal5QVAciSV9jS3pTc0VqWX1fdnZWQmhbUw==");

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

  useFetchData(getActivities, setActivities, undefined, [selectedOrganization?.organizationId ?? 0]);
  useFetchData(getActivityStatuses, setActivityStatuses);

  useEffect(() => {
    if (activities.length > 0) {
      const transformedData = activities.map(activity => ({
        Id: activity.activityId,
        Title: activity.name,
        Status: activity.status,
        Summary: activity.description,
        Type: "Task",
        Priority: "Normal",
        Tags: activity.category,
        Estimate: 1,
        Assignee: activity.assignedTo,
        RankId: activity.activityStatusId,
        Color: "#02897B",
        ClassName: "e-task, e-normal, e-assignee",
        activity: activity // Include the associated activity data
      }));
      setTasks(transformedData);
    }
  }, [activities]);

  const handleDragStop = async (args) => {
    const { data, event } = args;
    const movedTask = data[0];
    const dropKeyField = event.target.closest('.e-column')?.getAttribute('data-key');

    console.log('Task dragged to column:', dropKeyField);
    console.log('Moved Task:', data);
    console.log('args:', args);

    const newStatusObj = activityStatuses.find(status => status.value === dropKeyField);

    if (!newStatusObj) {
      console.error("Error: New Status not found");
      return;
    }

    const statusUpdate: Status = {
      statusId: newStatusObj.key,
      activityId: movedTask.Id,
      azureUserId: activeAccount?.azureUserId ?? ""
    };

    console.log('Status Update:', statusUpdate);

    try {
      await updateActivityStatus(statusUpdate);
      console.log(`Task ${movedTask.Id} moved to ${dropKeyField} (Status ID: ${statusUpdate.statusId})`);
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

  const handleFormSubmit = (data) => {
    console.log("Form Submitted:", data);
    // Update the task in the state or make an API call to save the changes
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
                footerCssField: "ClassName",
              }}
              dragStop={handleDragStop}
              cardClick={handleCardClick}
            >
              <ColumnsDirective>
                <ColumnDirective headerText="Not Done" keyField="Not Done" />
                <ColumnDirective headerText="To Do" keyField="To Do" />
                <ColumnDirective headerText="Done" keyField="Done" />
                <ColumnDirective headerText="Won't Do" keyField="Won't Do" />
              </ColumnsDirective>
              {/* <ColumnsDirective>
                {activityStatuses.map((status) => (
                  <ColumnDirective
                    key={status.key}
                    headerText={status.value}
                    keyField={status.value}
                  />
                ))}
              </ColumnsDirective> */}
            </KanbanComponent>
          </div>
        </div>
      </div>

      {showModal && selectedTask && (
        <ActivityDialog
          isOpen={showModal}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          activityCategory={activityStatuses}
          activityStatus={activityStatuses}
          seasonStages={[]} // Pass your season stages data here
          notes={[]} // Pass your notes data here
          formData={selectedTask.activity} // Pass the associated activity data
        />
      )}
    </>
  );
};

export default KanbanBoard;
