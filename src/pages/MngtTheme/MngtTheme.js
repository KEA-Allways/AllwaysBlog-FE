import ManageTopSideBar from '../../components/TopSidebar/ManageTopSideBar';
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../../components/Text.module.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CommonButton } from '../../common';
import styled from "@emotion/styled";
import Swal from "sweetalert2";
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
    border-radius: 5px;

    &:hover {
    color: #fff;
    background: black;
    }
`
const DeleteButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const MngtTheme = () => {
    const [themes, setThemes] = useState([]);
    const [lists, setLists] = useState([]);
    const [hideList, setHideList] = useState(Array(lists.length).fill(false));

    
    const apiGetCategories = async() => {
        try{
            const res =await TokenAxios.get(`/api/theme/22`);
             
            setThemes(res.data.result.data)
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

    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = idx => {
        dragItem.current = idx;
    };
    
    const dragEnter = idx => {
        dragOverItem.current = idx;
    };
    
    const drop = () => {
        const copyListItems = [...themes];
        const dragItemConotent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemConotent);
        dragItem.current = null;
        dragOverItem.current = null;
        setThemes(copyListItems);
    };

    const removeButtonClicked = (themeSeq) => {
        Swal.fire({
          title: "테마를 삭제 중입니다.",
          text: "삭제가 완료될 때까지 기다려주세요.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "삭제",
          cancelButtonText: "취소",
          allowOutsideClick: false,
           
        }).then((result) => {
          if (result.isConfirmed) {
            // User clicked "확인"
            TokenAxios.delete(`api/theme/${themeSeq}`)
              .then(response => {
                // handle successful response if needed
                Swal.fire({
                  title: "테마가 삭제되었습니다.",
                  icon: "success",
                }).then(()=>{
                    window.location.reload();
                })
                // You may want to perform additional actions after successful deletion
              })
              .catch(error => {
                console.error("Error deleting post:", error);
                Swal.fire({
                  title: "삭제 중 오류가 발생했습니다.",
                  text: "다시 시도해주세요.",
                  icon: "error",
                });
              });
          } else {
            // User clicked "취소" or closed the modal
            Swal.fire({
              title: "삭제가 취소되었습니다.",
              icon: "info",
            });
          }
        });
      };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 요청을 보냅니다.
        apiGetCategories();
    }, []);



    const HeaderTitle = "테마 관리";
    const HeaderButton = "변경사항 저장";
    const HeaderAddButton = "테마 추가"

    return (
        <div>
            <ManageTopSideBar HeaderTitle={HeaderTitle} HeaderButton={HeaderButton} HeaderButton2={HeaderAddButton}  
            Container={
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ width: '10%'}}>번호</TableCell>
                                    <TableCell align="center">테마</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {themes && themes.map((row, idx) => (
                                    <TableRow
                                        key={row.themeSeq} themeOrder={idx}
                                        onDragStart={() => dragStart(idx)}
                                        onDragEnter={() => dragEnter(idx)}
                                        onDragOver={e => e.preventDefault()}
                                        onDragEnd={drop}
                                        onMouseEnter={() => mouseOn(idx)} onMouseLeave={() => mouseOff(idx)}
                                        draggable
                                    >
                                        <TableCell align="center">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Link to={`/mngt/theme/${idx}`}>{row.themeName}</Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            {hideList[idx] && (
                                                <DeleteButtonContainer>
                                                    <SmallButton onClick={() => removeButtonClicked(row.themeSeq)}>삭제</SmallButton>
                                                </DeleteButtonContainer>
                                                 
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            } />
        </div>
    )
}

export default MngtTheme;