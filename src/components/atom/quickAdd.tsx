import { useState, useEffect } from "react";
import { Grid, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import ActivityDialog from "../organisms/activityDialog";
import { useFetchData } from '../../hooks/useFethData';
import NotesDialog from "../organisms/notesDialog";
import OrganizationDialog from "../organisms/organisationDialog";
import {
  createNote,
  getNoteTypes,
  createOrganization,
  getLegalEntities,
  getActivityCategories,
  getSeasonStages,
  getActivityStatuses,
  createActivity
} from "../../api-ffm-service";
import theme from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import { LegalEntity } from "../../models/legalEntity.interface";
import { useGlobalState } from '../../GlobalState';
import { getFields } from "../../api-gs-service";
import { addPropertyIfNotEmpty } from "../../utils/Utilities";
import { CreateOrganization } from "../../models/createOrganization.interface";


const options = ["New Organisation", "New Note", "New Activity"];

export default function QuickAdd() {
  const [openOrg, setOpenOrg] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [openAct, setOpenAct] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<any | null>(null);
  const [noteTypes, setNoteTypes] = useState<any[]>([]);
  const { selectedOrganization, activeAccount } = useGlobalState();

  const [legalEntities, setLegalEntities] = useState<LegalEntity[]>([]);
  const [activityCategories, setActivityCategories] = useState<any[]>([]);
  const [activityStatuses, setActivityStatuses] = useState<any[]>([]);
  const [seasonStages, setSeasonStages] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fields, setFields] = useState<any[]>([]);

  useFetchData(getActivityCategories, setActivityCategories);
  useFetchData(getActivityStatuses, setActivityStatuses);
  useFetchData(getSeasonStages, setSeasonStages);
  useFetchData(getLegalEntities, setLegalEntities);
  useFetchData(getNoteTypes, setNoteTypes);
  useFetchData(getFields, setFields, undefined, [selectedOrganization?.partyIdentifier ?? 0]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (index: number) => {
    switch (index) {
      case 0:
        setOpenOrg(true);
        break;
      case 1:
        setOpenNote(true);
        break;
      case 2:
        setOpenAct(true);
        break;
      default:
        break;
    }
  };

  const handleCloseForm = () => {
    setOpenOrg(false);
    setOpenNote(false);
    setOpenAct(false);
  };

  const handleSubmitNote = async (formData: any) => {
    formData.azureUserId = activeAccount.localAccountId;
    formData.partyId = selectedOrganization?.partyId;
    formData.noteTypeId = noteTypes.find(
      (nt) => nt.name === formData.noteType
    )?.noteTypeId;

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const milliseconds = String(currentDate.getMilliseconds()).padStart(7, "0");

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;

    formData.createdDate = formattedDate;

    const properties = {};
    addPropertyIfNotEmpty(properties, "severityType", formData.severityType);
    addPropertyIfNotEmpty(
      properties,
      "severitySubType",
      formData.severitySubType
    );
    addPropertyIfNotEmpty(properties, "cropType", formData.cropType);
    addPropertyIfNotEmpty(
      properties,
      "yieldEstimateHeads",
      formData.yieldEstimateHeads
    );
    addPropertyIfNotEmpty(
      properties,
      "yieldEstimateRowWidth",
      formData.yieldEstimateRowWidth
    );
    addPropertyIfNotEmpty(
      properties,
      "yieldEstimateGrams",
      formData.yieldEstimateGrams
    );
    addPropertyIfNotEmpty(
      properties,
      "cropAnalysisType",
      formData.cropAnalysisType
    );
    addPropertyIfNotEmpty(properties, "cropSubType", formData.cropSubType);
    addPropertyIfNotEmpty(properties, "severityScale", formData.severityScale);

    try {
      formData.property = JSON.stringify(properties);
      await createNote(formData);
    } catch (error) {
      console.error("Error creating note:", error);
    }

    handleCloseForm();
  };

  const handleSubmitOrg = async (formData: any) => {
    formData.legalEntityTypeId = legalEntities.find(
      (nt) => nt.name === formData.legalEntityTypeName
    )?.legalEntityTypeId;
    try {
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

      await createOrganization(org);
    } catch (error) {
      console.error("Error submitting organization:", error);
    }

    handleCloseForm();
  };

  const handleSubmitAct = async (formData: any) => { 
    formData.partyId = selectedOrganization?.partyId;
    try {
      await createActivity(formData);
    } catch (error) {
      console.error("Error creating activity:", error);
    }
    
    handleCloseForm();
  };

  return (
    <>
      <Grid>
        <NotesDialog
          isOpen={openNote}
          onClose={handleCloseForm}
          onSubmit={handleSubmitNote}
          formData={undefined}
          noteTypes={noteTypes}
        />
        <OrganizationDialog
          isOpen={openOrg}
          onClose={handleCloseForm}
          onSubmit={handleSubmitOrg}
          formData={undefined}
          legalEntities={legalEntities}
        />
        <ActivityDialog
          isOpen={openAct}
          onClose={handleCloseForm}
          onSubmit={handleSubmitAct}
          formData={undefined}
          activityCategory={activityCategories}
          activityStatus={activityStatuses}
          seasonStages={seasonStages}
          notes={undefined}
          fields={fields}
        />
        <Tooltip title="Quick Add">
          <IconButton
            aria-label="edit"
            sx={{
              color: "white",
              backgroundColor: theme.palette.secondary.main,
              width: "30px",
              height: "30px",
              "&:hover": {
                backgroundColor: theme.palette.secondary.light,
              },
            }}
            onClick={handleMenu}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options?.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={() => handleMenuItemClick(index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </>
  );
}
