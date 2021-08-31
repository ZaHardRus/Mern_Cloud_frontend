import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {pushToStackAC, setCurrentDirAC} from '../../reducers/FileReducer';
import {downloadFile, deleteFile} from '../../asyncActions/FileAsyncActions';
import {FormatSize} from '../../utils/FormatSize'
import fileLogo from '../../assets/image/file.svg'
import folderLogo from '../../assets/image/folder.svg'

const FileWrapper = styled.div`
  margin: 10px 0;
  border-bottom: 1px solid #3b6ec0;
  display: grid;
  grid-template-columns: 1fr 4fr repeat(4, 1fr);
  font-size: 20px;
  align-items: center;
  transition: .3s;
  flex-basis: 50%;

  :hover {
    transform: scale(1.01);
    .filedate {
      grid-column-start: 3;
    }
    .filesize {
      grid-column-start: 4;
    }
    .btn-download {
      display: block;
      grid-column-start: 5;
    }
    .btn-delete {
      display: block;
      grid-column-start: 6;
    }
  }

  .btn {
    display: none;
  }
`
const FileName = styled.div`
  font-size: 20px;
  font-weight: bold;
`

const FileDate = styled.div`
  grid-column-start: 5;
  justify-self: center;
`
const FileSize = styled.div`
  grid-column-start: 6;
  justify-self: center;
`
const Img = styled.img`
  justify-self: center;
`
const ButtonDownload = styled.button`
  background-color: #3b6ec0;
  color: #e1e6ec;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  transition: .3s;

  :hover {
    background-color: #e1e6ec;
    color: #3b6ec0;
  }
`
const ButtonDelete = styled.button`
  background-color: #3b6ec0;
  color: #e1e6ec;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  transition: .3s;

  :hover {
    background-color: #e1e6ec;
    color: #3b6ec0;
  }
`
const PlateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  gap: 15px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  min-width: 25%;

  :hover {
    .active {
      visibility: visible;
      display: flex;
    }
  }
`
const ButtonDeletePlate = styled.button`
  background-color: #3b6ec0;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;

  :hover {
    transition: .3s;
    background-color: #e1e6ec;
    color: #3b6ec0;
  }
`
const ButtonDownloadPlate = styled.button`
  background-color: #3b6ec0;
  color: #fff;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;

  :hover {
    transition: .3s;
    background-color: #e1e6ec;
    color: #3b6ec0;
  }
`
const ButtonWrapper = styled.div`
  gap: 10px;
  visibility: hidden;
`

export const File = ({file}) => {
    const view = useSelector(state => state.file.view)
    const currentDir = useSelector(state => state.file.currentDir)

    const dispatch = useDispatch()

    const openDirHandler = () => {
        if (file.type === 'dir') {
            dispatch(pushToStackAC(currentDir))
            dispatch(setCurrentDirAC(file._id))
        }
    }
    const downloadHandler = (e) => {
        e.stopPropagation()
        downloadFile(file)
    }

    const deleteHandler = (e) => {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    if (view === 'list') {
        return (
            <FileWrapper onClick={() => openDirHandler()}>
                <Img src={file.type === 'dir' ? folderLogo : fileLogo} alt=""/>
                <FileName className="filename">{file.name}</FileName>
                <FileDate className="filedate">{file.date.slice(0, 10)}</FileDate>
                <FileSize className="filesize">{FormatSize(file.size)}</FileSize>

                {file.type !== 'dir' && <ButtonDownload onClick={(e) => downloadHandler(e)}
                                                        className="btn btn-download">Download</ButtonDownload>}
                <ButtonDelete onClick={(e) => deleteHandler(e)} className="btn btn-delete">Delete</ButtonDelete>
            </FileWrapper>
        );
    }
    if (view === 'plate') {
        return (
            <PlateWrapper onClick={() => openDirHandler()}>
                <Img src={file.type === 'dir' ? folderLogo : fileLogo} alt=""/>
                <FileName>{file.name}</FileName>
                <ButtonWrapper className={'active'}>
                    {file.type !== 'dir' && <ButtonDownloadPlate onClick={(e) => downloadHandler(e)}
                                                                 className="btn btn-download">Download</ButtonDownloadPlate>}
                    <ButtonDeletePlate onClick={(e) => deleteHandler(e)}
                                       className="btn btn-delete">Delete</ButtonDeletePlate>
                </ButtonWrapper>
            </PlateWrapper>
        )
    }
}
