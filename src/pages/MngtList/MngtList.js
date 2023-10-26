import { useState, useRef, useEffect } from "react";
import ManageTopSideBar from '../../components/TopSidebar/ManageTopSideBar';
import axios from "axios";
import { useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MngtList = (props) => {
    const { themeSeq } = useParams();

    const [lists, setLists] = useState([]);

    const apiGetCategories = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/themes/1`)
          .then((response) => {
            setLists(response.data.themes[themeSeq].lists);
            console.log(lists)
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
        const copyListItems = [...lists];
        const dragItemConotent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemConotent);
        dragItem.current = null;
        dragOverItem.current = null;
        setLists(copyListItems);
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 요청을 보냅니다.
        apiGetCategories();
    }, []);

    const HeaderTitle = "목록 관리";
    const HeaderButton = "변경사항 저장";

    return (
        <div>
            <ManageTopSideBar HeaderTitle={HeaderTitle} HeaderButton={HeaderButton} Container={
                <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableBody>
                            {lists && lists.map((item, idx) => (
                                <TableRow
                                    key={idx} id={idx} listOrder={idx}
                                    onDragStart={() => dragStart(idx)}
                                    onDragEnter={() => dragEnter(idx)}
                                    onDragOver={e => e.preventDefault()}
                                    onDragEnd={drop}
                                    draggable>
                                    <TableCell align="center">
                                        {item.listName}
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

export default MngtList;