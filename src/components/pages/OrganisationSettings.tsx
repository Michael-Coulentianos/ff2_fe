import React, { useState, useEffect } from "react";
import { Grid, Paper, styled } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import OrganizationDialog from "../organisms/organisationDialog";
import DynamicTable from "../organisms/table";

interface Organization {
  name: string;
  contactInfo: string;
  address: string;
}
interface DataItem {
  id: string;
  [key: string]: any;
}

interface ColumnConfig {
  label: string;
  dataKey: keyof DataItem;
  renderCell: (item: DataItem) => React.ReactNode;
}

interface DynamicTableProps {
  data: DataItem[];
  columns: ColumnConfig[];
}
const OrganizationSettings: React.FC = () => {
  const [organization, setOrganization] = useState<Organization>({
    name: "",
    contactInfo: "",
    address: "",
  });

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await fetch("/api/Organizations");
        if (response.ok) {
          const data = await response.json();
          setOrganization(data);
        } else {
          console.error(
            "Error fetching organization data:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };

    fetchOrganizationData();
  }, []);

  const handleEditClick = () => {};

  const handleSaveClick = async () => {
    try {
      const response = await fetch("/api/UpdateOrganizationDetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organization),
      });

      if (response.ok) {
        console.log("Data saved successfully!");
      } else {
        console.error("Error saving data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleInputChange =
    (key: keyof Organization) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setOrganization({ ...organization, [key]: event.target.value });
    };

  const myData: DataItem[] = [
    {
      id: "1",
      key: "name1",
      item: "name",
    },
  ];
  const myColumns: ColumnConfig[] = [
    {
      label: "Company name",
      dataKey: "name",
      renderCell: (item) => <span>{item.name}</span>,
    },
    {
      label: "Registration  number",
      dataKey: "registrationNum",
      renderCell: (item) => <span>{item.name}</span>,
    },
    {
      label: "VAT number",
      dataKey: "VAT",
      renderCell: (item) => <span>{item.name}</span>,
    },
    {
      label: "Contact information",
      dataKey: "contactInformation",
      renderCell: (item) => <span>{item.name}</span>,
    },
    {
      label: "Address",
      dataKey: "address",
      renderCell: (item) => <span>{item.name}</span>,
    },
    {
      label: "Action Buttons",
      dataKey: "action",
      renderCell: () => (
        <ActionButtons
          onEdit={handleEditClick}
          onDelete={handleEditClick}
        ></ActionButtons>
      ),
    },
  ];

  return (
    <>
      <Grid xs={12} sx={{ mb: 1 }}>
        <OrganizationDialog></OrganizationDialog>
      </Grid>
      <Grid xs={12}>
        <DynamicTable data={myData} columns={myColumns}></DynamicTable>
      </Grid>
    </>
  );
};

export default OrganizationSettings;
