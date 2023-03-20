import Axios from "axios";

export const addAnnouncement = async (values) => {
  let res = await Axios.post("http://localhost:5000/announcements", values);
  if (res) {
    console.log(res);
  } else {
    alert("some error occurred!");
  }
};

export const getAllAnnouncements = async (index) => {
  let Events = await Axios.get("http://localhost:5000/announcements/");
  if (Events) {
    return Events;
  } else {
    alert("some error occurred!");
  }
  // Get request here
};

export const getAnnouncement = (index) => {
  // delete request here
};
export const updateAnnouncement = (index, data) => {
  // put request here
};

export const deleteAnnouncement = (index) => {
  // delete request here
};
