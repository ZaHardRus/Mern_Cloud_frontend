import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import {UploadFile} from './UploadFile';
import {hideUploaderAC} from '../../reducers/UploadReducer'

const UploaderWrapper = styled.div`
  height: 300px;
  width: 300px;
  position: fixed;
  background-color: #3b6ec0;
  bottom: 0;
  right: 0;
  padding: 20px;
  border-radius: 16px 0 0 16px;
  overflow-y: auto;
`
const UploaderHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const UploaderTitle = styled.div`
  color: #e1e6ec;
  font-size: 24px;
`
const UploaderClose = styled.button`
  width: 25px;
  height: 25px;
  color: #3b6ec0;
  background-color: #e1e6ec;
  border-radius: 7px;
  border: 0px;
  transition: .3s;
  :hover {
    color: #e1e6ec;
    background-color: #3b6ec0;
    border: 1px solid #e1e6ec;
  }
`

export const Uploader = () => {
    const files = useSelector(state => state.uploader.files)
    const isVisible = useSelector(state => state.uploader.isVisible)
    const dispatch = useDispatch()
    return (
        isVisible &&
        <UploaderWrapper>
            <UploaderHeader>
                <UploaderTitle>Загрузки</UploaderTitle>
                <UploaderClose onClick={() => dispatch(hideUploaderAC())}>X</UploaderClose>
            </UploaderHeader>
            {files.map(el => <UploadFile key={el.id} file={el}/>)}
        </UploaderWrapper>
    );
}
