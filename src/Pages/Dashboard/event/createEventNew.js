import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Courses } from "../../../core/services/courseService";
import { addEvent, Events } from "../../../core/services/eventService";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useEffect } from "react";

const emails = ["username@gmail.com", "user02@gmail.com"];

export default function SimpleDialogDemo(props) {
  console.log(props);
  const { onClose, selectedValue, open } = props;

  const [courseName, setCourseName] = React.useState("COURSE 1");
  const [eventType, setEventType] = React.useState(
    props.eventType ? props.eventType : ""
  );
  const [gradeName, setGradeName] = React.useState("");
  const [grade, setGrade] = React.useState(null);
  const [weight, setWeight] = React.useState(null);
  const [dueDate, setDueDate] = React.useState(props.dueDate);

  useEffect(() => {
    setDueDate(props.dueDate);
    console.log(props.eventType);
    setEventType(props.eventType);
  }, [props.eventType, props.dueDate]);
  const minValue = (min) => (value) =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${0}`;
  const maxValue = (max) => (value) =>
    isNaN(value) || value <= max ? undefined : `Should be greater than ${100}`;
  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e);
    console.log(eventType);
    console.log(gradeName);
    console.log(grade);
    console.log(weight);
    console.log(dueDate);
    addEvent({
      courseName,
      eventType,
      gradeName,
      grade,
      weight,
      dueDate,
      type: props.type ? props.type : "admin",
    });
    console.log(Events);
    if (props.setUpdate) {
      props.setUpdate(!props.update);
    }
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        onClose={props.handleClose}
        open={props.open}
      >
        <DialogTitle>Create Event</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Choose Course
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={courseName}
                defaultValue={courseName}
                label="Choose Course"
                onChange={(e) => setCourseName(e.target.value)}
              >
                {Courses &&
                  Courses.map((el) => <MenuItem value={el}>{el}</MenuItem>)}
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Choose Event Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                disabled={props.eventType ? true : false}
                value={eventType}
                defaultValue={eventType}
                label="Choose Event"
                onChange={(e) => setEventType(e.target.value)}
              >
                <MenuItem value="Announcements">Announcements</MenuItem>
                <MenuItem value="Assignments">Assignments</MenuItem>
                <MenuItem value="Quizzes">Quizzes</MenuItem>
                <MenuItem value="Labs">Labs</MenuItem>
                <MenuItem value="Exams">Exams</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <TextField
                required
                id="outlined-required"
                label="Grade Item Name"
                defaultValue=""
                onChange={(e) => setGradeName(e.target.value)}
              />
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl fullWidth>
              <TextField
                id="outlined-number"
                label="Grade"
                type="number"
                validate={composeValidators(minValue(0), maxValue(100))}
                onChange={(e) => setGrade(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <TextField
                id="outlined-number"
                label="Weight"
                type="number"
                validate={composeValidators(minValue(0), maxValue(100))}
                onChange={(e) => setWeight(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Due Date"
                  inputFormat="MM/DD/YYYY"
                  value={dueDate}
                  onChange={(e) => {
                    console.log(e);
                    setDueDate(e);
                  }}
                  disabled={props.dueDate ? true : false}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button variant="contained" onClick={(e) => handleSubmit(e)}>
              Submit
            </Button>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

SimpleDialogDemo.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  dueDate: PropTypes.string.isRequired,
  eventType: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};
