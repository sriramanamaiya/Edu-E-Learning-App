import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import EditModal from '../../Reusable-Comp/EditModal'
import CreateLectures from './CreateLectures'

const LecturesHeader = (props) => {
    const { findCourse, courseId, lecturesData } = props
    const [ show, setShow ] = useState(false)

    const handleClick = () => {
        setShow(true)
    }

    const handleShowClose = () => {
        setShow(false)
    }

    return (
        <>
            { findCourse && (
                <>
                    <Typography variant="h5">{findCourse.name}</Typography>
                    { lecturesData.length > 0 && (
                        <>
                            <Link to="#" onClick={handleClick} >Create Lecture here</Link>
                            <EditModal 
                                show={show} 
                                handleShowClose={handleShowClose} 
                                component={<CreateLectures id={courseId} handleShowClose={handleShowClose} />} />
                        </>
                    ) }
                </>
            ) }
        </>
    )
}

export default LecturesHeader