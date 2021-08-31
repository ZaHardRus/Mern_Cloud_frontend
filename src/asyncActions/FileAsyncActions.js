import axios from "axios";
import {setFilesAC, addFileAC, deleteFileAC} from '../reducers/FileReducer'
import {showUploaderAC, addUploadAC, changePercentAC} from '../reducers/UploadReducer'
import {hideLoaderAC, showLoaderAC} from "../reducers/AppReducer";

export const getFiles = (dirId, sort) => async (dispatch) => {
    try {
        dispatch(showLoaderAC())
        let url = `http://localhost:5000/api/files`
        if (dirId) {
            url = `http://localhost:5000/api/files?parent=${dirId}`
        }
        if (sort) {
            url = `http://localhost:5000/api/files?sort=${sort}`
        }
        if (dirId && sort) {
            url = `http://localhost:5000/api/files?parent=${dirId}&sort=${sort}`
        }
        const response = await axios.get(url, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        dispatch(setFilesAC(response.data))
    } catch (error) {
        console.log('getFilesAction', error)
    } finally {
        dispatch(hideLoaderAC())
    }
}

export const createDir = (dirId, name) => async (dispatch) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/files`, {
            name,
            parent: dirId,
            type: 'dir'
        }, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        dispatch(addFileAC(response.data))
    } catch (e) {
        console.log(e.response.data.message)
    }
}

export const uploadFile = (file, dirId) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('file', file)
        if (dirId) {
            formData.append('parent', dirId)
        }
        const uploadFile = {name: file.name, progress: 0, id: Date.now()}
        dispatch(showUploaderAC());
        dispatch(addUploadAC(uploadFile))
        const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            onUploadProgress: progressEvent => {
                const totalLength = progressEvent.lengthComputable
                    ? progressEvent.total
                    : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                if (totalLength) {
                    uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                    dispatch(changePercentAC(uploadFile))
                }
            }
        })
        dispatch(addFileAC(response.data))
    } catch (e) {
        console.log(e.response.data.message)
    }
}

export async function downloadFile(file) {
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export const deleteFile = (file) => async (dispatch) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(deleteFileAC(file._id))
        alert((response.data.message))
    } catch (e) {
        console.log(e, 789)
    }
}

export const searchFiles = (search) => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/files/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFilesAC(response.data))
        } catch (e) {
            alert(e?.response?.data?.message)
        } finally {
            dispatch(hideLoaderAC())
        }
    }
}