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
  const [noteTypes, setNoteTypes] = useState<any[]>([]);
  const { selectedOrganization } = useGlobalState();

  const [legalEntities, setLegalEntities] = useState<LegalEntity[]>([]);
  const [activityCategories, setActivityCategories] = useState<any[]>([]);
  const [activityStatuses, setActivityStatuses] = useState<any[]>([]);
  const [seasonStages, setSeasonStages] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useFetchData(getActivityCategories, setActivityCategories);
  useFetchData(getActivityStatuses, setActivityStatuses);
  useFetchData(getSeasonStages, setSeasonStages);
  useFetchData(getLegalEntities, setLegalEntities);
  useFetchData(getNoteTypes, setNoteTypes);

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
  };

  const handleSubmitOrg = async (formData: any) => {
    console.log(formData);
  };

  const handleSubmitAct = async (formData: any) => {

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
          fields={undefined}
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
