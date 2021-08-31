import React from 'react';
import {useDispatch} from 'react-redux';
import styled from "styled-components";
import {deleteAvatar, uploadAvatar} from '../../asyncActions/UserAsyncActions';

const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  gap: 30px;
`
const Label = styled.label`
  width: 300px;
  font-size: 16px;
  font-weight: bold;
  border: 2px dashed #3b6ec0;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3b6ec0;
  transition: .3s;
  border-radius: 20px;

  :hover {
    background-color: #fff;
    color: #3b6ec0;
    border: 2px dashed #3b6ec0;
  }
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
  display: none;
`

export const Profile = () => {
    const dispatch = useDispatch()

    const uploadAvatarHandler = (e) => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <EditWrapper>
            <Button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</Button>
            <Label htmlFor={'profile-avatar'}>
                Загрузить аватар профиля
            </Label>
            <Input id={'profile-avatar'} accept='image/*' onChange={(e) => uploadAvatarHandler(e)} type="file"/>
        </EditWrapper>
    );
}
