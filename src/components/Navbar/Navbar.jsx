import React from 'react';
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {logoutAC} from '../../reducers/UserReducer'
import {searchFiles, getFiles} from '../../asyncActions/FileAsyncActions';
import {showLoaderAC} from '../../reducers/AppReducer';
import avatarLogo from '../../assets/image/avatar.png';
import logo from '../../assets/image/logo.png';

const NavbarWrapper = styled.div`
  width: 100%;
  background-color: #3b6ec0;
  border-radius: 0 0 10px 10px;
`
const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #566885;
  padding: 13px 10px;
`

const Logo = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  color: #fff;
`
const AuthGroup = styled.div`
  display: flex;
  font-size: 20px;
  line-height: 23px;
  align-items: center;
  gap: 30px;
  color: #e1e6ec;
`
const Button = styled.button`
  border-radius: 12px;
  padding: 7px 25px;
  background-color: #e1e6ec;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  color: #3b6ec0;
  transition: .3s;
  cursor: pointer;

  :hover {
    background-color: #fff;
    color: #566885;
  }
`
const Input = styled.input`
  display: flex;
  align-items: center;
  border: none;
  border-bottom: 3px solid #e1e6ec;
  background: transparent;
  width: 30%;
  padding: 3px;
  font-size: 18px;
  line-height: 21px;
  color: #e1e6ec;

  :focus {
    outline: none;
    transform: scale(1.01);
  }
;

  ::placeholder {
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #e1e6ec;
  }
`
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const Lik = styled.p`
  color: #fff;
  font-weight: bold;
  font-size: 24px;
`


export const Navbar = () => {
    const [searchStr, setSearchStr] = React.useState('')
    const [searchTimeout, setSearchTimeout] = React.useState(0)

    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.file.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    const avatar = currentUser.avatar ? `http://localhost:5000/${currentUser.avatar}` : avatarLogo

    function searchHandler(e) {
        setSearchStr(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoaderAC())
        if (e.target.value !== '') {
            setSearchTimeout(setTimeout(() => {
                dispatch(searchFiles(e.target.value));
            }, 500))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <NavbarWrapper>
            <NavbarContainer className="container">
                <NavLink style={{textDecoration: 'none'}} to='/' exact>
                    <Logo>
                        <img src={logo} width={70} height={50} alt="logo"/>
                        <h2>MERN CLOUD</h2>
                    </Logo>
                </NavLink>
                {isAuth && <Input
                    value={searchStr}
                    onChange={e => searchHandler(e)}
                    className='navbar__search'
                    type="text"
                    placeholder="Название файла..."/>}
                {isAuth
                    ? <AuthGroup>
                        <Button onClick={() => dispatch(logoutAC())}>Выйти</Button>
                        <NavLink to='/profile'> <Avatar src={avatar}/></NavLink>
                    </AuthGroup>

                    : <AuthGroup>

                        <NavLink to='/login'>
                            <Lik>Войти</Lik>
                        </NavLink>

                        <NavLink to='/registration'>
                            <Lik>Регистрация</Lik>
                        </NavLink>

                    </AuthGroup>}
            </NavbarContainer>
        </NavbarWrapper>
    );
}

