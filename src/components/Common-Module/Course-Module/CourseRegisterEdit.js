import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material'

import { startCreateCourse, startEditCourse, courseErrors } from '../../../actions/courseAction'

import InputField from '../../Reusable-Comp/InputField'
import ButtonComp from '../../Reusable-Comp/ButtonComp'
import Heading from '../../Reusable-Comp/Heading'
import DatePickerComp from './DatePicker'

const CourseRegisterEdit = (props) => {
    const { handleShowClose, _id, name, description, duration, releaseDate, category, validity, level, 
        author } = props

    const dispatch = useDispatch()

    const error = useSelector((state) => {
        return state.courses.errors
    })

    const courseCategory = ['HTML', 'CSS', 'javascript', 'reactjs', 'nodejs','expressjs', 'mongodb']

    useEffect(() => {
        if( _id ){
            setValues({
                name,
                description,
                duration,
                releaseDate : '',
                category,
                validity,
                level,
                author
            })
        }

        return () => {
            dispatch(courseErrors({}))
        }
    },[])
    
    useEffect(() => {
        setErrors(error)
    },[error])

    const validationSchema = yup.object({
        name : yup.string().required('Required'),
        description : yup.string().required('Required'),
        duration : yup.number().required('Required'),
        category : yup.string().required('Required'),
        validity : yup.string().required('Required'),
        level : yup.string().required('Please select Levels'),
        author : yup.string().required('Please write author name')
    })

    const { values, setValues, handleChange, handleSubmit, errors, setErrors, touched, handleBlur } = useFormik({
        initialValues :{
            name : '',
            description : '',
            duration : '',
            releaseDate : '',
            category : '',
            validity : '',
            level : '',
            author: ''  
        },
        validationSchema,
        validateOnChange : false,
        onSubmit : (values) => {
            if(_id){
                dispatch(startEditCourse(_id,values,handleShowClose))
            }else{
                dispatch(startCreateCourse(values, handleShowClose))
            }
        }
    })

    const handleDatePicker = (date) => {
        setValues({ ...values, releaseDate : date })
    }

    return (
        <Grid container sx={{flexGrow : 1}} justifyContent="center" >
            <form onSubmit={handleSubmit}>
                { _id ? (
                    <Heading type="h3" title="Edit ur Course"  /> 
                    ) : (
                    <Heading type="h3" title="Create Course Here 📖"  />
                )}

                <Typography variant="body2" sx={{textAlign : 'left'}} >Add Course Details:</Typography>
                <InputField 
                    label="Course Name" 
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
                    label="Description" 
                    name="description" 
                    value={values.description} 
                    handleChange={handleChange} 
                    handleBlur={handleBlur}
                    error={errors.description && touched.description ? true : false } 
                    helperText = { touched.description && errors.description ? errors.description : ''} 
                    margin="normal" 
                    size="small" 
                    required={true}
                />

                <InputField 
                    label="Duration" 
                    name="duration" 
                    type="number"
                    value={values.duration} 
                    handleChange={handleChange} 
                    handleBlur={handleBlur}
                    error={errors.duration && touched.duration ? true : false } 
                    helperText = { touched.duration && errors.duration ? errors.duration : ''} 
                    margin="normal" 
                    size="small" 
                    required={true}
                />

                <TextField 
                    sx={{width : '100%'}} 
                    margin="normal"  
                    required 
                    name="category" 
                    size="small" 
                    label="Select Course Category"
                    error={errors.category && touched.category ? true : false }  
                    helperText={ touched.category && errors.category ? errors.category : ''} 
                    select 
                    value={values.category}
                    onBlur={handleBlur} 
                    onChange={handleChange}
                >
                    { courseCategory.map((course) => {
                        return (
                            <MenuItem key={course} value={course}>{course}</MenuItem>
                        )
                    }) }
                </TextField>

                <InputField 
                    label="Validity" 
                    name="validity" 
                    type="number"
                    value={values.validity} 
                    handleChange={handleChange} 
                    handleBlur={handleBlur}
                    error={errors.validity && touched.validity ? true : false } 
                    helperText = { touched.validity && errors.validity ? errors.validity : ''} 
                    margin="normal" 
                    size="small" 
                    required={true}
                />

                <TextField 
                    sx={{width : '100%'}} 
                    margin="normal"  
                    required 
                    name="level" 
                    size="small" 
                    label="Select Course Level"
                    error={errors.level && touched.level ? true : false }  
                    helperText={ touched.level && errors.level ? errors.level : ''} 
                    select value={values.level}
                    onBlur={handleBlur}  
                    onChange={handleChange}
                >
                    <MenuItem value="beginner">Beginner</MenuItem>
                    <MenuItem value="intermediate">Intermediate</MenuItem>
                    <MenuItem value="expert">Expert</MenuItem>
                </TextField>

                <InputField 
                    label="Author*" 
                    name="author" 
                    value={values.author} 
                    handleChange={handleChange} 
                    handleBlur={handleBlur}
                    error={errors.author && touched.author ? true : false } 
                    helperText = { touched.author && errors.author ? errors.author : ''} 
                    margin="normal" 
                    size="small" 
                />

                <DatePickerComp value={values.releaseDate} handleDatePicker={handleDatePicker} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt : 1 }}>
                    { _id ? (
                        <>
                            <ButtonComp variant="contained" handleClick={handleSubmit} title="Update" />
                            <ButtonComp 
                                variant="contained" 
                                handleClick={handleShowClose} 
                                title="Cancel" 
                                color="secondary" 
                            />
                        </>
                    ) : (
                        <>
                            <ButtonComp variant="contained" handleClick={handleSubmit} title="Create" />
                            <ButtonComp 
                                variant="contained" 
                                handleClick={handleShowClose} 
                                title="Cancel" 
                                color="secondary" 
                            />
                        </>
                    ) }
                </Box>
            </form>
        </Grid>
    )
}

export default CourseRegisterEdit