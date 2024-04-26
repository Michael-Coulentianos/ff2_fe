import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import OrganizationDialog from "../organisms/organisationDialog";
import DynamicTable from "../organisms/table";
import { getOrganizations, deleteOrganization, createOrganization, updateOrganization, getOrganizationById } from "../../apiService";
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
  const [selectedOrg, setSelectedOrg] = useState<DataItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getOrganizations();
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleEdit = (org) => {
    setCurrentOrgId(org.partyId);
    setSelectedOrg(org);
    setFormOpen(true);
  };

  const handleDelete = (org) => {
    setConfirmOpen(true);
    setCurrentOrgId(org.partyId);
  };

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      if (selectedOrg) {
        //await updateOrganization(formData);
      } else {
        await createOrganization(formData);
      }
    } catch (error) {
      console.error('Error submitting organization:', error);
    }
    setIsLoading(false);
    setFormOpen(false);
    setConfirmOpen(false);
    setCurrentOrgId(null);
    setSelectedOrg(null);
  };

  const handleConfirm = async () => {
    if (currentOrgId) {
      setIsLoading(true);
      try {
        await deleteOrganization(currentOrgId);
        setOrganizations(organizations.filter(org => org.id !== currentOrgId));
      } catch (error) {
        console.error("Failed to delete organization:", error);
      }
      setConfirmOpen(false);
      setCurrentOrgId(null);
      setIsLoading(false);
    }
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
        ></ActionButtons>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Loading />}
      <Grid xs={12} sx={{ mb: 1 }}>
        <Button variant="contained" onClick={() => setFormOpen(true)} color="primary">
          Add Organization
        </Button>
        <OrganizationDialog isOpen={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleSubmit} formData={selectedOrg} />
      </Grid>
      <Grid xs={12}>
        <DynamicTable data={organizations} columns={myColumns} />
        <GenericConfirmDialog open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={handleConfirm} title="Confirm Deletion" content="Are you sure you want to delete this organization?" />
      </Grid>
    </>
  );
};

export default OrganizationSettings;
