import React, { useState, useEffect } from "react";
import { Grid, Button, Divider, Paper, Typography } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import OrganizationDialog from "../organisms/organisationDialog";
import DynamicTable from "../organisms/table";
import {
  getOrganizations,
  deleteOrganization,
  createOrganization,
  updateOrganization,
  getLegalEntities,
  getOrganizationById,
} from "../../api-ffm-service";
import { LegalEntity } from "../../models/legalEntity.interface";
import GenericConfirmDialog from "../organisms/genericConfirmDialog";
import { CreateOrganization } from "../../models/createOrganization.interface";
import { Contacts } from "../../models/contacts.interface";
import Loading from "./loading";
import { useGlobalState } from "../../GlobalState";
import { fetchData, useFetchData } from "../../hooks/useFethData";

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
  const [organizationById, setOrganizationById] = useState<any[]>([]);
  const [legalEntities, setLegalEntities] = useState<LegalEntity[]>([]);
  const { selectedOrganization, setSelectedOrganization } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<any | null>(null);

  useFetchData(getOrganizations, setOrganizations, setIsLoading);
  useFetchData(getLegalEntities, setLegalEntities, setIsLoading);

  // Organization Form Handlers
  // --------------------------
  // handleOpenForm: Resets and opens the form for new entries.
  // handleCloseForm: Resets and closes the form, cancelling any ongoing edits.
  // handleEdit: Initializes form with selected organization's data for editing.
  // handleDelete: Prepares and prompts confirmation dialog for deleting an organization.
  // handleSubmit: Submits the form data for creating or updating organizations, handles UI state transitions and updates the organization list.
  // handleConfirm: Executes deletion of an organization after confirmation, updates the organization list, and resets UI state.

  const handleOpenForm = () => {
    setSelectedOrg(null);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedOrg(null);
    setFormOpen(false);
    setIsLoading(false);
    setConfirmOpen(false);
  };

  const handleEdit = (org) => {
    setSelectedOrg(org);
    setFormOpen(true);
  };

  const handleDelete = (org) => {
    setSelectedOrg(org);
    setConfirmOpen(true);
  };

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    formData.legalEntityTypeId = legalEntities.find(
      (nt) => nt.name === formData.legalEntityTypeName
    )?.legalEntityTypeId;
    try {
      if (selectedOrg) {
        formData.contactDetail = formData.contactPerson;
        await updateOrganization(formData);
      } else {
        formData.contactPerson[0].contacts[0].type = "Email";
        formData.contactPerson[0].contacts[1].type = "Mobile";
        const org: CreateOrganization = {
          name: formData.name,
          physicalAddress: formData.physicalAddress[0],
          postalAddress: formData.sameAddress
            ? formData.physicalAddress[0]
            : formData.postalAddress[0] || formData.physicalAddress[0],
          contactDetail: formData.contactPerson,
          contactPerson: formData.contactPerson,
          registrationNumber: formData.registrationNumber,
          vatNumber: formData.vatNumber,
          legalEntityTypeId: formData.legalEntityTypeId,
          legalEntityTypeName: formData.legalEntityTypeName,
          id: "",
          partyId: 0,
          organizationId: 0,
          partyIdentifier: "",
          azureUserId: "",
          createdDate: "",
          sameAddress: formData.sameAddress,
        };

        const response = (await createOrganization(org)) as unknown as {
          organizationId: number;
        };
        // fetchData(getOrganizations, setOrganizations);
        // const newOrg = organizations.find((org) => org.organizationId === response.organizationId);

        // // Set the selected organization if it was found
        // if (newOrg) {
        //   setSelectedOrganization(newOrg);
        // } else {
        //   console.error('Newly created organization not found in the organization list');
        // }
      }
    } catch (error) {
      console.error("Error submitting organization:", error);
    }
    fetchData(getOrganizations, setOrganizations, setIsLoading);
    handleCloseForm();
  };

  const handleConfirm = async () => {
    if (selectedOrg) {
      setIsLoading(true);
      try {
        await deleteOrganization(selectedOrg.partyId);
        fetchData(getOrganizations, setOrganizations, setIsLoading);
        if (selectedOrg === selectedOrganization && organizations.length > 0) {
          setSelectedOrganization(organizations[0]);
        }
      } catch (error) {
        console.error("Failed to delete organization:", error);
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
      label: "Registration number",
      dataKey: "registrationNumber",
      renderCell: (item) => <>{item.registrationNumber}</>,
    },
    {
      label: "VAT number",
      dataKey: "VAT",
      renderCell: (item) => <>{item.vatNumber}</>,
    },
    {
      label: "Contact Information",
      dataKey: "contactPerson",
      renderCell: (item) => (
        <>
          {item.contactPerson[0].contacts.map((contact: Contacts) => (
            <p key={contact.contactId}>
              {item.contactPerson.fullName}
              <p>
                {contact.type}: {contact.details}
              </p>
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
        ></ActionButtons>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Grid container spacing={2} padding={"10px"}>
            <Grid item xs={12}>
              <Typography variant="h5">Organisation settings</Typography>
              <Divider sx={{ marginTop: 1 }} />
            </Grid>
            <Grid item xs={12}>
              {organizations.length === 0 && (
                <Paper
                  sx={{
                    padding: "20px",
                    margin: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ m: 2 }}>
                    You do not have any organisations. Please click the button
                    below to add an organization.
                  </Typography>
                  <Button
                    sx={{ m: 2 }}
                    variant="contained"
                    onClick={handleOpenForm}
                    color="primary"
                  >
                    Add Organization
                  </Button>
                  <OrganizationDialog
                    isOpen={formOpen}
                    onClose={() => handleCloseForm()}
                    onSubmit={handleSubmit}
                    formData={selectedOrg}
                    legalEntities={legalEntities}
                  />
                </Paper>
              )}
            </Grid>
            {organizations.length > 0 && (
              <>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenForm()}
                    color="primary"
                  >
                    Add Organization
                  </Button>
                  <OrganizationDialog
                    isOpen={formOpen}
                    onClose={() => handleCloseForm()}
                    onSubmit={handleSubmit}
                    formData={selectedOrg}
                    legalEntities={legalEntities}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DynamicTable
                    data={organizations}
                    columns={myColumns}
                    rowsPerPage={5}
                  />
                  <GenericConfirmDialog
                    open={confirmOpen}
                    onCancel={() => setConfirmOpen(false)}
                    onConfirm={handleConfirm}
                    title="Confirm Deletion"
                    content="Are you sure you want to delete this organization?"
                  />
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default OrganizationSettings;
