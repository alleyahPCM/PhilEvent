import { useState } from "react";

import google from "../img/google.svg";
import facebook from "../img/facebook.svg";
import twitter from "../img/twitter.svg";

import { Form, Button, Toast } from 'react-bootstrap';
import { loginSchema } from "../validations/UserValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from "axios";

function LoginForm() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/login", {
                identifier: data.emailOrUname,
                password: data.cpassword,
            });

            console.log(response.data);
            if (response.data.success) {
                navigate('/UserHome');
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error("Login failed:", error.response.data.error);
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="d-flex flex-column flex-grow-1 login-container">
            <div className="overlay"></div>
            <div className="d-flex flex-column signup-content">
                <h2 className="login-text">Login</h2>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmailOrUsername">
                        <Form.Control className="text-field login-text-field" type="text" placeholder="Email or Username" {...register("emailOrUname")} />
                        <p className="error">{errors.emailOrUname?.message}</p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCBasicPassword">
                        <div className="d-flex">
                            <Form.Control className="text-field login-text-field" type={passwordVisible ? 'text' : 'password'} placeholder="Password" {...register("cpassword")} />
                            <button className="btn eye" type="button" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <AiFillEyeInvisible className="eye-icon" /> : <AiFillEye className="eye-icon" />}
                            </button>
                        </div>
                        <p className="error">{errors.cpassword?.message}</p>
                    </Form.Group>

                    <div className="d-flex test">
                        {['checkbox'].map((type) => (
                            <Form.Group key={`inline-${type}`} className="mb-3" controlId="formBasicCheckbox" >
                                <div className="login-custom-checkbox custom-checkbox">
                                    <Form.Check
                                        type={type}
                                        id={`default-${type}`}
                                        label={
                                            <>
                                                <span className="remember-text">Remember Me</span> {' '}
                                            </>
                                        }
                                        {...register("remember")} />
                                </div>
                            </Form.Group>
                        ))}

                        <a href="/forgot" className="forgot-link">Forgot Password?</a>
                    </div>


                    <Button className="login-btn" type="submit">LOGIN</Button>
                </Form>
                <Toast
                    show={errorMessage !== ''}
                    onClose={() => setErrorMessage('')}
                    delay={5000}
                    autohide
                    bg="danger"
                    className="position-fixed top-0 text-white" // Center vertically
                    style={{ maxWidth: '350px', margin: '25px' }} // Optional: Set max width as per your design
                >
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
                <br />
                <div className="d-flex align-items-center">
                    <div className="line"></div>
                    <span className="or-login-text">Or Login With</span>
                    <div className="line"></div>
                </div>
                <br />
                <div className="socials-container">
                    <button className="social-space social-btn">
                        <img src={google} alt="google" className="socials" />
                    </button>
                    <button className="social-space social-btn">
                        <img src={facebook} alt="facebook" className="socials" />
                    </button>
                    <button className="social-btn">
                        <img src={twitter} alt="twitter" className="socials" />
                    </button>

                </div>
                <br />
                <div>
                    <span className="already-text dont-have-text">Don't have an account? </span>
                    <a className="signup-link" href="/Signup">
                        Sign Up
                    </a>
                </div>

            </div>
        </div>

    );
}

export default LoginForm;






