import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import kaBtn from "../../assets/kakao_login_btn.png";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import Topbar from "../../components/Topbar/Topbar";
import ThumbnailModal from "../../components/ThumbnailModal/ThumbnailModal";

const BlogCreationPage = () => {
  const navigate = useNavigate();

  const [response, setResponse] = useState("1");
  const [blogName, setBlogName] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  const createBtnClicked = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/blogs/new-blog`, {
        blogName: blogName,
        paswordDescriptions: description,
      })
      .then((response) => {
        //setResponse(response);

        if (response.status === 200) {
          // localStorage.setItem("jwt", result.data.result.jwt);
          // localStorage.setItem("memberId", result.data.result.id);
          Swal.fire({
            title: "블로그 생성!",
            icon: "success",
          }).then(() => {
            navigate("/");
          });
        } else {
          Swal.fire({
            title: "블로그 생성 실패!",
            icon: "error",
          }).then(() => {});
        }
      });
  };

  return (
    <>
      <Topbar />

      <Container>
        <BlogSection>
          <BlogTitle>블로그 생성</BlogTitle>


          <Profile
            //src={profileImage}
            style={{ margin: "10px", cursor: "pointer" }}
          />


          <TextInputContainer>
          <Text>블로그 이름</Text>

            <BlogNameInput
              placeholder=""
              onChange={(e) => {
                setBlogName(e.target.value);
              }}
            />
          </TextInputContainer>


          <TextInputContainer>
          <Text>블로그 소개</Text>
            
            <BlogDescriptionInput
              placeholder=""
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </TextInputContainer>

          <Line />

          <BtnsContainer>
            <CreationBtn onClick={() => setShowModal(true)}>블로그 생성</CreationBtn>
          </BtnsContainer>
        </BlogSection>
      </Container>
      <ThumbnailModal
        showModal={showModal}
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 1000px;
  align-items: center;
  padding-top: 20px;
  // background: #00b4ef;
`;

const BlogSection = styled.div`
  box-shadow: 1px 1px 15px -5px black;
  margin-top: 0px;
  padding-top: 20px;
  width: 550px;
  height: 700px;
  background: #fff;
  backdrop-filter: blur(5.5px);
  border: solid;
  border-color: rgba(0, 0, 0, 0);
  box-shadow: 5px rgba(1, 0, 0, 3);
  border-radius: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlogTitle = styled.div`
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
    flex-direction: column;
  display: flex;
  margin-top: 23px;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.05);
  }
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
  padding-top : 10px;

  font-weight: 400;
  font-size: 15px;

  overflow: hidden;
  transition: all 0.3s ease 0s;
`;

const BtnsContainer = styled.div`
  justify-content: center; 
  display: flex;
  margin-top: 29px;
  width: 335px;
  height: 48px;
`;

const CreationBtn = styled.div`
  width: 200px;
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

const Text = styled.div`
  float : left;
  margin-bottom : 10px;
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

export default BlogCreationPage;
