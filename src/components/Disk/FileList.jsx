import './Transition.css'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import React from 'react';
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import {File} from './File'

const FileListWrapper = styled.div`
  margin: 20px 0;

`
const FileListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr repeat(4, 1fr);
  font-size: 20px;
`
const FileListName = styled.div`
  grid-column-start: 2;

`
const FileListDate = styled.div`
  grid-column-start: 5;
  justify-self: center;
`
const FileListSize = styled.div`
  grid-column-start: 6;
  justify-self: center;
`
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: rgba(0, 0, 0, .5);
  margin-top: 50px;
`
const Plate = styled.div`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
`


export const FileList = () => {
    const files = useSelector(state => state.file.files)
    const view = useSelector(state => state.file.view)

    if (!files.length) {
        return (
            <Title>
                <p className={'qwe'}>Папка пуста...</p>
            </Title>
        )
    }
    if (view === 'list') {
        return (
            <FileListWrapper>
                <FileListHeader>
                    <FileListName>Название файла:</FileListName>
                    <FileListDate>Дата создания:</FileListDate>
                    <FileListSize>Размер файла:</FileListSize>
                </FileListHeader>

                <TransitionGroup>
                    {files.map(el =>
                        <CSSTransition
                            timeout={1000}
                            classNames='file'
                            exit={true}
                            key={el._id}
                        >
                            <File file={el}/>
                        </CSSTransition>
                    )}
                </TransitionGroup>

            </FileListWrapper>
        );
    }
    if (view === 'plate') {
        return (
            <Plate>
                {files.map(el => <File key={el._id} file={el}/>)}
            </Plate>
        )
    }
}
