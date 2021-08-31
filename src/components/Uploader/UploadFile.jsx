import React from 'react';
import styled from 'styled-components';
import {removeUploadAC} from '../../reducers/UploadReducer';
import {useDispatch} from 'react-redux';

const FileWrapper = styled.div`
  background-color: #e1e6ec;
  margin: 10px 0;
  border-radius: 8px;
  padding: 3px;
`
const FileHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const FileName = styled.div`
  color: #3b6ec0;
  font-size: 16px;
  text-overflow: ellipsis;
  outline: none;
`
const RemoveUpload = styled.button`
  width: 20px;
  height: 20px;
  color: #3b6ec0;
  border-radius: 7px;
  border: 0px;
  transition: .3s;
  :hover {
    background-color: #3b6ec0;
    color: #e1e6ec;
  }
`

const ProgressBar = styled.div`
  height: 1rem;
  border-radius: 18px;
  background-color: #3b6ec0;
  display: flex;
  margin: 3px 0;
`
const UploadBar = styled.div`
  border-radius: 8px;
  background-color: #5b91e7;
`

const Percent = styled.div`
  color: #e1e6ec;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

export const UploadFile = ({file}) => {
    const dispatch = useDispatch()
    return (
        <FileWrapper>
            <FileHeader>
                <FileName title={file.name} style={{maxWidth: '75%'}}>{
                    file.name.split('.')[0].slice(0, 19)
                    + '...'
                    + file.name.split('.').pop()}</FileName>
                <RemoveUpload onClick={() => dispatch(removeUploadAC(file.id))}>x</RemoveUpload>
            </FileHeader>

            <ProgressBar>
                <UploadBar style={{width: file.progress + "%"}}/>
                <Percent>{file.progress}%</Percent>
            </ProgressBar>
        </FileWrapper>
    );
}