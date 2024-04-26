import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import OrganizationDialog from "../organisms/organisationDialog";
import DynamicTable from "../organisms/table";
import { getOrganizations, deleteOrganization, createOrganization } from "../../apiService";
import Loading from "./loading";
import GenericConfirmDialog from "../organisms/genericConfirmDialog";
import { Organization } from "../../models/organization.interface";
import { Address } from "../../models/address.interface";
import { ContactPerson } from "../../models/contactPerson.interface";

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
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentOrgId, setCurrentOrgId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);


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
  
  const handleOpenForm = () => {
    setSelectedOrg(null);
    setCurrentOrgId(null); 
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedOrg(null);
    setCurrentOrgId(null);
  };

  const handleEdit = (org) => {
    setCurrentOrgId(org.partyId);
    setSelectedOrg(org);
    setFormOpen(true);
  };

  const handleDelete = (org) => {
    setCurrentOrgId(org.partyId);
    setSelectedOrg(org);
    setFormOpen(true);
  };

  const handleSubmit = async (formData: Organization) => {
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
    setConfirmOpen(false);
    handleCloseForm();
  };

  const handleConfirm = async () => {
    if (currentOrgId) {
      setIsLoading(true);
      try {
        await deleteOrganization(currentOrgId);
        setOrganizations(organizations.filter(org => org.partyId !== currentOrgId));
      } catch (error) {
        console.error("Failed to delete organization:", error);
      }
      setConfirmOpen(false);
      handleCloseForm();
    }
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
    // {
    //   label: "Contact information",
    //   dataKey: "contactPerson",
    //   renderCell: (item) => (
    //     <>
    //       {item.contactPerson.map((person: ContactPerson) => (
    //         <p key={person.contactPersonId}>
    //           {person.fullName}
    //           <p>Contact Number: {person.contactNumber}</p>
    //           <p>Email Address: {person.emailAddress}</p>
    //         </p>
    //       ))}
    //     </>
    //   ),
    // },
    // {
    //   label: "Address",
    //   dataKey: "physicalAddress",
    //   renderCell: (item) => (
    //     <>
    //       {item.physicalAddress.map((address: Address) => (
    //         <p key={address.addressId}>
    //           {address.addressLine1}, {address.addressLine2}, {address.city},{" "}
    //           {address.code}
    //         </p>
    //       ))}
    //     </>
    //   ),
    // },
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
        <Button variant="contained" onClick={() => handleOpenForm()} color="primary">
          Add Organization
        </Button>
        <OrganizationDialog isOpen={formOpen} onClose={() => handleCloseForm()} onSubmit={handleSubmit} formData={selectedOrg} />
      </Grid>
      <Grid xs={12}>
        <DynamicTable data={organizations} columns={myColumns} rowsPerPage={5} />
        <GenericConfirmDialog open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={handleConfirm} title="Confirm Deletion" content="Are you sure you want to delete this organization?" />
      </Grid>
    </>
  );
};

export default OrganizationSettings;
