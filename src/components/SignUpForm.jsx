import { useState } from "react";
import axios from "axios";

import google from "../img/google.svg";
import facebook from "../img/facebook.svg";
import twitter from "../img/twitter.svg";

import { Button, Form, Toast} from 'react-bootstrap';

import { signupSchema } from "../validations/UserValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SignUpForm() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        const { terms, confirmPassword, ...formData } = data;
        try {
            setLoading(true)
            await axios.post("http://localhost:8080/signup", formData);
            navigate("/UserHome")
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.error) {
                setErrorMessage(err.response.data.error);
            } else {
                setErrorMessage('An error occurred during signup.');
            }
        } finally {
            setLoading(true)
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
            <h2 className="signup-text">Sign Up</h2>
            
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex">
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Control className="text-field signup-text-field" type="text" placeholder="First Name" {...register("firstName")} />
                    </Form.Group>

                    <Form.Group className="mb-3 ms-3" controlId="formBasicLastName">
                            <Form.Control className="text-field signup-text-field" type="text" placeholder="Last Name" {...register("lastName")} />
                    </Form.Group>
                </div>
                {errors.firstName && errors.lastName ? (
                    <p className="error">First Name and Last Name are required!</p>
                ) : (
                    <>
                        {errors.firstName && <p className="error">{errors.firstName?.message}</p>}
                        {errors.lastName && <p className="error">{errors.lastName?.message}</p>}
                    </>
                )}

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
                    {loading ? (<Button className="signup-btn"><Skeleton width={'50%'} baseColor="#da7422" /></Button>) : (<Button className="signup-btn" type="submit">SIGN UP</Button>)}
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
                <a className="login-link" href="/Login">
                    Login
                </a>
            </div>

            </div>
        </div>
       
    );
}

export default SignUpForm;
