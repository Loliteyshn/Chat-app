import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import styles from './ModalWindow.module.css';
import axios from 'axios';
import { createUserRoute } from '../../../utils/APIRoutes';

const Input = ({ name, placeholder}) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className={styles.formGroup}>
            <input
                name={name}
                placeholder={placeholder}
                {...register(name, {
                    required: `${placeholder} is required`,
                    minLength: {
                        value: 3,
                        message: `${placeholder} must be at least 3 characters`
                    }
                })}
                className={`${styles.input} ${errors[name] ? styles.errorInput : ''}`}
            />
            <div>
                {errors[name] && <span className={styles.errorText}>{errors[name].message}</span>}
            </div>
        </div>
    );
};

const ModalWindow = ({ show, onClose, createChat }) => {
    if (!show) {
        return null;
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                <Form createChat={createChat} />
            </div>
        </div>
    );
};

const Form = ({ createChat}) => {

    const methods = useForm();
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(createChat)} className={styles.content}>
                <Input name="firstname" placeholder="Firstname" />
                <Input name="lastname" placeholder="Lastname" />
                <button type="submit" className={styles.submit}>Create chat</button>
            </form>
        </FormProvider>
    )
}

export default ModalWindow;
