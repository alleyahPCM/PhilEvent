import { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
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
  margin-right: 5px;

  &:hover {
    background-color: #c3c9ce;
    color: gray;
  }

  &:active, &:focus {
    background-color: #c3c9ce !important;
    color: gray !important;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Settings = () => {
  const [initialUserInfo, setInitialUserInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    pass: '',
    confpass: ''
  });

  const [userInfo, setUserInfo] = useState({ ...initialUserInfo });

  useEffect(() => {
    axios.get("http://localhost:8080/fetch-user-info")
      .then(res => {
        const user = res.data.user;
        setUserInfo(user);
        setInitialUserInfo(user); // Save fetched values as initialUserInfo
        console.log(user);
      })
      .catch(err => console.log(err))
  }, []);

  const handleSave = async () => {
    try {
      if (userInfo.pass === userInfo.confpass) {
        const response = await axios.put('http://localhost:8080/update-user-info', userInfo);
        console.log(response.data);
      }
      // Handle success or show a success message
    } catch (error) {
      console.error('Error updating user information:', error);
      // Handle error or show an error message
    }
  };

  const handleCancel = () => {
    // Reset userInfo to initialUserInfo
    setUserInfo({ ...initialUserInfo });
  };

  return (
    <Container>
      <Title>Settings</Title>
      <div style={{
        overflow: 'hidden', overflowY: 'scroll', height: 'calc(100vh - 150px)', display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ margin: 20, display: 'flex', flexDirection: 'column', maxWidth: 700, width: '100%' }}>
          <TextField
            required
            id="fname"
            label="First Name"
            value={userInfo.firstName}
            onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
            style={{ marginBottom: 20 }}
          />
          <TextField
            required
            id="lname"
            label="Last Name"
            value={userInfo.lastName}
            onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
            style={{ marginBottom: 20 }}
          />
          <TextField
            required
            id="uname"
            label="Username"
            value={userInfo.username}
            onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
            style={{ marginBottom: 20 }}
          />
          <TextField
            required
            id="email"
            label="Email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            style={{ marginBottom: 20 }}
          />
          <TextField
            required
            id="changepass"
            label="Change Password"
            defaultValue=""
            onChange={(e) => setUserInfo({ ...userInfo, pass: e.target.value })}
            style={{ marginBottom: 20 }}
          />
          <TextField
            required
            id="confirmpass"
            label="Confirm Password"
            defaultValue=""
            onChange={(e) => setUserInfo({ ...userInfo, confpass: e.target.value })}
            style={{ marginBottom: 20 }}
          />
          <ButtonWrapper>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </ButtonWrapper>
        </div>
      </div>
    </Container>
  );
};

export default Settings;
