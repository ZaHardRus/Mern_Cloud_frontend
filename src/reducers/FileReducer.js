const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const ADD_FILE = 'ADD_FILE';
const PUSH_TO_STACK = 'PUSH_TO_STACK';
const DELETE_FILE = 'DELETE_FILE';
const SET_VIEW = 'SET_VIEW';


const initialState = {
    files: [],
    currentDir: null,
    dirStack: [],
    view: 'list',
}

export const FileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILES:
            return {...state, files: action.payload};
        case SET_CURRENT_DIR:
            return {...state, currentDir: action.payload};
        case ADD_FILE:
            return {...state, files: [...state.files, action.payload]}
        case PUSH_TO_STACK:
            return {...state, dirStack: [...state.dirStack, action.payload]}
        case DELETE_FILE:
            return {...state, files: [...state.files.filter(file => file._id !== action.payload)]}
        case SET_VIEW:
            return {...state, view: action.payload};
        default:
            return state
    }
}

export const setFilesAC = (files) => ({type: SET_FILES, payload: files})
export const setCurrentDirAC = (dir) => ({type: SET_CURRENT_DIR, payload: dir})
export const addFileAC = (file) => ({type: ADD_FILE, payload: file})
export const pushToStackAC = (dir) => ({type: PUSH_TO_STACK, payload: dir})
export const deleteFileAC = (dirId) => ({type: DELETE_FILE, payload: dirId})
export const setViewAC = (view) => ({type: SET_VIEW, payload: view})