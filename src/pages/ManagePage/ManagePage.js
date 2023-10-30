import styled from "@emotion/styled";
import ManageTopSideBar from "../../components/TopSidebar/ManageTopSideBar";
import { Box, Container, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CommonColorButton, CommonDeleteButton } from '../../common';
import {FaEye} from "react-icons/fa"
import {FaEyeSlash} from "react-icons/fa"

const ManagePage = ({isLogin, hasBlog, username}) => {
  const HeaderTitle = "블로그 관리";

  const [nickname, setNickname] = useState();
  const [blogName, setBlogName] = useState();
  const [description, setDescription] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();

  const [isShowPw, setShowPwState] = useState(false);

  const fileInput = useRef(null);
  const [file, setFile] = useState("");
  const [profileImg, setProfileImg] = useState();
  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 요청을 보냅니다.
    apiGetUserInfo();
  }, []);

  const apiGetUserInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/detail`, {})
      .then((response) => {
        setProfileImg(response.data.profileImg);
        setNickname(response.data.nickname);
        setBlogName(response.data.blogName);
        setDescription(response.data.description);
        setPassword(response.data.password);
        setRepeatPassword(response.data.password);
      });
  };

  const apiPutModifiedUserInfo = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/blogs`, {
        profileImg : profileImg,
        blogName : blogName,
        description : description,
        nickname : nickname,
        password : password
      })
      .then((response) => {
        alert(response.status)
      });
  };

  const apiDeleteUser = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/users`, {

      })
      .then((response) => {
        alert(response.status)
      });
  };

  const modifyBtnClicked = () => {
    Swal.fire({
      title: "회원정보를 수정하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00b4ef",
      cancelButtonColor: "#ec5353",
      confirmButtonText: "수정",
      cancelButtonText: "취소",
    }).then(function (result) {
      if (result.isConfirmed) {
        apiPutModifiedUserInfo();
      }
    });
  };

  const deleteBtnClicked = () => {
    Swal.fire({
      title: "회원탈퇴를 하시겠습니까?",
      text: "다시 되돌릴 수 없습니다. 신중해주세요.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00b4ef",
      cancelButtonColor: "#ec5353",
      confirmButtonText: "탈퇴",
      cancelButtonText: "취소",
    }).then(function (result) {
      if (result.isConfirmed) {
        apiDeleteUser();
      }
    });
  };

  const selectFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      
      return;
    }

    //화면에 프로필 사진 표시

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };


  
  
  const toggleHidePassword =()=>{
    setShowPwState(!isShowPw);
  }

  return (
    <ManageTopSideBar
      isLogin={isLogin}
      hasBlog={hasBlog}
      username={username}
      HeaderTitle={HeaderTitle}
      Container={
        <WrapContainer>
          <WrapProfileBox>
            <Profile
              src={profileImg}
              style={{ margin: "10px", cursor: "pointer" }}
              onClick={() => {
                fileInput.current.click();
              }}
            />

            <ProfileUpload
              type="file"
              accept="image/*"
              name="profile_img"
              onChange={selectFile}
              ref={fileInput}
            />
          </WrapProfileBox>

          <TextInputContainer>
            <Text>닉네임</Text>

            <BlogNameInput
              placeholder=""
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </TextInputContainer>

          <TextInputContainer>
            <Text>블로그 이름</Text>

            <BlogNameInput
              placeholder=""
              value={blogName}
              onChange={(e) => {
                setBlogName(e.target.value);
              }}
            />
          </TextInputContainer>

          <TextInputContainer>
            <Text>블로그 소개</Text>

            <BlogDescriptionInput
              placeholder=""
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </TextInputContainer>

          <TextInputContainer>
            <Text>비밀번호</Text>

            <PasswordInput
              placeholder=""
              type={isShowPw ? "text":"password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Icon onClick={toggleHidePassword}> {isShowPw ? <FaEyeSlash /> : <FaEye />}</Icon>
          </TextInputContainer>

          <TextInputContainer>
            <Text>비밀번호 재입력</Text>

            <PasswordInput
              placeholder=""
              type={isShowPw ? "text":"password"}
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            />

          <Icon onClick={toggleHidePassword}> {isShowPw ? <FaEyeSlash /> : <FaEye />}</Icon>
          </TextInputContainer>

          <Line />

          <BtnsContainer>
            <Btn onClick={modifyBtnClicked} style={{ marginRight: 30 }}>
              블로그 수정
            </Btn>
            <DeleteBtn onClick={deleteBtnClicked}>회원탈퇴</DeleteBtn>
          </BtnsContainer>
        </WrapContainer>
      }
    />
  );
};

const WrapContainer = styled(Container)`
  align-items: center;
  flex-direction: column;
  width: 940px;
  height: 900px;
  background-color: white;
  display: flex;
  justify-content: center;
  border-radius: 5px;
`;

const WrapProfileBox = styled(Box)`
  width: 200px;
  height: 150px;
  background-color: white;
  text-align: center;
`;

const Profile = styled.img`
  box-shadow: 1px 1px 15px -5px black;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  transition: all 0.5s ease;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }
`;

const TextInputContainer = styled.div`
  position : relative;
  flex-direction: column;
  display: flex;
  margin-top: 23px;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const BtnsContainer = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 29px;
  width: 335px;
  height: 48px;
`;

const Btn = styled(CommonColorButton)`
  width: 170px;
  height: 48px;
  text-align: center;
`;

const ProfileUpload = styled.input`
  display: none;
`;

const Text = styled.div`
  float: left;
  margin-bottom: 10px;
  width: 200px;
  display: block;
  font-size: 15px;
  font-weight: 700;
  text-align: left;
  margin-left: 10px;
  float: left;
`;

const PasswordInput = styled.input`
  width: 336px;
  height: 48px;
  padding-left: 19px;
  padding-right: 19px;

  border: none;
  border-radius: 13px;

  background: #f0f0f0;

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);

  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
`;

const BlogNameInput = styled.input`
  width: 336px;
  height: 48px;
  padding-left: 19px;
  padding-right: 19px;

  border: none;
  border-radius: 13px;

  background: #f0f0f0;

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);

  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
`;

const BlogDescriptionInput = styled.textarea`
  width: 336px;
  height: 90px;
  padding-left: 19px;
  padding-right: 19px;

  border: none;
  border-radius: 13px;
  resize: none;
  background: #f0f0f0;

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  padding-top: 10px;

  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease 0s;
`;

const Line = styled.hr`
  margin-top: 34px;
  width: 335px;
`;

const DeleteBtn = styled(CommonDeleteButton)`
  width: 170px;
  height: 48px;
  margin-right: 0px;
  
`;

const Icon = styled.div`
  position: absolute;
  margin-top: 45px;
  left: 90%;
  cursor: pointer;
`;


export default ManagePage;
