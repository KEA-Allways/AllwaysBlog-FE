import ManageTopSideBar from "../../components/TopSidebar/ManageTopSideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate,useParams } from 'react-router-dom';
import { CommonButton } from '../../common';
import styled from "@emotion/styled";
import Paging from '../../components/Paging/Paging';
import { TokenAxios } from '../../lib/TokenAxios';

const SmallButton = styled(CommonButton)`
    background-color:white;
    color:black;
    width: 40px;
    height: 40px;
    border: 1px solid black;
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
    const [hideList, setHideList] = useState(Array(lists.length).fill(false));
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const page =1;
    const itemsPerPage = 5; // 한 페이지에 보여질 아이템 수
    const userSeq = localStorage.getItem("userSeq");
    const navigate = useNavigate();

    const apiGetCategories = async() => {
        try{
            // const res =await TokenAxios.get(`/api/post?page=${page}&size=${itemsPerPage}`);
            const res =await TokenAxios.get(`/api/template?page=${page}&size=${itemsPerPage}`);
            setLists(res.data.result.data)
            console.log(res);
            
            // setLists(res.data.result.data.content)
        }
        catch(e){
            console.error('API GET request error:', e);
        }
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
    const params = useParams();
    const HeaderTitle = "템플릿 관리";
    const HeaderButton = "템플릿 추가";

    const headerButtonClicked = () => {
        navigate('/template', { state: { postSeq: undefined, templateSeq: 0 } });
    };
    const addButtonClicked = () => {
        navigate(`/template/edit`, { state: { postSeq: undefined, templateSeq: 0 } });
    }

    const editButtonClicked = (templateSeq) => {
        navigate(`/template/edit/${templateSeq}`, { state: { postSeq: undefined, templateSeq: templateSeq } });
    }
    

    // 페이지네이션 관련
    const totalItems = lists.length; // 전체 아이템 수
    const startIndex = (currentPage - 1) * itemsPerPage; // 현재 페이지의 첫 아이템 인덱스
    const endIndex = startIndex + itemsPerPage; // 현재 페이지의 마지막 아이템 인덱스
    const displayedLists = lists.slice(startIndex, endIndex); // 현재 페이지에 보여줄 아이템들

    const handlePageChange = (page) => {
        setCurrentPage(page); // 페이지가 변경되면 현재 페이지를 업데이트
    };

    return (
        <div>
            <ManageTopSideBar HeaderTitle={HeaderTitle} HeaderButton={HeaderButton} HeaderAction={addButtonClicked} Container={
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
                                {console.log(lists)}
                                {lists.map((row, idx) => {
                                    return (
                                    <TableRow
                                        key={row.templateSeq}
                                        style={{height:'80px'}}
                                        onMouseEnter={() => mouseOn(idx)} onMouseLeave={() => mouseOff(idx)}
                                    >
                                        <TableCell align="center">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell align="left" colSpan={1}>
                                            {row.templateTitle}
                                        </TableCell>
                                        <TableCell align="right">
                                            {hideList[idx] && (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <SmallButton onClick={ () => editButtonClicked(lists[idx].templateSeq)}>수정</SmallButton>
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
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <Paging
                            activePage={currentPage}
                            totalItemsCount={totalItems}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
                
            } />
        </div>
    )
}

export default MngtTemplate;