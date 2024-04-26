import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import OrganizationDialog from "../organisms/organisationDialog";
import DynamicTable from "../organisms/table";
import { getOrganizations, deleteOrganization, createOrganization, updateOrganization, getOrganizationById} from "../../apiService";
import Loading from "./loading";
import GenericConfirmDialog from "../organisms/genericConfirmDialog";

interface DataItem {
  id: string;
  [key: string]: any;
}

interface ColumnConfig {
  label: string;
  dataKey: keyof DataItem;
  renderCell: (item: DataItem) => React.ReactNode;
}

const OrganizationSettings: React.FC = () => {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentOrgId, setCurrentOrgId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);


  useEffect(() => {
    setIsLoading(true);
    fetchOrganizations();
    setIsLoading(false);
  }, []);
 
  if (isLoading) {
    return <Loading></Loading>;
  }

  /**
   * Handlers for editing, deleting, and submitting an organization.
   * - handleEdit: Sets the selected ID to the provided ID and logs the edit action for an organization.
   * - handleDelete: Sets the selected ID to the provided ID and logs the deletion of an organization.
   * - handleSubmit: Sets the selected ID to the provided ID and logs the submission of an organization.
   */

  const handleDelete = (org) => {
    setConfirmOpen(true);
    setCurrentOrgId(org.partyId);
  };

  const handleEdit = (org) => {
    setCurrentOrgId(org.partyId);
    setSelectedOrg(org);
    setFormOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (selectedOrg) {
      try {
        // const updatedOrg = await updateOrganization(formData);
        // setOrganizations(organizations.map(org => org.organizationId === updatedOrg ? updatedOrg : org));
      } catch (error) {
        console.error('Error updating organization:', error);
      }
    } else {
      try {
        const newOrganization = await createOrganization(formData);
        setOrganizations([...organizations, newOrganization]);
      } catch (error) {
        console.error('Error creating organization:', error);
      }
    }
    setConfirmOpen(false);
    setCurrentOrgId(null);
    handleCloseForm(); 
  };

  const handleOpenForm = () => {
    setCurrentOrgId(null); 
    setSelectedOrg(null);
    setFormOpen(true);
  };
  
  const handleCloseForm = () => {
    setFormOpen(false);
    setCurrentOrgId(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setCurrentOrgId(null);
  };

  const handleConfirm = async () => {
    if (currentOrgId !== null) {
      try {
        await deleteOrganization(currentOrgId);
        setOrganizations((prevOrgs) =>
          prevOrgs.filter((organization) => organization.partyID !== currentOrgId)
        );
        console.log("Organization with ID", currentOrgId, "was deleted.");
      } catch (error) {
        console.error("Failed to delete organization:", error);
      }
    }
    setConfirmOpen(false);
    setCurrentOrgId(null);
  };
  
/**
 * API functions to fetch organization data.
 * - fetchOrgById: Asynchronously retrieves an organization by its ID. Logs the ID and the fetched data,
 *                 and handles errors by logging them to the console.
 * - fetchOrganizations: Asynchronously fetches all organizations, updates the state with the fetched data,
 *                       and handles errors by logging detailed error messages to the console.
 */
  const fetchOrgById = async (id: number) => {
    console.log(id);
    try {
      const res = await getOrganizationById(id);
      console.log(res);
  const handleEdit = async (id) => {
    try {
      const org = await getOrganizationById(id);
      // setSelectedOrganization(org[0]);
      setFormOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const data = await getOrganizations();
      setOrganizations(data);
    } catch (error: any) {
      console.error("Error fetching organizations:", error.message);
    }
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
      renderCell: (item) => <>{item.name}</>,
    },
    {
      label: "Registration  number",
      dataKey: "registrationNum",
      renderCell: (item) => <>{item.registrationNumber}</>,
    },
    {
      label: "VAT number",
      dataKey: "VAT",
      renderCell: (item) => <>{item.vatNumber}</>,
    },
    {
      label: "Contact information",
      dataKey: "contactInformation",
      renderCell: (item) => (
        <>
          {item.contactPerson.map((person) => (
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
      renderCell: (item) => (
        <>
          {item.physicalAddress.map((address) => (
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
      renderCell: (item) => (
        <ActionButtons
          onEdit={() => handleEdit(item)}
          onDelete={() => handleDelete(item)}
          onSubmit={() => handleSubmit}
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
        <Button
          variant="contained"
          onClick={handleOpenForm}
          color="primary">
            Add Organization
        </Button>
        <OrganizationDialog
          isOpen={formOpen}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          formData={selectedOrg}
        ></OrganizationDialog>
      </Grid>
      <Grid xs={12}>
        <DynamicTable data={organizations} columns={myColumns}></DynamicTable>
        <GenericConfirmDialog
            open={confirmOpen}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            title="Confirm Deletion"
            content="Are you sure you want to delete this organization?"
          />
      </Grid>
    </>
  );
};

export default OrganizationSettings;
