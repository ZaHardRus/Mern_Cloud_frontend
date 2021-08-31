import axios from 'axios'
import {setUserAC} from "../reducers/UserReducer";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                email,
                password
            })
            dispatch(setUserAC(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/auth`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            dispatch(setUserAC(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            localStorage.removeItem('token')
            console.log(e.message)
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`http://localhost:5000/api/files/avatar`, formData,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUserAC(response.data))
        } catch (e) {
            localStorage.removeItem('token')
            console.log(e.message)
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/files/avatar`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUserAC(response.data))
        } catch (e) {
            localStorage.removeItem('token')
            console.log(e.message)
        }
    }
}