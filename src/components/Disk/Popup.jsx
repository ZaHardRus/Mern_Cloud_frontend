import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {createDir} from '../../asyncActions/FileAsyncActions'

const PopupWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, .5);
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PopupContent = styled.div`
  width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`
const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`
const PopupTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #3b6ec0;

`

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #3b6ec0;
  background: transparent;
  width: 100%;
  padding: 3px;
  font-size: 18px;
  line-height: 21px;
  color: #3b6ec0;
  margin-bottom: 30px;
  font-weight: 300;

  :focus {
    outline: none;
    transform: scale(1.01);
  }
;

  ::placeholder {
    font-weight: bold;
    font-size: 18px;
    line-height: 16px;
    color: #3b6ec0;
  }
`
const Button = styled.button`
  border-radius: 12px;
  min-width: 35px;
  min-height: 35px;
  background-color: #3b6ec0;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  color: #e1e6ec;
  transition: .3s;

  :hover {
    background-color: #e1e6ec;
    color: #3b6ec0;
  }
`

export const Popup = ({popupVisible, setPopupVisible}) => {
    const [dirName, setDirName] = useState('')
    const currentDir = useSelector(state => state.file.currentDir)
    const dispatch = useDispatch();

    const addNewFolder = () => {
        dispatch(createDir(currentDir, dirName))
        setPopupVisible(!popupVisible)
    }
    return (
        <PopupWrapper onClick={() => setPopupVisible(!popupVisible)}>
            <PopupContent onClick={e => e.stopPropagation()}>
                <PopupHeader>
                    <PopupTitle>
                        Создать новую папку
                    </PopupTitle>
                    <Button onClick={() => setPopupVisible(!popupVisible)}>
                        x
                    </Button>
                </PopupHeader>
                <Input
                    defaultValue={dirName}
                    onChange={e => setDirName(e.target.value)}
                    placeholder="Введите название папки..."
                />
                <Button onClick={addNewFolder}>Создать папку</Button>
            </PopupContent>
        </PopupWrapper>
    );
}

