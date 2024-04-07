import React from "react";

import Button from "@mui/material/Button";

import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import BootstrapDialog from "./BootstrapDialog";

export default function DeleteConfirmationModal({ onCancel, onConfirm }) {
    return (
        <div>
            <BootstrapDialog open onClose={onCancel}>
                <Stack sx={{ minWidth: "min(100%, 300px)" }}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent dividers>Are you sure you want to delete this task ?</DialogContent>
                    <DialogActions>
                        <Button sx={{ mx: 2 }} onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button onClick={onConfirm} variant="contained" color="error">
                            Delete
                        </Button>
                    </DialogActions>
                </Stack>
            </BootstrapDialog>
        </div>
    );
}
//
