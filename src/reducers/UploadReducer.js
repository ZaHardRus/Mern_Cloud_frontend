const SHOW_UPLOADER = "SHOW_UPLOADER"
const HIDE_UPLOADER = "HIDE_UPLOADER"
const ADD_UPLOAD_FILE = "ADD_UPLOAD_FILE"
const REMOVE_UPLOAD_FILE = "REMOVE_UPLOAD_FILE"
const CHANGE_PERCENT = "CHANGE_PERCENT"

const initialState = {
    isVisible: false,
    files: []
}

export const UploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_UPLOADER:
            return {...state, isVisible: true};
        case HIDE_UPLOADER:
            return {...state, isVisible: false};

        case ADD_UPLOAD_FILE:
            return {...state, files: [...state.files, {...action.payload}]}
        case REMOVE_UPLOAD_FILE:
            return {...state, files: [...state.files.filter(el => el.id !== action.payload)]}
        case CHANGE_PERCENT:
            return {
                ...state,
                files: [...state.files.map(el => el.id === action.payload.id
                    ? {...el, progress: action.payload.progress}
                    : {...el}
                )]
            }
        default:
            return state
    }
}


export const showUploaderAC = () => ({type: SHOW_UPLOADER})
export const hideUploaderAC = () => ({type: HIDE_UPLOADER})

export const addUploadAC = (file) => ({type: ADD_UPLOAD_FILE, payload: file})
export const removeUploadAC = (fileId) => ({type: REMOVE_UPLOAD_FILE, payload: fileId})

export const changePercentAC = (payload) => ({type: CHANGE_PERCENT, payload})