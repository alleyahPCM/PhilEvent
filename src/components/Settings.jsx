import { useEffect, useState } from 'react';
import { Container, Button, Toast } from 'react-bootstrap';
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
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8080/fetch-user-info")
      .then(res => {
        const user = res.data.user;
        setUserInfo(user);
        setInitialUserInfo(user);
        console.log(user);
      })
      .catch(err => console.log(err))
  }, []);

  const handleSave = async () => {
    try {
      if (userInfo.pass === userInfo.confpass) {
        const response = await axios.put('http://localhost:8080/update-user-info', userInfo);
        setErrorMessage(response.data.message);
        setStatus("success")
        // No need to setToast here unless you specifically want to use it
        setUserInfo({ ...initialUserInfo, pass: initialUserInfo.pass || '', confpass: initialUserInfo.confpass || '' });
      } else {
        setErrorMessage("Password does not Match!");
        setStatus("danger")
      }
    } catch (error) {
      console.error('Error updating user information:', error);
      // Set an error message here if needed
    }
  };

  const handleCancel = () => {
    // Reset userInfo to initialUserInfo including resetting password fields
    setUserInfo({
      ...initialUserInfo,
      pass: initialUserInfo.pass || '',
      confpass: initialUserInfo.confpass || ''
    });
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Title>Settings</Title>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
            type="password"
            value={userInfo.pass} // Use value prop instead of defaultValue
            onChange={(e) => setUserInfo({ ...userInfo, pass: e.target.value })}
            style={{ marginBottom: 20 }}
          />
          <TextField
            required
            id="confirmpass"
            label="Confirm Password"
            type="password"
            value={userInfo.confpass} // Use value prop instead of defaultValue
            onChange={(e) => setUserInfo({ ...userInfo, confpass: e.target.value.toString() })}
            style={{ marginBottom: 20 }}
          />
          <ButtonWrapper>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </ButtonWrapper>
        </div>
      </div>
      <Toast
        show={errorMessage !== ''}
        onClose={() => setErrorMessage('')}
        delay={5000}
        autohide
        bg={status}
        className={`position-fixed top-0 end-0 text-white`}
        style={{ maxWidth: '300px', margin: '25px', zIndex: '1000' }}
      >
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default Settings;
