import React, { useState, useEffect } from 'react';
import styles from './EditContact.module.css';
import { useFormContext, useForm, FormProvider } from 'react-hook-form';


const Input = ({ name, placeholder, formData, setFormData }) => {
    const { register, formState: { errors } } = useFormContext();


    const handleChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: event.target.value
        }));
    };

    return (
        <div className={styles.formGroup}>
            <input
                value={formData[name]}
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
                onChange={handleChange}
            />
            <div>
                {errors[name] && <span className={styles.errorText}>{errors[name].message}</span>}
            </div>
        </div>
    );
};

function EditContact({ show, onClose, currentChat, setFormData, formData, updateContact }) {
    const methods = useForm();
    
    useEffect(() => {
        if (currentChat) {
            setFormData({ id: currentChat._id, firstname: currentChat.firstname, lastname: currentChat.lastname });
        }
    }, [currentChat])

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
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(updateContact)} className={styles.content}>
                        <Input name="firstname" placeholder="Firstname"
                            formData={formData} setFormData={setFormData} />
                        <Input name="lastname" placeholder="Lastname"
                            formData={formData} setFormData={setFormData} />
                        <button type="submit" className={styles.submit}>Update chat</button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};


export default EditContact