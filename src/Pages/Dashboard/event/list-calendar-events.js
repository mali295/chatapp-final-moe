import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import { Label } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ListEventCalendar(props) {
  return (
    <div>
      <Dialog
        open={props.open && props?.rows?.length > 0}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // PaperProps={{
        //   style: {
        //     minWidth: "50vw",
        //     padding: "25px 10px",
        //   },
        // }}
      >
        {props.rows &&
          props.rows.length > 0 &&
          props.rows.map((row) => (
            <Grid style={{ padding: "10px" }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <DialogTitle id="alert-dialog-title" style={{ padding: 0 }}>
                    {row.gradeName ? row.gradeName : row.title} hi
                  </DialogTitle>
                </AccordionSummary>
                <AccordionDetails>
                  <DialogContent style={{ padding: 0 }}>
                    <DialogContentText
                      id="alert-dialog-description"
                      style={{ padding: 0 }}
                    >
                      {row?.creationDate ? (
                        <>
                          <Typography>
                            <strong>Description:</strong> {row?.description}{" "}
                          </Typography>
                          <Typography>
                            <strong>creationDate:</strong> {row?.creationDate}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography>
                            <strong>Weight :</strong> {row.weight}{" "}
                          </Typography>
                          <Typography>
                            <strong>Due :</strong> {row.dueDate}
                          </Typography>
                        </>
                      )}
                      <Link to={"/Alert"}>Button</Link>
                    </DialogContentText>
                  </DialogContent>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
      </Dialog>
    </div>
  );
}

ListEventCalendar.propTypes = {
  rows: PropTypes.array.isRequired,
};
