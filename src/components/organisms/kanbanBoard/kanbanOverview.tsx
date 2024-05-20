import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import { extend } from "@syncfusion/ej2-base";
import { registerLicense } from "@syncfusion/ej2-base";
import { Button } from "@mui/material";
import { getActivities, getActivityStatuses } from "../../../api-ffm-service";
import { useGlobalState } from '../../../GlobalState';
import { useFetchData } from '../../../hooks/useFethData';
import "./overview.css";

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
}


const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [activityStatuses, setActivityStatuses] = useState<any[]>([]);
  const { selectedOrganization } = useGlobalState();

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
        RankId: 1,
        Color: "#02897B",
        ClassName: "e-task, e-normal, e-assignee",
      }));
      setTasks(transformedData);
    }
  }, [activities]);

  return (
    <>
      <KanbanComponent dataSource={tasks}></KanbanComponent>
      <div className="kanban-control-section">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper">
            <KanbanComponent
              id="kanban"
              keyField="Status"
              dataSource={tasks}
              cardSettings={{
                contentField: "Summary",
                headerField: "Id",
                tagsField: "Tags",
                grabberField: "Color",
                footerCssField: "ClassName",
              }}
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
    </>
  );
};

export default KanbanBoard;
