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
  const page =1;
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  
  //{{gateway_path}}/api/post?page=1&size=10
  const apiGetPosts = async() => {
    const res =await TokenAxios.get(`/api/post?page=${page}&size=${itemsPerPage}`);
    setLists(res.data.result.data.content)
    console.log(res);
  };

  const totalItems = lists.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = lists.slice(startIndex, endIndex);

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

  const removeButtonClicked = (postSeq) => {
    Swal.fire({
      title: "게시글을 삭제 중입니다.",
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
        TokenAxios.delete(`api/post/${postSeq}`)
          .then(response => {
            // handle successful response if needed
            Swal.fire({
              title: "게시글이 삭제되었습니다.",
              icon: "success",
            });
            // You may want to perform additional actions after successful deletion
          }).then(()=>{
            window.location.reload();
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

  const HeaderTitle = "글 관리";
  const HeaderButton = "";

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
                        <p style={{ margin: '0' }}>{row.title}</p>
                        <p style={{ margin: '0' }}>{row.themeName}/{row.postTitle}  |  {new Date(row.postDate).toLocaleDateString()}</p>
                      </TableCell>
                      <TableCell align="center">
                        {hideList[idx] && (
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <SmallButton onClick={() => editButtonClicked(row.postSeq)}>수정</SmallButton>
                            <SmallButton onClick={() => removeButtonClicked(row.postSeq)}>삭제</SmallButton>
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
              totalItemsCount={totalItems} // 전체 아이템 수
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
