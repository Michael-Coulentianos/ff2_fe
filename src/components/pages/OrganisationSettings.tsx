import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import OrganizationDialog from "../organisms/organisationDialog";
import DynamicTable from "../organisms/table";
import {
  createOrganization2,
  getOrganizationById,
  getOrganizations,
  updateOrganisation,
} from "../../apiService";
import Loading from "./loading";

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
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        setOrganizations(data);
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

  const handleEdit = async (id) => {
    try {
      const org = await getOrganizationById(id);
      // setSelectedOrganization(org[0]);
      setFormOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteClick = (noteId: number) => {
    // setCurrentNoteId(noteId);
    // setConfirmOpen(true);
  };

  const handleOpenForm = () => {
    setFormOpen(true);
    // setSelectedOrganization(null);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedOrganization(null);
  };
  const handleFormSubmit = async (formData) => {
    console.log(formData, "formData");

    if (selectedOrganization) {
      console.log(selectedOrganization, "selectedOrganization");

      try {
        const updatedOrganization = await updateOrganisation(
          formData?.organizationId,
          formData
        );
        setOrganizations(
          organizations.map((organization) =>
            organization.organizationId === updatedOrganization
              ? updatedOrganization
              : organization
          )
        );
      } catch (error) {
        console.error("Error updating organization:", error);
      }
    } else {
      try {
        console.log(formData, "new organization?");
        const newOrganization = await createOrganization2(formData);
        setOrganizations([...organizations, newOrganization]);
      } catch (error) {
        console.error("Error creating organization:", error);
      }
    }
    handleCloseForm();
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
          onEdit={() => handleEdit(org.organizationId)}
          onDelete={() => handleDeleteClick(org.organizationId)}
        ></ActionButtons>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Loading />}
      <Grid xs={12} sx={{ mb: 1 }}>
        <Button variant="contained" onClick={handleOpenForm} color="primary">
          Add Organization
        </Button>
        <OrganizationDialog
          isOpen={formOpen}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          formData={selectedOrganization}
        ></OrganizationDialog>
      </Grid>
      <Grid xs={12}>
        <DynamicTable data={organizations} columns={myColumns}></DynamicTable>
      </Grid>
    </>
  );
};

export default OrganizationSettings;
