import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { FormControlLabel, Checkbox, Box } from '@mui/material'

import { startStudentRegister, studentsAuthErrors, startEditStudent } from '../../../actions/adminstudentsAction'
 
import Heading from '../../Reusable-Comp/Heading'
import InputField from'../../Reusable-Comp/InputField'
import AlertComp from '../../Reusable-Comp/AlertComp'
import ButtonComp from '../../Reusable-Comp/ButtonComp'

const StudentsRegisterAndEdit = (props) => {
    const { id, name, email, allowed, handleShowClose } = props

    const dispatch = useDispatch()

    const registerErrors = useSelector((state) => {
        return state.adminStudents.errors
    })
    
    useEffect(() => {
        if( id ){
            setValues({
                name,
                email,
                isAllowed : allowed
            })
        }

       return () => {
        dispatch(studentsAuthErrors({}))
       }
    },[])
    
    useEffect(() => {
        setErrors(registerErrors)
    },[registerErrors])

    const validationSchema = yup.object({
        name : yup.string().required('Username Cannot be Blank'),
        email : yup.string().email('Invalid Email').required('Required'),
        password : !id && yup.string().min(8,'Password is too short').max(128).required('Required'),
    })
    
    const { values, setValues, handleChange, handleSubmit, errors, setErrors, touched, handleBlur } = useFormik({
        initialValues :{
            name :  '',
            email : '',
            password : '',
            isAllowed : false
        },
        validationSchema,
        validateOnChange : false,
        onSubmit : (values ,{resetForm}) => {
            if( id ){
                dispatch(startEditStudent(id,values,handleShowClose))
            }else{
                dispatch(startStudentRegister(values, resetForm))
            }
        }
    })

    return (
        <Box sx={{ display: 'flex', flexDirection : 'column', alignItems : 'center', justifyContent: 'center', textAlign : 'center', mt : 2 }}>

            { id ? (
                <Heading type="h3" title="Update Student Info 🧑‍🎓➡️"  className="login-heading" />
            ) : (
                <Heading type="h3" title="Register Students 🧑‍🎓➡️"  className="login-heading" />
            )}

            { errors.hasOwnProperty('errors') && <AlertComp type="error" title={errors.errors} />}
            { errors.hasOwnProperty('notice') && <AlertComp type="success" title={errors.notice} />}

            <form onSubmit={handleSubmit}>
                <InputField 
                    label="Name" 
                    name="name" 
                    value={values.name} 
                    handleChange={handleChange} 
                    handleBlur={handleBlur}
                    error={ errors.name && touched.name ? true : false } 
                    helperText = { touched.name && errors.name ? errors.name : ''} 
                    margin="normal" 
                    size="small" 
                    required={true}
                />

                <InputField 
                    label="Email" 
                    name="email" 
                    value={values.email} 
                    handleChange={handleChange} 
                    handleBlur={handleBlur}
                    error={errors.email && touched.email ? true : false } 
                    helperText = { touched.email && errors.email ? errors.email : ''} 
                    margin="normal" 
                    size="small" 
                    required={true}
                />

                { !id && (
                    <InputField 
                        label="Password" 
                        name="password" 
                        type="password"
                        value={values.password} 
                        handleChange={handleChange} 
                        handleBlur={handleBlur}
                        error={ touched.password && errors.password ? true : false } 
                        helperText = { touched.password && errors.password ?  errors.password : ''} 
                        margin="normal" 
                        size="small" 
                        required={true}
                    />
                )}

                <FormControlLabel
                    label="Allow Student"
                    margin="normal"
                    control={
                        <Checkbox 
                        name="isAllowed"
                        checked={values.isAllowed}
                        onChange={handleChange}
                    />}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt : 1 }} >
                    { id ?  (
                        <>
                            <ButtonComp variant="contained" handleClick={handleSubmit} title="Update" />
                            <ButtonComp 
                                variant="contained" 
                                handleClick={handleShowClose} 
                                title="Cancel" 
                                color="secondary" 
                            />
                        </>
                    ): (
                        <>
                            <ButtonComp variant="contained" handleClick={handleSubmit} title="Register" />
                            <ButtonComp 
                                variant="contained" 
                                handleClick={handleShowClose} 
                                title="Cancel" 
                                color="secondary" 
                            />
                        </>
                    )}
                </Box>
            </form>
        </Box>
    )
}

export default StudentsRegisterAndEdit