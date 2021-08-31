import './Transition.css'
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components'
import {FileList} from './FileList';
import {Popup} from './Popup';
import {Uploader} from '../Uploader/Uploader'
import {getFiles, uploadFile} from '../../asyncActions/FileAsyncActions';
import {setCurrentDirAC, setViewAC} from '../../reducers/FileReducer'
import ListLogo from '../../assets/image/list.svg'
import PlateLogo from '../../assets/image/morePlite.svg'

const DiskWrapper = styled.div`
  margin-top: 20px;
`

const DiskButtons = styled.div`
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  background-color: #3b6ec0;
  color: #fff;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  transition: .3s;
  cursor: pointer;

  :hover {
    background-color: #fff;
    color: #566885;
  }
`
const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  border: 2px dashed #3b6ec0;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3b6ec0;
  transition: .3s;
  cursor: pointer;

  :hover {
    background-color: #fff;
    color: #3b6ec0;
    border: 2px dashed #3b6ec0;
  }
`
const Input = styled.input`
  display: none;
`
const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`

const DropArea = styled.div`
  width: 100%;
  height: calc(100vh - 80px - 40px);
  margin: 20px;
  border: 3px dashed #566885;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3b6ec0;
  font-size: 36px;
`

const Select = styled.select`
  color: #3b6ec0;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  padding: 3px;
`

const SortBlock = styled.div`
  padding: 5px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
  background-color: #3b6ec0;
`
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const Plate = styled.button`
  background-image: url(${PlateLogo});
  height: 30px;
  width: 30px;
  outline: none;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  border: ${props => props.view === 'plate' ? '2px solid #3b6ec0' : 'transparent'};
`
const List = styled.button`
  background-image: url(${ListLogo});
  height: 30px;
  width: 30px;
  outline: none;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  border: ${props => props.view === 'list' ? '2px solid #3b6ec0' : 'transparent'};
`

export const Disk = () => {
    const [dragEnter, setDragEnter] = useState(false)
    const [popupVisible, setPopupVisible] = useState(false)
    const [sort, setSort] = useState('date')

    const currentDir = useSelector(state => state.file.currentDir)
    const dirStack = useSelector(state => state.file.dirStack)
    const loader = useSelector(state => state.app.loader)
    const view = useSelector(state => state.file.view)

    const dispatch = useDispatch()

    const openPopup = () => {
        setPopupVisible(!popupVisible)
    }

    const backClickHandler = () => {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDirAC(backDirId))
    }

    const uploadFileHandler = (e) => {
        const files = [...e.target.files]
        files.forEach(el => dispatch(uploadFile(el, currentDir)))
    }

    const dragEnterHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    const dragLeaveHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    const dropHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
        // eslint-disable-next-line
    }, [currentDir, sort]);

    if (loader) {
        return (
            <div className="loader-wrapper">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }
    return (
        !dragEnter
            ? <DiskWrapper onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <DiskButtons>
                    <ButtonContainer>
                        <Button onClick={() => backClickHandler()}>Назад</Button>
                        <Button onClick={() => openPopup()}>Создать папку</Button>
                        <SortBlock>
                            <h3>Сортировка:</h3>
                            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="name">По имени</option>
                                <option value="type">По типу</option>
                                <option value="date">По дате</option>
                            </Select>
                        </SortBlock>
                        <ButtonsWrapper>
                            <List view={view} onClick={() => dispatch(setViewAC('list'))}/>
                            <Plate view={view} onClick={() => dispatch(setViewAC('plate'))}/>
                        </ButtonsWrapper>
                    </ButtonContainer>

                    <ButtonContainer>
                        <Label htmlFor='fileInput'>Загрузить файл</Label>
                        <Input
                            multiple
                            id='fileInput'
                            type='file'
                            placeholder='Выбрать файл'
                            onChange={e => uploadFileHandler(e)}/>
                    </ButtonContainer>
                </DiskButtons>

                <FileList/>
                {popupVisible && <Popup popupVisible={popupVisible} setPopupVisible={setPopupVisible}/>}
                <Uploader/>
            </DiskWrapper>
            : <DropArea onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                        onDragOver={dragEnterHandler}>Перетащите файлы сюда</DropArea>
    );
}