import React, { useState} from "react";

import google from "../img/google.svg";
import facebook from "../img/facebook.svg";
import twitter from "../img/twitter.svg";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { userSchema } from "../validations/UserValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 

function SignUpForm() {
    // const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm({
        resolver: yupResolver(userSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
        // navigate('/');
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
            <br/>
            <div className="d-flex align-items-center">
               <div className="line"></div>
               <span className="or-sign-up-text">Or Sign Up With</span>
               <div className="line"></div>
            </div>
            <br/>
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
            <br/>
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






