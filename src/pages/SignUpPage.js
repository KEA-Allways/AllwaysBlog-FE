import LoginPageTopbar from "../components/LoginPageTopbar";

import styled from "@emotion/styled";

import { Link, useNavigate } from "react-router-dom";

import { useState, useRef } from "react";

import React from "react";

import axios from "axios";

import Swal from "sweetalert2";

const SignUpPage = () => {
  const navigate = useNavigate();

  const fileInput = useRef(null);

  const [file, setFile] = useState("");

  const [profileImage, setProfileImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const [response, setResponse] = useState("");

  const [userId, setUserId] = useState("");

  const [email, setEmail] = useState("");

  const [nickname, setNickname] = useState("");

  const [password, setPassword] = useState("");

  const [repeatPassword, setRepeatPassword] = useState("");

  const signUpBtnClicked = async () => {
    await axios

      .post(
        "http://private-06de82-bee3083.apiary-mock.com/api/users/new-user ",
        {
          profileImg: profileImage,

          userId: userId,

          email: email,

          nickname: nickname,

          password: password,

          repeatPassword: repeatPassword,
        }
      )

      .then((response) => {
        setResponse(response);
      });

    if (response.status === 200) {
      //alert(response.data.message);

      Swal.fire({
        title: <strong>회원가입성공</strong>,

        icon: "success",
      });

      navigate("/");
    } else {
      //alert(response.data.message);
    }
  };

  const selectFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시

      setProfileImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );

      return;
    }

    //화면에 프로필 사진 표시

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);

        alert(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <LoginPageTopbar></LoginPageTopbar>

      <Container>
        <SignUpSection>
          <SignUpTitle>회원가입</SignUpTitle>

          <Profile
            src={profileImage}
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

          <SignUpContainer>
            <SignUpText>이메일</SignUpText>

            <TextInputContainer>
              <Input
                placeholder="이메일을 입력해주세요."
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <EmailBtn>인증하기</EmailBtn>
            </TextInputContainer>

            
            <SignUpText>아이디</SignUpText>
            <TextInputContainer>
              <Input
                placeholder="아이디를 입력해주세요."
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              />
            </TextInputContainer>

            <SignUpText>닉네임</SignUpText>

            <TextInputContainer>
              <Input
                placeholder="닉네임을 입력해주세요."
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
            </TextInputContainer>

            <SignUpText>비밀번호</SignUpText>

            <TextInputContainer>
              <Input
                placeholder="비밀번호를 입력해주세요."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </TextInputContainer>

            <SignUpText>비밀번호 재입력</SignUpText>

            <TextInputContainer>
              <Input
                placeholder="비밀번호를 다시 입력해주세요."
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              />
            </TextInputContainer>
          </SignUpContainer>

          <Line></Line>

          <SignUpBtn onClick={signUpBtnClicked}>회원가입</SignUpBtn>
        </SignUpSection>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;

  align: left;

  flex-direction: column;

  width: 100vw;

  height: 1000px;

  align-items: center;

  padding-top: 30px;

  background: #00b4ef;
`;

const SignUpSection = styled.div`
  margin-top: 0px;

  padding-top: 10px;

  width: 550px;

  height: 800px;

  background: #fff;

  border: solid;

  border-color: rgba(0, 0, 0, 0);

  box-shadow: 5px rgba(1, 0, 0, 3);

  border-radius: 50px;

  text-align: center;

  display: flex;

  flex-direction: column;

  align-items: center;
`;

const SignUpTitle = styled.div`
  display: block;

  font-size: 35px;

  font-weight: 700;

  padding: 5px 0;

  border-bottom: 2px solid #f0f0f0;
`;

const SignUpText = styled.div`
  width: 200px;

  display: block;

  font-size: 15px;

  font-weight: 700;

  text-align: left;

  margin-left: 10px;

  float: left;
`;

const Profile = styled.img`
  box-shadow: 1px 1px 15px -5px black;

  border-radius: 50%;

  cursor: pointer;

  width: 120px;

  height: 120px;

  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);

    transition: 0.5s;
  }
`;

const Line = styled.hr`
  margin-top: 34px;

  width: 400px;
`;

const ProfileUpload = styled.input`
  display: none;
`;

const SignUpContainer = styled.div`
  margin-top: 23px;

  display: flex;

  flex-direction: column;

  transition: all 0.5s ease;
`;

const TextInputContainer = styled.div`
  display: flex;

  margin-top: 1px;

  margin-bottom: 20px;

  transition: all 0.5s ease;
`;

const Input = styled.input`
  width: 300px;

  height: 38px;

  padding-left: 19px;

  padding-right: 19px;

  border: none;

  border-radius: 13px;

  background: #f0f0f0;

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);

  font-weight: 400;

  font-size: 15px;

  transition: all 0.5s ease 0s;

  &:hover {
    transform: scale(1.05);

    color: white;
  }
`;

const EmailBtn = styled.div`
  width: 100px;

  height: 38px;

  margin-left: 15px;

  line-height: 38px;

  background: #00b4ef;

  border: 1px solid #dadada;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  border-radius: 15px;

  font-style: normal;

  font-weight: 400;

  font-size: 14px;

  color: white;

  cursor: pointer;

  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.05);

    background: cornflowerblue;

    color: white;

    transition: 0.5s;
  }
`;

const SignUpBtn = styled.div`
  width: 156px;

  height: 48px;

  line-height: 48px;

  background: #00b4ef;

  border: 1px solid #dadada;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  border-radius: 15px;

  font-style: normal;

  font-weight: 400;

  font-size: 18px;

  color: white;

  cursor: pointer;

  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.05);

    background: cornflowerblue;

    color: white;

    transition: 0.5s;
  }
`;

export default SignUpPage;
