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
import styled from "styled-components";
import { CommonButton } from '../../common';
import { width } from '@mui/system';

const MngtTheme = (props) => {
    const [themes, setThemes] = useState([]);
    const [hideList, setHideList] = useState(Array(themes.length).fill(false));
    const length = themes.length;
    const themeSeq = useRef(length);

    const apiGetCategories = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/themes/1`)
          .then((response) => {
            setThemes(response.data.themes);
            console.log(themes)
          })
          .catch((error) => {
            console.error('API GET request error:', error);
          });
    };

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
    
    const handleAddThemes = () => {
        const newName = prompt("새로 추가할 템플릿 이름을 입력하세요")
        if(newName !== null && newName !== ""){
          themeSeq.current += 1;
          const newTheme = {
            themeSeq : themeSeq.current, 
            themeName: newName,
            themeOrder : themeSeq.current,
            lists : [],
          };
          setThemes([...themes, newTheme]);
        }
  }

    const handleDeleteThemes = (idx) => {
            if (window.confirm("정말 삭제하시겠습니까? 테마 안에 있는 목록도 다 삭제됩니다.")) {
                setThemes((prevLists) => prevLists.filter((_, index) => index !== idx));
            } 
        }

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 요청을 보냅니다.
        apiGetCategories();
    }, []);

    const HeaderTitle = "테마 관리";
    const HeaderButton = "변경사항 저장";
    

    // const HeaderTitle = "테마 관리";
    // const HeaderButton = <PlusButton variant="contained" size="small" onClick={handleAddThemes}>테마 추가</PlusButton> 
    
    return (
        <div>
            <ManageTopSideBar HeaderTitle={HeaderTitle} HeaderButton={HeaderButton} Container={
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ width: '10%'}}>번호</TableCell>
                                    <TableCell align="center" sx={{ width: '75%'}} colSpan={1}>테마</TableCell>
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
                                        draggable
                                        style={{height:'75px'}}
                                        onMouseEnter={() => mouseOn(idx)} onMouseLeave={() => mouseOff(idx)}
                                    >
                                        <TableCell align="center">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell align="left" colSpan={1}>
                                            <Link to={`/mngt/theme/${idx}`}>{row.themeName}</Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            {hideList[idx] && (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <SmallButton>수정</SmallButton>
                                                    <SmallButton onClick={() => handleDeleteThemes(idx)}>삭제</SmallButton>
                                                </div>
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

const PlusButton = styled(CommonButton)`
    background-color:white;
    color:black;
    width: 122px;
    height: 40px;
    border-color:black;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;

    &:hover {
    color: #fff;
    background: black;
    }
`

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

export default MngtTheme;