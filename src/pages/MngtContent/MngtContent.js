import ManageTopSideBar from '../../components/TopSidebar/ManageTopSideBar';
import { useState, useEffect } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { CommonButton } from '../../common';
import styled from "@emotion/styled";
import Paging from '../../components/Paging/Paging';

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

const MngtContents = () => {
  const [lists, setLists] = useState([]);
  const [hideList, setHideList] = useState(Array(lists.length).fill(false));
  const navigate = useNavigate();

  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = lists.slice(startIndex, endIndex);

  const apiGetPosts = (page, itemsPerPage) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/posts/${page}/${itemsPerPage}`)
      .then((response) => {
        setLists(response.data.posts);
      })
      .catch((error) => {
        console.error('API GET request error:', error);
      });
  };

  useEffect(() => {
    apiGetPosts(currentPage, itemsPerPage);
  }, [currentPage]);

  const setRowHideState = (idx, value) => {
    const updatedHideList = [];
    updatedHideList[idx] = value;
    setHideList(updatedHideList);
  };

  const mouseOn = (idx) => {
    setRowHideState(idx, true);
  };

  const mouseOff = (idx) => {
    setRowHideState(idx, false);
  };

  const editButtonClicked = (postSeq) => {
    const theme = '선택된 테마';
    navigate('/post', { state: { postSeq: postSeq, themplateSeq: undefined, theme: theme } });
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
                    <TableCell align="center" sx={{ width: '10%' }}>번호</TableCell>
                    <TableCell align="center" sx={{ width: '70%' }}>제목</TableCell>
                    <TableCell align="center" sx={{ width: '20%' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedData.map((row, idx) => (
                    <TableRow
                      key={row.postSeq}
                      style={{ height: '80px' }}
                      onMouseEnter={() => mouseOn(idx)}
                      onMouseLeave={() => mouseOff(idx)}
                    >
                      <TableCell align="center">{idx + 1}</TableCell>
                      <TableCell align="left" colSpan={1}>
                        <p style={{ margin: '0' }}>{row.name}</p>
                        <p style={{ margin: '0' }}>{row.themeName}/{row.ListName} | {row.nickname} | {row.postDate}</p>
                      </TableCell>
                      <TableCell align="center">
                        {hideList[idx] && (
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <SmallButton onClick={() => editButtonClicked(row.postSeq)}>수정</SmallButton>
                            <SmallButton>삭제</SmallButton>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Paging
              activePage={currentPage}
              totalItemsCount={lists.length} // 전체 아이템 수
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      } />
    </div>
  );
};

export default MngtContents;
