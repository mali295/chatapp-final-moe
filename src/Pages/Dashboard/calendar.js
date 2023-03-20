import * as React from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay, pickersDayClasses } from "@mui/x-date-pickers/PickersDay";
import {
  getAllEvents,
  getSingleDate,
  getUpcomingEvents,
  getUpcomingEventsAll,
} from "../../core/services/eventService";

import moment from "moment";
import { getAllAnnouncements } from "../../core/services/announcementService";
dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  ...(selected && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

export default function CustomDay(props) {
  const [eventsList, setEventsList] = React.useState([]);

  const sorter = (a, b) => {
    if (a.type === "client") {
      return -1;
    }
    if (b.type === "client") {
      return 1;
    }
    if (a.eventType === "Exams" || a.eventType === "Quizzes") {
      return 1;
    }
    if (b.eventType === "Exams" || b.eventType === "Quizzes") {
      return -1;
    }
    if (a.eventType === "Assignments" || a.eventType === "Labs") {
      return 1;
    }
    if (b.eventType === "Assignments" || b.eventType === "Labs") {
      return -1;
    }

    return -1;
  };

  React.useEffect(() => {
    getUpcomingEventsAll().then((eventsHighlighting) => {
      getAllAnnouncements().then((announcementsHighlighting) => {
        setEventsList(
          [...eventsHighlighting, ...announcementsHighlighting?.data]?.sort(
            sorter
          )
        );
      });
    });
  }, []);

  const [value, setValue] = React.useState(dayjs(Date.now()));

  console.log(eventsList);

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    const matchedStyles = eventsList.reduce((a, v) => {
      // console.log(a);
      // console.log(v);

      return moment(date.$d)?.format("YYYY-DD-MM") ===
        moment(v.dueDate)?.format("YYYY-DD-MM") ||
        moment(date.$d)?.format("YYYY-DD-MM") ===
          moment(v.creationDate, "MMMM Do YYYY, h:mm:ss a")?.format(
            "YYYY-DD-MM"
          )
        ? {
            backgroundColor:
              v.type === "client"
                ? "green"
                : v.eventType == "Exams" || v.eventType == "Quizzes"
                ? "red"
                : v.eventType == "Assignments" || v.eventType == "Labs"
                ? "orange"
                : "#1664C0",
            color: "white",
          }
        : a;
    }, {});
    // console.log(matchedStyles);

    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          ...matchedStyles,
        }}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        label="Week picker"
        value={value}
        onChange={(newValue) => {
          console.log(newValue);
          setValue(newValue);
          props.getCalender(newValue.$d.toISOString().split("T")[0]);
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} fullWidth />}
        inputFormat="'Week of' MMM d"
      />
    </LocalizationProvider>
  );
}
