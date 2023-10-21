import ManageTopSideBar from '../../components/TopSidebar/ManageTopSideBar';
import { useState, useEffect } from "react";
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

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 요청을 보냅니다.
        apiGetCategories();
    }, []);

    const HeaderTitle = "테마 관리";
    const HeaderButton = "";

    return (
        <div>
            <ManageTopSideBar HeaderTitle={HeaderTitle} HeaderButton={HeaderButton} Container={
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
                                {themes.map((row, idx) => (
                                    <TableRow
                                        key={row.themeSeq}
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