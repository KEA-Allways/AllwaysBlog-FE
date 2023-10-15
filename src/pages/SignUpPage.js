import LoginPageTopbar from "../components/LoginPageTopbar";
import Footer from "../components/Footer";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import kaBtn from "../assets/kakao_login_btn.png";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [PW, setPW] = useState("");

  return (
    <>
      <LoginPageTopbar></LoginPageTopbar>
      <Container>
        <LoginSection>
            
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
`;

const TextInputContainer = styled.div`
  display: flex;
  margin-top: 23px;
`;

export default SignUpPage;
