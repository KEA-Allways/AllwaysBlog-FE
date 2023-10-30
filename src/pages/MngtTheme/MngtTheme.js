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

const MngtTheme = (props) => {
    const [themes, setThemes] = useState([]);

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
                                        draggable
                                    >
                                        <TableCell align="center">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Link to={`/mngt/theme/${idx}`}>{row.themeName}</Link>
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