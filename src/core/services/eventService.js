import Axios from "axios";
export const Events = [
  {
    courseName: "COURSE 1",
    eventType: "Quizzes",
    gradeName: "Lab 1",
    weight: 25,
    grade: 42,
    dueDate: "2022-10-10",
  },
];

export const addEvent = async (values) => {
  Events.push(values);
  let res = await Axios.post("http://localhost:5000/events", values);
  if (res) {
    console.log(res);
  } else {
    alert("some error occurred!");
  }
};

export const getAllEvents = async (type) => {
  let Events = await Axios.get("http://localhost:5000/events/" + type);
  if (Events) {
    return Events;
  } else {
    alert("some error occurred!");
  }
};

export const getUpcomingEvents = async () => {
  let Events = await Axios.get("http://localhost:5000/upcomingEvents");
  if (Events) {
    return Events.data;
  } else {
    return [];
  }
};

export const getClientEvents = async () => {
  let Events = await Axios.get("http://localhost:5000/clientEvents");
  if (Events) {
    return Events.data;
  } else {
    return [];
  }
};

export const getUpcomingEventsAll = async () => {
  let Events = await Axios.get("http://localhost:5000/upcomingEventsAll");
  if (Events) {
    return Events.data;
  } else {
    return [];
  }
};

export const getEvent = (index) => {
  return Events[index];
  // delete request here
};
export const updateEvent = (index, data) => {
  return (Events[index] = {
    ...Events[index],
    ...data,
  });
  // put request here
};

export const deleteEvent = (index) => {
  Events.splice(index, 1);
  // delete request here
};

export const getSingleDate = async (date) => {
  let Events = await Axios.post("http://localhost:5000/singledate/", { date });
  if (Events) {
    return Events.data;
  } else {
    return [];
  }
};
