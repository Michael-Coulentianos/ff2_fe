import ReactDOM from "react-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import { extend } from "@syncfusion/ej2-base";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import dataSource from "./datasource.json";
import "./overview.css";
import { registerLicense } from "@syncfusion/ej2-base";
import { Button } from "@mui/material";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVtpR2Nbe05yflRAal5QVAciSV9jS3pTc0VqWX1fdnZWQmhbUw=="
);

const KanbanBoard = () => {
  let data: Object[] = extend(
    [],
    dataSource.kanbanData,
    null as any,
    true
  ) as Object[];
  const [tasks, setTasks] = useState(data);

  // const addTask = () => {
  //   const newTask = {
  //     Id: "Task" + (tasks.length + 1),
  //     Title: "Task - " + (tasks.length + 1),
  //     Status: "Open",
  //     Summary:
  //       "hellllooooooooo Analyze the new requirements gathered from the customer.",
  //     Type: "Story",
  //     Priority: "Low",
  //     Tags: "Analyze,Customer",
  //     Estimate: 3.5,
  //     Assignee: "Nancy Davloio",
  //     RankId: 1,
  //     Color: "#02897B",
  //     ClassName: "e-story, e-low, e-nancy-davloio",
  //   };
  //   console.log("clicked add heyy");
  //   setTasks([...tasks, newTask]);
  // };
  return (
    <>
      {/* <Button onClick={addTask}>Add Task</Button> */}
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
                <ColumnDirective headerText="Not Done" keyField="Open" />
                <ColumnDirective headerText="To Do" keyField="InProgress" />
                <ColumnDirective headerText="Done" keyField="Testing" />
                <ColumnDirective headerText="Won't Do" keyField="Close" />
              </ColumnsDirective>
            </KanbanComponent>
          </div>
        </div>
      </div>
    </>
  );
};
export default KanbanBoard;
