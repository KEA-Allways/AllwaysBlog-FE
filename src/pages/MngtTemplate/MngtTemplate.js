import ManageTopSideBar from "../../components/TopSidebar/ManageTopSideBar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { CommonButton, PlusButton } from '../../common';
import styled from "@emotion/styled";
import Paging from '../../components/Paging/Paging';


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

const MngtTemplate = () => {

    const [lists, setLists] = useState([]);
    const length = lists.length;
    const [hideList, setHideList] = useState(Array(lists.length).fill(false));
    const navigate = useNavigate();
    const [checkItems, setCheckItems] = useState([]);
    const templateSeq = useRef(length);

    const apiGetCategories = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/templates`)
          .then((response) => {
            setLists(response.data.templates);
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

    const HeaderTitle = "템플릿 관리";
    const HeaderButton = "템플릿 추가";
    const headerButtonClicked = () => {
        navigate('/post', { state: { postSeq: 0 } });
    };
    

    // // 체크박스 단일 선택
    // const handleSingleCheck = (checked, id) => {
    //     if (checked) {
    //     // 단일 선택 시 체크된 아이템을 배열에 추가
    //     setCheckItems(prev => [...prev, id]);
    //     } else {
    //     // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
    //     setCheckItems(checkItems.filter((el) => el !== id));
    //     }
    // };

    // // 체크박스 전체 선택
    // const handleAllCheck = (checked) => {
    //     if(checked) {
    //     // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
    //     const idArray = [];
    //     lists.forEach((el) => idArray.push(el.templateSeq));
    //     setCheckItems(idArray);
    //     }
    //     else {
    //     // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
    //     setCheckItems([]);
    //     }
    // }

    const handleAddTemplate = () => {
          const templateName = prompt("새로 추가할 템플릿 이름을 입력하세요")
          if(templateName !== null && templateName !== ""){
            templateSeq.current += 1;
            const newTemplate = {
              templateSeq : templateSeq.current, 
              templateName: templateName,
            };
            setLists([...lists, newTemplate]);
          }
    }

    const handleDeleteTemplate = (idx) => {
        setLists((prevLists) => prevLists.filter((_, index) => index !== idx));
    }

    return (
        
        <div>
            <ManageTopSideBar HeaderTitle={HeaderTitle} HeaderButton={HeaderButton} HeaderAction={headerButtonClicked} Container={
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ width: '10%'}}>번호</TableCell>
                                    <TableCell align="center" sx={{ width: '70%'}} colSpan={1}>템플릿</TableCell>
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
                                            {row.templateName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {hideList[idx] && (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <SmallButton>수정</SmallButton>
                                                    <SmallButton onClick={() => handleDeleteTemplate(idx)}>삭제</SmallButton>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <Paging />
                    </div>
                </div>
                
            } />
            
        </div>
    )
}

export default MngtTemplate;
