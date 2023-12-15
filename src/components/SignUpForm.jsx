import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import google from "../img/google.svg";
import facebook from "../img/facebook.svg";
import twitter from "../img/twitter.svg";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

import { signupSchema } from "../validations/UserValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import {useSignIn} from "react-auth-kit";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 

function SignUpForm() {
    const navigate = useNavigate();
    //const signin = useSignIn();
    const [errorMessage, setErrorMessage] = useState('');
    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(signupSchema),
    });

    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get("http://localhost:8080/")
            .then(res => {
                console.log(res)
                if (res.data.valid) {
                    navigate("/interaction")
                }
            })
            .catch(err => console.log(err))
    }, [])

    const onSubmit = async (data) => {
        const { terms, confirmPassword, ...formData } = data;
        console.log(formData);
        try {
            await axios.post("http://localhost:8080/signup", formData);
            // signin({
            //     expiresIn: 3600,
            //     tokenType: "Bearer",
            //     authState: {email: data.email, name: data.firstName}
            // });
            navigate("/interaction")
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.error) {
                setErrorMessage(err.response.data.error);
            } else {
                setErrorMessage('An error occurred during signup.');
            }
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
      };


    return (
        <div className="d-flex flex-column flex-grow-1 signup-container">
        <div className="overlay"></div>
        <div className="d-flex flex-column signup-content">
            <h1 className="signup-text">Sign Up</h1>
            
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex">
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Control className="text-field signup-text-field" type="text" placeholder="First Name" {...register("firstName")} />
                        <p className="error">{errors.firstName?.message}</p>
                    </Form.Group>

                    <Form.Group className="mb-3 ms-3" controlId="formBasicLastName">
                            <Form.Control className="text-field signup-text-field" type="text" placeholder="Last Name" {...register("lastName")} />
                        <p className="error">{errors.lastName?.message}</p>
                    </Form.Group>
                </div>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Control className="text-field signup-text-field" type="text" placeholder="Username" {...register("uname")}/>
                <p className="error">{errors.uname?.message}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control className="text-field signup-text-field" type="email" placeholder="Email" {...register("email")}/>
                <p className="error">{errors.email?.message}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <div className="d-flex">
                            <Form.Control className="text-field signup-text-field" type={passwordVisible ? 'text' : 'password'} placeholder="Password" {...register("password")}/>
                    <button className="btn eye" type="button" onClick={togglePasswordVisibility}>
                        {passwordVisible ? <AiFillEyeInvisible className="eye-icon" /> : <AiFillEye className="eye-icon" />}
                    </button>
                </div>
                <p className="error">{errors.password?.message}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <div className="d-flex">
                    <Form.Control className="text-field signup-text-field" type={confirmPasswordVisible ? 'text' : 'password'} placeholder="Confirm Password" {...register("confirmPassword")}/>
                        <button className="btn eye" type="button" onClick={toggleConfirmPasswordVisibility}>
                            {confirmPasswordVisible ? <AiFillEyeInvisible className="eye-icon" /> : <AiFillEye className="eye-icon" />}
                        </button>
                    </div>
                <p className="error">{errors.confirmPassword?.message}</p>
                </Form.Group>

                {['checkbox'].map((type) => (
                <Form.Group key={`inline-${type}`}  className="mb-3" controlId="formBasicCheckbox" >
                    <div className="signup-custom-checkbox custom-checkbox">
                        <Form.Check 
                        type={type}
                        id={`default-${type}`}
                        label={
                            <>
                            <span className="agree-text">Agree to</span> {' '}
                            <a className="terms-and-conditions-link" href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                                Terms and Conditions
                            </a>
                            </>
                        }
                        {...register("terms")}/>
                    </div>
                    <p className="error">{errors.terms?.message}</p>
                </Form.Group>
                ))}
                <Button className="signup-btn" type="submit">SIGN UP</Button>
            </Form>
            <Toast
                show={errorMessage !== ''}
                onClose={() => setErrorMessage('')}
                delay={5000}
                autohide
                bg="danger"
                className={`position-fixed top-0 end-0 text-white`}
                style={{ maxWidth: '300px', margin: '25px' }} // Optional: Set max width as per your design
            >
                <Toast.Body>{errorMessage}</Toast.Body>
            </Toast>
            <br/>
            <div className="d-flex align-items-center">
               <div className="line"></div>
               <span className="or-sign-up-text">Or Sign Up With</span>
               <div className="line"></div>
            </div>
            <div className="socials-container">
                <button className="social-space social-btn">
                    <img src={google} alt="google" className="socials"/>
                </button>
                <button className="social-space social-btn">
                    <img src={facebook} alt="facebook" className="socials"/>
                </button>
                <button className="social-btn">
                    <img src={twitter} alt="twitter" className="socials"/>
                </button>
            </div>
            <div>
                <span className="already-text">Already have an account? </span>
                <a className="login-link" href="/login">
                    Login
                </a>
            </div>

            </div>
        </div>
       
    );
}

export default SignUpForm;






