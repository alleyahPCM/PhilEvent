import { useEffect, useState } from 'react';
import { Container, Button, Toast } from 'react-bootstrap';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import { settingsSchema } from "../validations/UserValidation";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

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
      })
      .catch(err => console.log(err))
  }, []);

  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    pass: '',
    confpass: ''
  });
  
  const updateUserInfo = async () => {
    try {
      // Fetch updated user info from the database and update state
      const res = await axios.get("http://localhost:8080/fetch-user-info");
      const user = res.data.user;
  
      // Set pass and confpass to blank in the user object
      const { pass, confpass, ...userInfoWithoutPass } = user;
      const updatedUser = { ...userInfoWithoutPass, pass: '', confpass: '' };
  
      // Reset the form to initial values and clear error messages
      setUserInfo(updatedUser);
      setInitialUserInfo(user);
      setErrorMessages({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        pass: '',
        confpass: ''
      });
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleSave = async () => {
    try {
      // Validate the userInfo object using the settingsSchema
      await settingsSchema.validate(userInfo, { abortEarly: false });
  
      if (userInfo.pass === userInfo.confpass) {
        const response = await axios.put('http://localhost:8080/update-user-info', userInfo);
        setErrorMessage(response.data.message);
        setStatus("success");
        
        // Call the updateUserInfo function to reset and fetch updated user info
        await updateUserInfo();
      } else {
        setErrorMessage("Password does not Match!");
        setStatus("danger")
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = {};
    
        // Handle Yup validation errors for each field
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
    
        setErrorMessages(errors); // Set error messages for each field
        setStatus("danger");
        setErrorMessage("Please fix the errors before saving!");
      } else {
        console.error('Error updating user information:', error);
        setErrorMessage("An error occurred while saving. Please try again.");
        setStatus("danger");
      }
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      [field]: value,
    }));
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
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          error={!!errorMessages.firstName}
          helperText={errorMessages.firstName || ''}
          style={{ marginBottom: 20 }}
        />
        <TextField
          required
          id="lname"
          label="Last Name"
          value={userInfo.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value )}
          error={!!errorMessages.lastName}
          helperText={errorMessages.lastName || ''}
          style={{ marginBottom: 20 }}
        />
        <TextField
          required
          id="uname"
          label="Username"
          value={userInfo.username}
          onChange={(e) => handleInputChange('username', e.target.value )}
          error={!!errorMessages.username}
          helperText={errorMessages.username || ''}
          style={{ marginBottom: 20 }}
        />
        <TextField
          required
          id="email"
          label="Email"
          value={userInfo.email}
          onChange={(e) => handleInputChange('email', e.target.value )}
          error={!!errorMessages.email}
          helperText={errorMessages.email || ''}
          style={{ marginBottom: 20 }}
        />
        <TextField
          required
          id="changepass"
          label="Change Password"
          type={showPassword ? 'text' : 'password'}
          value={userInfo.pass}
          onChange={(e) => handleInputChange('pass', e.target.value )}
          error={!!errorMessages.pass}
          helperText={errorMessages.pass || ''}
          style={{ marginBottom: 20 }}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        <TextField
          required
          id="confirmpass"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={userInfo.confpass}
          onChange={(e) => handleInputChange('confpass', e.target.value )}
          error={!!errorMessages.confpass}
          helperText={errorMessages.confpass || ''}
          style={{ marginBottom: 20 }}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
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
