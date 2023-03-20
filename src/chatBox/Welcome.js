import React, { useState, useEffect } from "react";
import styled from "styled-components";

//import Robot from "../../assets/robot.gif";
import Robot from "../assets/robot.gif"
import { Avatar, Typography } from "@mui/material";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <Avatar className="img" src={Robot} alt="" />
      <Typography variant="h3">
        Welcome, <Typography variant="3">{userName}!</Typography>
      </Typography>
      <Typography variant="h6">Please select a chat to Start messaging.</Typography>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  .img {
    height: 20rem;
    width:20rem;
  }
  span {
    color: #4e0eff;
  }
`;