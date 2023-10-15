import LoginPageTopbar from "../components/LoginPageTopbar";
import Footer from "../components/Footer";
import styled from "@emotion/styled";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser  } from '@fortawesome/free-solid-svg-icons';
import kaBtn from "../assets/kakao_login_btn.png"

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [PW, setPW] = useState("");

    
    return (
        <>
             <LoginPageTopbar></LoginPageTopbar>
        </>
    )
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 1000px;
  align-items: center;
  padding-top: 60px;
  background: #00b4ef;
`;

const LoginSection = styled.div`
  margin-top: 50px;
  padding-top: 59px;
  width: 550px;
  height: 646px;
  background: #fff;
  border: solid;
  border-color: rgba(0, 0, 0, 0);
  box-shadow: 5px  rgba(1, 0, 0, 3);
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
  
`;



const TextInputContainer = styled.div`
  display: flex;
  margin-top: 23px;
  
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
  float: left;
  width: 20px;
  height: 20px;
  background: #11a3fc;
  border-radius: 30%;
  position: relative;
  border: 1px solid #11a3fc;
`;

const Span = styled.div`
float : left;
font-size: 13px;
font-weight: 700;
padding-left : 10px;

`;

const ForgotPWText = styled.div`
  font-size: 13px;
  font-weight: 700;
  padding-left : 10px;
  float : right;
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
`;

const Line = styled.hr`
  margin-top: 34px;
  width: 335px;
`;

const KaBtn = styled.img`
  width: 335px;
  margin-top: 29px;
  cursor: pointer;
`;

const Notice = styled.div`
  margin-top: 23px;
  font-weight: 400;
  font-size: 12px;
  color: #9a9a9a;
`;


export default SignUpPage;
