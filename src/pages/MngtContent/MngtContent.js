import ManageTopSideBar from '../../components/TopSidebar/ManageTopSideBar';
import { useState, useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import TextStyles from "../../components/Text.module.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { CommonButton } from '../../common';
import styled from "@emotion/styled";

const SmallButton = styled(CommonButton)`
    background-color:white;
    color:black;
    width: 40px;
    height: 40px;
    border-color:black;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    margin-right: 10px;
    border-radius: 5px;

    &:hover {
    color: #fff;
    background: black;
    }
`

const MngtContents = () => {

    const [lists, setLists] = useState([]);
    const [hideList, setHideList] = useState(Array(lists.length).fill(false));
    const [checkItems, setCheckItems] = useState([]);
    const [selected, setSelected] = React.useState([]);
    const navigate = useNavigate();

    const apiGetCategories = () => {
        axios.get('http://private-bc2ca0-bee3083.apiary-mock.com/api/posts/1/1')
          .then((response) => {
            setLists(response.data.posts);
            console.log(lists)
          })
          .catch((error) => {
            console.error('API GET request error:', error);
          });
    };

    const setRowHideState = (idx, value) => {
        const updatedHideList = [];
        updatedHideList[idx] = value;
        setHideList(updatedHideList);
    };

    const mouseOn = (idx) => {
        setRowHideState(idx, true);
    }
    const mouseOff = (idx) => {
        setRowHideState(idx, false);
    }

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 요청을 보냅니다.
        apiGetCategories();
    }, []);

    

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
        // 단일 선택 시 체크된 아이템을 배열에 추가
        setCheckItems(prev => [...prev, id]);
        } else {
        // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
        setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if(checked) {
        // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
        const idArray = [];
        lists.forEach((el) => idArray.push(el.postSeq));
        setCheckItems(idArray);
        }
        else {
        // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
        setCheckItems([]);
        }
    }

    const editButtonClicked = (postSeq) => {
        // postSeq를 가지고 /post 페이지로 이동
        navigate('/post', { state: { postSeq: postSeq } });
    };
    
    const HeaderTitle = "글 관리";
    const HeaderButton = "글쓰기";

    return (
        <div>
            <ManageTopSideBar HeaderTitle={HeaderTitle} HeaderButton={HeaderButton} Container={
                <div>
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ width: '10%'}}>번호</TableCell>
                                        <TableCell align="center" sx={{ width: '70%'}} colSpan={1}>제목</TableCell>
                                        <TableCell align="center" sx={{ width: '20%'}}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lists.map((row, idx) => {

                                        return (
                                        <TableRow
                                            key={row.themeSeq}
                                            style={{height:'70px'}}
                                            onMouseEnter={() => mouseOn(idx)} onMouseLeave={() => mouseOff(idx)}
                                        >
                                            <TableCell align="center">
                                                {idx + 1}
                                            </TableCell>
                                            <TableCell align="left" colSpan={1}>
                                                <p style={{ margin: '0'}}>{row.name}</p>
                                                <p style={{ margin: '0'}}>{row.themeName}/{row.ListName} | {row.nickname} | {row.postDate}</p>
                                            </TableCell>
                                            <TableCell align="right">
                                                {hideList[idx] && (
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <SmallButton>수정</SmallButton>
                                                        <SmallButton>삭제</SmallButton>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                        <Pagination count={10} variant="outlined" shape="rounded" />
                    </div>
                    
                </div>
            } />
        </div>
    )
}

export default MngtContents;
