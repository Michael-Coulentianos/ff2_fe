import { useRef, useState } from "react";
import {
  ButtonGroup,
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ActivityDialog from "../organisms/activityDialog";
import NotesDialog from "../organisms/notesDialog";
import OrganizationDialog from "../organisms/organisationDialog";

const options = ["New Organisation", "New Note", "New Activity"];

export default function GroupButton() {
  const [open, setOpen] = useState(false);
  const [openOrg, setOpenOrg] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [openAct, setOpenAct] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick = () => {
    const selectedOption = options[selectedIndex];
    switch (selectedOption) {
      case "New Organisation":
        setOpenOrg(true);
        break;
      case "New Note":
        setOpenNote(true);
        break;
      case "New Activity":
        setOpenAct(true);
        break;
    }
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef}>
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options?.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <OrganizationDialog
        isOpen={openOrg}
        onClose={undefined}
        onSubmit={undefined}
        formData={undefined}
        legalEntities={undefined}
      />
      <NotesDialog
        isOpen={openNote}
        onClose={undefined}
        onSubmit={undefined}
        formData={undefined}
        noteTypes={undefined}
        organizations={undefined}
      />
      <ActivityDialog
        isOpen={openAct}
        onClose={undefined}
        onSubmit={undefined}
        formData={undefined}
        activityCategory={undefined}
        activityStatus={undefined}
        seasonStages={undefined}
        noteList={undefined}
      />
    </>
  );
}
