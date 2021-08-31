import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {UserReducer} from './UserReducer'
import {FileReducer} from './FileReducer'
import {UploadReducer} from './UploadReducer'
import {AppReducer} from './AppReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    file: FileReducer,
    uploader: UploadReducer,
    app: AppReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))