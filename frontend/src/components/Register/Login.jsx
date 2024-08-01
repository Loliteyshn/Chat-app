import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import axios from "axios";
import { loginRoute } from '../../utils/APIRoutes';

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

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [isLoginError, setIsLoginError] = useState(false);
  const navigate = useNavigate();
  const methods = useForm();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  })

  const handleSubmit = async (formData, event) => {
    try {
      const { data } = await axios.post(loginRoute, formData);
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setIsLoginError(true)
      }
    } catch (error) {
      console.log("There was an error registering the user!", error);
    }
  }

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form className={styles.formContainer} onSubmit={methods.handleSubmit(handleSubmit)} >
          <h3>Login</h3>
          {isLoginError && <div className={styles.loginError}>Incorrect username or password</div>}
          <Input type="text"
            name={'username'}
            placeholder='Username'
            validate={{
              required: 'Username is required',
            }}
          />
          <Input type="password"
            name={'password'}
            placeholder='Password'
            validate={{
              required: 'Password is required',
            }} />

          <button type='submit'> Login </button>
          <span> Don't have an account ? <Link to='/register'> Register </Link> </span>
        </form>
      </FormProvider>
    </div>
  )
}

export default Login;