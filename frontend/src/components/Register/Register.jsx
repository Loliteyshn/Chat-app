import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import axios from "axios";
import { registerRoute } from '../../utils/APIRoutes';

const Input = ({ name, placeholder, type, validate }) => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className={styles.formGroup}>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                {...register(name, validate)}
                className={`${styles.input} ${errors[name] ? styles.errorInput : ''}`}
            />
            <div>
                {errors[name] && <span className={styles.errorText}>{errors[name].message}</span>}
            </div>
        </div>
    );
};

function Register() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const methods = useForm();

    const handleSubmit = async (formData, event) => {
        try {
            const { data } = await axios.post(registerRoute, formData);
            console.log(data);
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
            }
            navigate("/");
        } catch (error) {
            console.error("There was an error registering the user!", error);
        }
    }



    // const handleChange = (event) => {
    //     setValues({ ...values, [event.target.name]: event.target.value })
    // }

    return (
        <div className={styles.container}>
            <FormProvider {...methods}>
                <form className={styles.formContainer} onSubmit={methods.handleSubmit(handleSubmit)} >
                    <h3>Registration</h3>
                    <Input type="text"
                        name={'username'}
                        placeholder='Username'
                        validate={{
                            required: 'Username is required',
                            minLength: { value: 3, message: 'Username must be at least 3 characters' }
                        }}
                        on />
                    <Input type="email"
                        name={'email'}
                        placeholder='Email'
                        validate={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email'
                            }
                        }} />
                    <Input type="password"
                        name={'password'}
                        placeholder='Password'
                        validate={{
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters' }
                        }} />
                    <Input type="password"
                        name={'confirmPassword'}
                        placeholder='Confirm Password'
                        validate={{
                            required: 'Confirm Password is required',
                            validate: (value) => value === methods.watch('password') || 'Passwords do not match'
                        }} />
                    <button type='submit'> Create User </button>
                    <span> already have an account ? <Link to='/login'> Login </Link> </span>
                </form>
            </FormProvider>
        </div>
    )
}

export default Register