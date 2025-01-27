import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';

interface GenericConfirmDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  content: string;
  cancelText?: string;
  confirmText?: string;
}

const GenericConfirmDialog: React.FC<GenericConfirmDialogProps> = ({
    open,
    onCancel,
    onConfirm,
    title = null,
    content,
    cancelText = "Cancel",
    confirmText = "Confirm"
  }) => {
    return (
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            {cancelText}
          </Button>
          <Button onClick={onConfirm} color="primary" autoFocus>
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default GenericConfirmDialog;