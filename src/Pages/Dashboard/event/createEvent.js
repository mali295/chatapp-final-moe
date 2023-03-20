import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { addEvent, Events } from "../../../core/services/eventService";
import {useEffect} from "react";
import { Courses } from '../../../core/services/courseService';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal(props) {
    const [courseName, setCourseName] = React.useState("Course 1");
  const [eventType, setEventType] = React.useState("Announcement");
  const [gradeName, setGradeName] = React.useState("");
  const [grade, setGrade] = React.useState(null);
  const [weight, setWeight] = React.useState(null);
  const [dueDate, setDueDate] = React.useState(props.dueDate);
  
  useEffect(() => {
    setDueDate(props.dueDate);
  },[props.dueDate]);
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
    });
    console.log(Events);
    props.handleClose();
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Add Event</h2>

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
             <label>Course Name</label>
            <br />
            <select defaultValue={courseName} onChange={(e) => setCourseName(e.target.value)}>
              {Courses && Courses.map(el=><>
              <option value={el}>{el}</option>
              </>)}
            </select>
            <br />
            <label>Event Type</label>
            <br />
            <select defaultValue={eventType} onChange={(e) => setEventType(e.target.value)}>
              <option value="Assignments">
                Assignments
              </option>
              <option value="Quizzes">Quizzes</option>
              <option value="Government Quiz">Government Quiz</option>
              <option value="Labs">Labs</option>
            </select>
            <br />
            <label>Grade Item Name</label>
            <br />
            <input
              name="gradeName"
              type="text"
              onChange={(e) => setGradeName(e.target.value)}
            />
            <br />
            <label>Grade (%)</label>
            <br />
            <input
              name="grade"
              min="0"
              max="100"
              style={{width:'80px'}}
              type="number"
              onChange={(e) => setGrade(e.target.value)}
            />
            <br />
            <label>Weight (%)</label>
            <br />
            <input
              name="weight"
              min="0"
              max="100"
              style={{width:'80px'}}
              type="number"
              onChange={(e) => setWeight(e.target.value)}
            />
            <br />
            <label>Due Date</label>
            <br />
            <input
              name="dueDate"
              disabled
              defaultValue={props.dueDate}
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
            />
            <br />
            <br />
            <Button onClick={props.handleClose}>Close</Button>
            <Button disabled = { gradeName==='' || grade ===null || weight===null} type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
