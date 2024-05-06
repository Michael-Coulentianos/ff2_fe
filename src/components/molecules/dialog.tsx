import {
  Container,
  IconButton,
  DialogTitle,
  Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DynamicFormDialog = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  formContent,
}) => {
  return (
    <Container>
      <Dialog onClose={onClose} open={isOpen}>
        <DialogTitle>{title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {formContent}
      </Dialog>
    </Container>
  );
};

export default DynamicFormDialog;
