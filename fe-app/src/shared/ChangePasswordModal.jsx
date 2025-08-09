import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { changePassword } from "../store/Auth/Action";
import "./change.css";
import { enqueueSnackbar } from "notistack";

function ChangePasswordModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      newPassword: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(changePassword(values));
      enqueueSnackbar("Đổi mật khẩu thành công!", { variant: "success" });
      handleClose();
    },
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "center",
          border: "none",
          outline: "none",
          borderRadius: "30px",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#FFCFB3",
          color: "white",
          alignItems: "center",
          border: "none",
          outline: "none",
        }}
      >
        Change Password
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ p: 2, borderRadius: "14px" }}>
          <TextField
            autoFocus
            margin="dense"
            id="oldPassword"
            name="oldPassword"
            label="Old Password"
            type="password"
            fullWidth
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} className="btn__ounltine">
            Cancel
          </Button>
          <Button type="submit" className="btn__cancel">
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ChangePasswordModal;
