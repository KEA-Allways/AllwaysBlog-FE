import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import axios from "axios";
import React from "react";
import kaBtn from "../../assets/kakao_login_btn.png";
import Swal from "sweetalert2";
import {FaEye} from "react-icons/fa"
import {FaEyeSlash} from "react-icons/fa"
import {loginStore} from "../../store/store";
import Topbar from "../../components/Topbar/Topbar";
import { CommonColorButton } from '../../common';
import { DefaultAxios } from "../../lib/DefaultAxios";



const LoginPage = () => {
  const navigate = useNavigate();

  const {userId, password, setUserId, setPassword } = loginStore();
  const [response, setResponse] = useState("");
  // const [userId, setUserId] = useState("");
  // const [password, setPassword] = useState("");
  const [isShowPw, setShowPwState] = useState(false);
  
  const toggleHidePassword =()=>{
    setShowPwState(!isShowPw);
  }

  const login = async() => {
    try{
      const res = await DefaultAxios.post(`/api/auth/sign-in`, {
        "email" : userId,
        "password" : password,
      });
      localStorage.setItem("accessToken", res.data.result.data.accessToken);
      localStorage.setItem("refreshToken", res.data.result.data.refreshToken);
      window.open("/", "_self");
    }catch(error){
      if(error.response.status === 401){
        Swal.fire({
          title: "유저 정보가 없습니다",
          text: "아이디나 비밀번호를 다시 확인해주세요!",
          icon: "question"
        })
        .then(() => {
          setPassword("");
        })
    }
  }
    
  }

  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT}&response_type=code`;

  // const loginBtnClicked = () => {
  //    axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {
  //       userId: userId,
  //       password: password
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         // localStorage.setItem("jwt", result.data.result.jwt);
  //         // localStorage.setItem("memberId", result.data.result.id);
  //         Swal.fire({
  //           title: "로그인 성공!",
  //           icon: 'success'
  //         }).then(()=> {
  //           navigate("/");
  //         }) 
         
  //       } else {
  //         Swal.fire({
  //           title: "로그인 실패!",
  //           icon: 'error'
  //         }).then(()=> {
  //           setPassword("");
  //         }) 
  //       }
  //     });
  // };

  const kakaoBtnClicked = async () => {
    console.log(kakaoUrl);
    window.location.href = kakaoUrl;
  };

  return (
    <>
      <Topbar />
      <Container>
        <LoginSection>
          <LoginTitle>Login</LoginTitle>
          <TextInputContainer>
            <Input
              placeholder="이메일"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
          </TextInputContainer>
          <TextInputContainer>
            <Input
              placeholder="비밀번호"
              type={isShowPw ? "text":"password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
             <Icon onClick={toggleHidePassword}> {isShowPw ? <FaEyeSlash /> : <FaEye />}</Icon>
             

          </TextInputContainer>
          <BtnsContainer>
            <LoginBtn onClick={login}>로그인</LoginBtn>
            <Link to="/signup" style={{textDecoration: "none"}}>
              <SignupBtn>회원가입</SignupBtn>
            </Link>
          </BtnsContainer>
          <ReLoginContainer>
            <ReLoginCheckBox
              type="checkbox"
              value="None"
              id="checkbox1"
              name="check"
            />
            <ReLoginText>로그인 상태 유지</ReLoginText>
            <ForgotPWText>비밀번호 찾기</ForgotPWText>
          </ReLoginContainer>
          <Line />
          <KaBtn src={kaBtn} onClick={kakaoBtnClicked} />
          <Notice></Notice>
        </LoginSection>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 1000px;
  align-items: center;
  padding-top: 60px;
  // background: #00b4ef;
`;

const LoginSection = styled.div`
 
  margin-top: 0px;
  padding-top: 59px;
  width: 550px;
  height: 646px;
  background: #fff;

  box-shadow: 1px 1px 15px -5px black;
  border: solid;
  border-color: rgba(0, 0, 0, 0);

  border-radius: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.div`
  display: block;
  font-size: 35px;
  font-weight: 700;
  padding: 5px 0;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 10px;

  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const TextInputContainer = styled.div`
  position: relative;   
  display: flex;
  margin-top: 23px;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Input = styled.input`
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


  transition: all 0.5s ease 0s;
`;

const ReLoginContainer = styled.div`
  width: 330px;
  margin-top: 40px;
  margin-bottom: 10px;
`;

const ReLoginCheckBox = styled.input`
  cursor: pointer;
  float: left;
  width: 20px;
  height: 20px;
  background: rgba(0,190,254);
  border-radius: 30%;
  position: relative;
  border: 1px solid #11a3fc;

  transition: all 0.5s ease 0s;
  &:hover {
    transform: scale(1.2);
  }
`;

const ReLoginText = styled.div`
  float: left;
  font-size: 13px;
  font-weight: 700;
  padding-left: 10px;

  transition: all 0.5s ease 0s;
  &:hover {
    transform: scale(1.05);
  }
`;

const ForgotPWText = styled.div`
  font-size: 13px;
  font-weight: 700;
  padding-left: 10px;
  cursor: pointer;
  float: right;

  transition: all 0.5s ease 0s;
  &:hover {
    transform: scale(1.1);
  }
`;

const BtnsContainer = styled.div`
  margin-top: 29px;
  width: 335px;
  height: 48px;
  display: flex;
  justify-content: space-between;
`;

const LoginBtn = styled(CommonColorButton)`
  margin-right: 0px;
`;

const SignupBtn = styled(CommonColorButton)`
  background: white;
  border: 0.5px solid #dadada;
  color: black;
  margin-right: 0px;

  &:hover {
    transform: scale(1.05);
    background: white;
    transition: 0.5s;
  }
`;

const Line = styled.hr`
  margin-top: 34px;
  width: 335px;
`;

const KaBtn = styled.img`
  width: 335px;
  margin-top: 29px;
  cursor: pointer;

  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Notice = styled.div`
  margin-top: 23px;
  font-weight: 400;
  font-size: 12px;
  color: #9a9a9a;
`;

const Icon = styled.div`
  position: absolute;
  top: 14px;
  bottom: 0px;
  left: 90%;
  height: 20px;
  cursor: pointer;
`;

export default LoginPage;