import React, { useState, useEffect } from "react";
import { Grid, Paper, styled } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import OrganizationDialog from "../organisms/organisationDialog";
import DynamicTable from "../organisms/table";
import { getOrganizations } from "../../apiService";

interface Organization {
  name: string;
  contactInfo: string;
  address: string;
}
interface Dataparty {
  id: string;
  [key: string]: any;
}

interface ColumnConfig {
  label: string;
  dataKey: keyof Dataparty;
  renderCell: (party: Dataparty) => React.ReactNode;
}

interface DynamicTableProps {
  data: Dataparty[];
  columns: ColumnConfig[];
}
const OrganizationSettings: React.FC = () => {
  const [organizations, setOrganizations] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        setOrganizations(data.details);
      } catch (error: any) {
        console.error("Error fetching organizations:", error.message);
      }
    };

    fetchOrganizations();
  }, []);

  const handleEditClick = () => {};

  const handleSaveClick = async () => {
    try {
      const response = await fetch("/api/UpdateOrganizationDetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organizations),
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

  const myData: Dataparty[] = [
    {
      id: "1",
      key: "name1",
      party: "name",
    },
  ];
  const myColumns: ColumnConfig[] = [
    {
      label: "Company name",
      dataKey: "name",
      renderCell: (party) => <>{party.name}</>,
    },
    {
      label: "Registration  number",
      dataKey: "registrationNum",
      renderCell: (party) => <>{party.registrationNumber}</>,
    },
    {
      label: "VAT number",
      dataKey: "VAT",
      renderCell: (party) => <>{party.vatNumber}</>,
    },
    {
      label: "Contact information",
      dataKey: "contactInformation",
      renderCell: (party) => (
        <>
          {party.contactPerson.map((person) => (
            <p key={person.contactPersonId}>
              {person.fullName}
              <p>Contact Number: {person.contactNumber}</p>
              <p>Email Address: {person.emailAddress}</p>
            </p>
          ))}
        </>
      ),
    },
    {
      label: "Address",
      dataKey: "address",
      renderCell: (party) => (
        <>
          {party.physicalAddress.map((address) => (
            <p key={address.addressId}>
              {address.addressLine1}, {address.addressLine2}, {address.city},{" "}
              {address.code}
            </p>
          ))}
        </>
      ),
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
        <DynamicTable data={organizations} columns={myColumns}></DynamicTable>
      </Grid>
    </>
  );
};

export default OrganizationSettings;
