import LoginPageTopbar from "../../components/Topbar/LoginPageTopbar"
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import axios from "axios";
import React from "react";
import kaBtn from "../../assets/kakao_login_btn.png";
import Swal from "sweetalert2";
import {FaEye} from "react-icons/fa"


 
const LoginPage = () => {
  const navigate = useNavigate();

  const [response, setResponse] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPwChecked, setShowPwChecked] = useState(true);
  
  const toggleHidePassword =()=>{
    setShowPwChecked(!isShowPwChecked);
  }


  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT}&response_type=code`;

  const loginBtnClicked = () => {
     axios.post("http://private-06de82-bee3083.apiary-mock.com/api/users/login ", {
        userId: userId,
        password: password
      })
      .then((response) => {
        //setResponse(response);

        if (response.status === 200) {
          // localStorage.setItem("jwt", result.data.result.jwt);
          // localStorage.setItem("memberId", result.data.result.id);
          Swal.fire({
            title: "로그인 성공!",
            icon: 'success'
          }).then(()=> {
            navigate("/");
          }) 
         
        } else {
          Swal.fire({
            title: "로그인 실패!",
            icon: 'error'
          }).then(()=> {
            setPassword("");
          }) 
        }
      });
  };

  const kakaoBtnClicked = async () => {
    console.log(kakaoUrl);
    window.location.href = kakaoUrl;
  };

  return (
    <>
      <LoginPageTopbar></LoginPageTopbar>
      
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
              type={isShowPwChecked ? "password":"text"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
             <Icon onClick={toggleHidePassword}/> 
          </TextInputContainer>
          <BtnsContainer>
            <LoginBtn onClick={loginBtnClicked}>로그인</LoginBtn>
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
  box-shadow: 1px 1px 15px -5px black;
  margin-top: 0px;
  padding-top: 59px;
  width: 550px;
  height: 646px;
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


  transition: all 0.3s ease 0s;
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
  background: #11a3fc;
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

const LoginBtn = styled.div`
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

const SignupBtn = styled.div`
  width: 156px;
  height: 48px;
  line-height: 48px;
  background: #ffffff;
  border: 0.5px solid #dadada;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: black;

  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.05);
    background: cornflowerblue;
    color: white;
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

const Icon = styled(FaEye)`
  position: absolute;
  top: 14px;
  bottom: 0px;
  left: 90%;
  height: 20px;
  cursor: pointer;
`;

export default LoginPage;