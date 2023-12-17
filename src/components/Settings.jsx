import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Title = styled.h2`
  font-weight: bold;
  color: #A59132;
  margin: 10px;
`;

const SaveButton = styled(Button)`
  width: 70px;
  border-radius: 45px;
  background-color: #DA7422;
  border: none;
  margin-right: 5px;

  &:hover {
    background-color: #D06023;
  }

  &:active {
    background-color: #D06023 !important;
  }
`;

const CancelButton = styled(Button)`
  width: 70px;
  border-radius: 45px;
  background-color: #ced4da;
  color: gray;
  border: none;

  &:hover {
    background-color: #c3c9ce;
    color: gray;
  }

  &:active {
    background-color: #c3c9ce !important;
    color: gray;
  }
`;

const Settings = () => {
  const contentRef = useRef(null);
  const [userInfo, setUserInfo] = useState({
    firstName:"",
    lastName: "",
    username:"",
    email:""
  });
  
  useEffect(() => {
    axios.get("http://localhost:8080/fetch-user-info")
      .then(res => {
        const user = res.data.user;
        setUserInfo(user);
      })
      .catch(err => console.log(err))
    console.log(userInfo)
  }, [])

  useEffect(() => {
    const content = contentRef.current;
    if (content.scrollHeight <= content.clientHeight) {
      content.style.overflowY = 'hidden';
    } else {
      content.style.overflowY = 'scroll';
    }
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:8080/update-user-info', userInfo);
      console.log(response.data);
      // Handle success or show a success message
    } catch (error) {
      console.error('Error updating user information:', error);
      // Handle error or show an error message
    }
  };

  return (
    <Container>
      <Title>Settings</Title>
      <div ref={contentRef} style={{ overflow: 'hidden', overflowY: 'scroll', height: 'calc(100vh - 150px)' }}>
        <div style={{ margin: 20, display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            defaultValue={userInfo.firstName}
            onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
            style={{ marginBottom: 20 }}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            defaultValue={userInfo.lastName}
            onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
            style={{ marginBottom: 20 }}
          />
          <TextField
            required
            id="outlined-required"
            label="Username"
            defaultValue={userInfo.username}
            onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
            style={{ marginBottom: 20 }}
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            defaultValue={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            style={{ marginBottom: 20 }}
          />
          <TextField
            required
            id="outlined-required"
            label="Change Password"
            defaultValue=""
            style={{ marginBottom: 20 }}
          />
          <TextField
            required
            id="outlined-required"
            label="Confirm Password"
            defaultValue=""
            style={{ marginBottom: 20 }}
          />
          <div>
            <SaveButton onClick={handleSave}>Save</SaveButton>
            <CancelButton variant="secondary">Cancel</CancelButton>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Settings;