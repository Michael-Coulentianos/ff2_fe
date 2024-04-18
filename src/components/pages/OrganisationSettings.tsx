import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import OrganizationDialog from "../organisms/organisationDialog";
import DynamicTable from "../organisms/table";
import { getOrganizations } from "../../apiService";

interface Dataparty {
  id: string;
  [key: string]: any;
}

interface ColumnConfig {
  label: string;
  dataKey: keyof Dataparty;
  renderCell: (party: Dataparty) => React.ReactNode;
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

  const handleDelete = (partyId: number) => {
    console.log(`Deleting party with ID: ${partyId}`);
  };

  const handleEditClick = (partyId: number) => {
    console.log(`Edit party with ID: ${partyId}`);
  };

  // const handleSaveClick = async () => {
  //   try {
  //     const response = await fetch("/api/UpdateOrganizationDetails", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(organizations),
  //     });

  //     if (response.ok) {
  //       console.log("Data saved successfully!");
  //     } else {
  //       console.error("Error saving data:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error sending data:", error);
  //   }
  // };
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
      renderCell: (party) => (
        <ActionButtons
          onEdit={() => handleEditClick(party.partyId)}
          onDelete={() => handleDelete(party.partyId)}
        ></ActionButtons>
      ),
    },
  ];

  return (
    <>
      <Grid xs={12} sx={{ mb: 1 }}>
        <OrganizationDialog isEdit={false} onEdit={handleEditClick}></OrganizationDialog>
      </Grid>
      <Grid xs={12}>
        <DynamicTable data={organizations} columns={myColumns}></DynamicTable>
      </Grid>
    </>
  );
};

export default OrganizationSettings;
