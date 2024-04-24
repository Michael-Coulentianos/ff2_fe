import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import OrganizationDialog from "../organisms/organisationDialog";
import DynamicTable from "../organisms/table";
import { getOrganizations } from "../../apiService";
import Loading from "./loading";
import { Organization } from "../../models/organization.interface";

interface Dataorg {
  id: string;
  [key: string]: any;
}

interface ColumnConfig {
  label: string;
  dataKey: keyof Dataorg;
  renderCell: (org: Dataorg) => React.ReactNode;
}

const OrganizationSettings: React.FC = () => {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        setOrganizations(data.details);
      } catch (error: any) {
        console.error("Error fetching organizations:", error.message);
      }
    };

    fetchOrganizations();
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = (id: string) => {
    console.log(`Deleting org with ID: ${id}`);
    setSelectedId(id);
  };
  const handleSubmit = (id: string) => {
    console.log(`Submitted org with ID: ${id}`);
    setSelectedId(id);
  };

  const handleEdit = (id: string) => {
    console.log(`Edit org with ID: ${id}`);
    setSelectedId(id);
  };

  const handleCreateOrganization = async (organization: Organization) => {
    try {
      const response = await fetch("/api/CreateOrganization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organization),
      });

      if (response.ok) {
        console.log(
          `Submitted org with Name: ${organization.contactPerson[0].fullName}`
        );
        console.log("Organization created successfully!");
      } else {
        console.error("Error creating organization:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const myColumns: ColumnConfig[] = [
    {
      label: "Company name",
      dataKey: "name",
      renderCell: (org) => <>{org.name}</>,
    },
    {
      label: "Registration  number",
      dataKey: "registrationNum",
      renderCell: (org) => <>{org.registrationNumber}</>,
    },
    {
      label: "VAT number",
      dataKey: "VAT",
      renderCell: (org) => <>{org.vatNumber}</>,
    },
    {
      label: "Contact information",
      dataKey: "contactInformation",
      renderCell: (org) => (
        <>
          {org.contactPerson.map((person) => (
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
      renderCell: (org) => (
        <>
          {org.physicalAddress.map((address) => (
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
      renderCell: (org) => (
        <ActionButtons
          onEdit={() => handleEdit(org.id)}
          onDelete={() => handleDelete(org.id)}
          onSubmit={() => handleCreateOrganization}
        ></ActionButtons>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Loading />}
      <Grid xs={12} sx={{ mb: 1 }}>
        <OrganizationDialog
          isEdit={false}
          onSubmit={handleCreateOrganization}
          onEdit={() => handleEdit}
        ></OrganizationDialog>
      </Grid>
      <Grid xs={12}>
        <DynamicTable data={organizations} columns={myColumns}></DynamicTable>
      </Grid>
    </>
  );
};

export default OrganizationSettings;
