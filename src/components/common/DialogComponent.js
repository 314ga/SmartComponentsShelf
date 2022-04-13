import React from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
} from "../../mImportHelper/MUIImports";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    minWidth: "45%",
    maxWidth: "none",
  },
}));

const DialogComponent = (props) => {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();
  return (
    <>
      <Dialog open={openPopup} classes={{ paper: classes.dialogWrapper }}>
        <DialogTitle className="text-center">
          <div>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </>
  );
};

export default DialogComponent;
