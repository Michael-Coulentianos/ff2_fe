import { useState, useEffect } from "react";
import { Grid, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import ActivityDialog from "../organisms/activityDialog";
import { useFetchData, fetchData } from '../../hooks/useFethData';
import NotesDialog from "../organisms/notesDialog";
import OrganizationDialog from "../organisms/organisationDialog";
import {
  getNotes,
  createNote,
  getOrganizations,
  getNoteTypes,
  createOrganization,
  updateOrganization,
  getLegalEntities,
  getActivityCategories,
  getSeasonStages,
  getActivityStatuses,
  createActivity,
  getActivities,
} from "../../api-ffm-service";
import theme from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import { LegalEntity } from "../../models/legalEntity.interface";
import { useGlobalState } from '../../GlobalState';
import { CreateOrganization } from "../../models/createOrganization.interface";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
}

const options = ["New Organisation", "New Note", "New Activity"];

export default function QuickAdd() {
  const [openOrg, setOpenOrg] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [openAct, setOpenAct] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<any | null>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [noteTypes, setNoteTypes] = useState<any[]>([]);
  const [selectedNote, setSelectedNote] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedOrganization } = useGlobalState();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
  });
  const [legalEntities, setLegalEntities] = useState<LegalEntity[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<any | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [activityCategories, setActivityCategories] = useState<any[]>([]);
  const [activityStatuses, setActivityStatuses] = useState<any[]>([]);
  const [seasonStages, setSeasonStages] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
        setSelectedOrg(null);
        break;
      case 1:
        setOpenNote(true);
        setSelectedNote(null);
        break;
      case 2:
        setOpenAct(true);
        setSelectedActivity(null);
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

  //NOTE
  useFetchData(getNotes, setNotes, setIsLoading);
  useFetchData(getNoteTypes, setNoteTypes, setIsLoading);
  useFetchData(getOrganizations, setOrganizations, setIsLoading);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      console.log(error);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setError("Unable to retrieve your location");
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, [location]);

  const addPropertyIfNotEmpty = (obj, key, value) => {
    if (value !== null && value !== "" && value !== undefined) {
      obj[key] = value;
    }
  };

  const handleSubmitNote = async (formData: any) => {
    formData.partyId = organizations.find(
      (org) => org.name === formData.party
    )?.partyId;
    formData.noteTypeId = noteTypes.find(
      (nt) => nt.name === formData.noteType
    )?.noteTypeId;
    console.log("Form data:", formData);

    if (formData.attachment && formData.attachment instanceof File) {
      console.log("File name:", formData.attachment.name);
      console.log("File type:", formData.attachment.type);
      console.log("File size:", formData.attachment.size, "bytes");
    } else {
      console.log("No file attached or file data is not a File object.");
    }

    const currentDate = new Date();

    // Extract individual components of the date
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const milliseconds = String(currentDate.getMilliseconds()).padStart(7, "0");

    // Construct the formatted date string
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
    if (selectedNote) {
      try {
        formData.property = JSON.stringify(properties);
        const response = await createNote(formData);
        fetchData(getNotes, setNotes, setIsLoading, [selectedOrganization?.id ?? 0]);
      } catch (error) {
        console.error("Error creating note:", error);
      }
    }
    setIsLoading(false);
    handleCloseForm();
  };

  //NOTE END

  //ORG
  useFetchData(getOrganizations, setOrganizations, setIsLoading);
  useFetchData(getLegalEntities, setLegalEntities, setIsLoading);

  const handleSubmitOrg = async (formData: any) => {
    setIsLoading(true);
    formData.legalEntityTypeId = legalEntities.find(
      (nt) => nt.name === formData.legalEntityTypeName
    )?.legalEntityTypeId;
    try {
      if (selectedOrg) {
        formData.contactDetail = formData.contactPerson;
        await updateOrganization(formData);
        setOrganizations(
          organizations.map((org) =>
            org.partyId === formData.partyId ? formData : org
          )
        );
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

        await createOrganization(org);
        setOrganizations([...organizations, formData]);
      }
    } catch (error) {
      console.error("Error submitting organization:", error);
    }

    handleCloseForm();
  };
  //ORG END

  useFetchData(getActivities, setActivities, setIsLoading);
  useFetchData(getNotes, setNotes, setIsLoading);
  useFetchData(getActivityCategories, setActivityCategories, setIsLoading);
  useFetchData(getActivityStatuses, setActivityStatuses, setIsLoading);
  useFetchData(getSeasonStages, setSeasonStages, setIsLoading);

  const handleSubmitAct = async (formData: any) => {
    formData.noteId = notes.find(
      (note) => note.title === formData.title
    )?.noteId;
    formData.activityTypeId = activityCategories.find(
      (nt) => nt.name === formData.activityType
    )?.activityTypeId;

    const formatDate = (date: Date) => {
      const pad = (num: number) => String(num).padStart(2, "0");
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());
      const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    const startDate = new Date();
    const endDate = new Date();

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    formData.startDate = formattedStartDate;
    formData.createdDate = formattedStartDate;
    formData.endDate = formattedEndDate;

    const properties = {};
    addPropertyIfNotEmpty(
      properties,
      "activityStatus",
      formData.yieldEstimateHeads
    );

    formData.property = JSON.stringify(properties);
    if (selectedActivity) {
      try {
        console.log("FORMDATA", formData);
        console.log(activityCategories);
        formData.activityCategoryId = 11; //activityCategories.find(
        //(category) => category.name !== formData.category).activityCategoryId;
        formData.partyId = 238;
        formData.seasonStageId = seasonStages.find(
          (seasonStage) => seasonStage.value !== formData.seasonStage
        ).key;
        // formData.ActivityStatusId = activityStatuses.find(
        //   (status) => status.value !== formData.status).ActivityStatusId;

        await createActivity(formData);
        setActivities([...activities, formData]);
      } catch (error) {
        console.error("Error creating activity:", error);
      }
    }
    setIsLoading(false);
    handleCloseForm();
  };
  //ACTIVITY END

  return (
    <>
      <Grid>
        <NotesDialog
          isOpen={openNote}
          onClose={handleCloseForm}
          onSubmit={handleSubmitNote}
          formData={selectedNote}
          noteTypes={noteTypes}
        />
        <OrganizationDialog
          isOpen={openOrg}
          onClose={handleCloseForm}
          onSubmit={handleSubmitOrg}
          formData={selectedOrg}
          legalEntities={legalEntities}
        />
        <ActivityDialog
          isOpen={openAct}
          onClose={handleCloseForm}
          onSubmit={handleSubmitAct}
          formData={selectedActivity}
          activityCategory={activityCategories}
          activityStatus={activityStatuses}
          seasonStages={seasonStages}
          noteList={notes}
          organizations={organizations}
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
