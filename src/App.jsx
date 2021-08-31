import './App.css'
import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {Navbar} from './components/Navbar/Navbar';
import {Registration} from './components/Registration/Registration';
import {Login} from './components/Login/Login';
import {Disk} from './components/Disk/Disk';
import {Profile} from './components/Profile/Profile';
import {auth} from './asyncActions/UserAsyncActions'

const App = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    //useSelector(state => console.log(state))

    useEffect(() => {
        dispatch(auth())
        // eslint-disable-next-line
    }, [])

    return (
        <BrowserRouter>
            <div className="app">
                <Navbar/>
                <div className="container">
                    {!isAuth ?
                        <Switch>
                            <Route path="/registration" component={Registration}/>
                            <Route path="/login" component={Login}/>
                            <Redirect to='/'/>
                        </Switch>
                        : <Switch>
                            <Route exact path='/' component={Disk}/>
                            <Route exact path='/profile' component={Profile}/>
                            <Redirect to='/'/>
                        </Switch>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
