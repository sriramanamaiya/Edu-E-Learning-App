import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'https://dct-e-learning.herokuapp.com/api'

const startStudentRegister = (data, redirect) => {
    return (dispatch) => {
        axios.post(`${baseUrl}/admin/students`, data , {
            headers : {
                "Authorization" : localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                if( result.hasOwnProperty('message') ){
                    dispatch(studentsAuthErrors(result.errors))
                }else{
                    if( result.hasOwnProperty('errors') ){
                        dispatch(studentsAuthErrors(result))
                    }else{
                        dispatch(registeredStudents(result))
                        redirect()
                    }
                }
            })
            .catch((error) => {
                Swal.fire(error.message)
            })
    }
}

const studentsAuthErrors = (data) => {
    return {
        type : 'STUDENT-AUTH-ERRORS',
        payload : data
    }
}

const registeredStudents = (data) => {
    return {
        type : 'REGISTERED-STUDENT',
        payload : data
    }
}

const allStudents = (data) => {
    return {
        type : 'ALL-STUDENTS',
        payload : data
    }
}

const startEditStudent = (id,data, handleClose) => {
    return (dispatch) => {
        axios.put(`${baseUrl}/students/${id}`, data, {
            headers : {
                "Authorization" : localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                if( result.hasOwnProperty('message') ){
                    dispatch(studentsAuthErrors(result.errors))
                }else{
                    if( result.hasOwnProperty('errors') ){
                        dispatch(studentsAuthErrors(result))
                    }else{
                        dispatch(editedStudentDetails(result))
                        handleClose()
                    }
                }
            })
            .catch((error) => {
                Swal.fire(error.message)
            })
    }
}

const editedStudentDetails = (data) => {
    return {
        type : 'EDITED-STUDENT-DETAILS',
        payload : data
    }
}

const startDeleteStudent = (id)  => {
    return (dispatch) => {
        axios.delete(`${baseUrl}/admin/students/${id}`, {
            headers : {
                "Authorization" : localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(deleteStudent(result))
            })
            .catch((error) => {
                Swal.fire(error.message)
            })
    }
}

const deleteStudent = (data) => {
    return {
        type : 'DELETE-STUDENT',
        payload : data
    }
}

const startGetStudentInfo = (id) => {
    return (dispatch) => {
        axios.get(`${baseUrl}/students/${id}`, {
            headers : {
                "Authorization" : localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(editedStudentDetails(result))
            })
            .catch((error) => {
                Swal.fire(error.message)
            })
    }
    
}

export { startStudentRegister, studentsAuthErrors, startEditStudent, startDeleteStudent, 
    startGetStudentInfo, allStudents }