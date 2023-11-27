import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {FaEye} from "react-icons/fa"
import {FaEyeSlash} from "react-icons/fa"
import Topbar from "../../components/Topbar/Topbar";
import { CommonColorButton } from '../../common';
import { Tooltip, IconButton } from "@material-ui/core";
import InfoIcon from '@mui/icons-material/Info';
import { DefaultAxios } from "../../lib/DefaultAxios";
import AWS from "aws-sdk";

const REACT_APP_AWS_S3_BUCKET_REGION = process.env.REACT_APP_AWS_S3_BUCKET_REGION;
const REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID = process.env.REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID;
const REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY;


const SignUpPage = () => {
  const navigate = useNavigate();
  const valid_email = new RegExp('^[a-zA-Z0-9]+@[a-zA-Z]+(?=\\.[a-zA-Z]{2,})[a-zA-Z0-9.]{2,}$');
  const valid_userId = new RegExp('[a-zA-Z0-9]');
  const valid_password = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$");


  const fileInput = useRef(null);

  const [file, setFile] = useState("");

  const [response, setResponse] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  

  const [form,setForm] = useState({
    profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    userId: '',
    email: '',
    nickname: '',
    password: '',
    repeatPassword: ''

  });

  const [isShowPw, setShowPwState] = useState(false);
  
  const toggleHidePassword =()=>{
    setShowPwState(!isShowPw);
  }

  const signUpBtnClicked = async () => {
    try{
      const res = await DefaultAxios.post(`/api/auth/sign-up`,
        {
          profileImgSeq: form.profileImage,
          //profileImgSeq : 1,
          userId: form.userId,
          email: form.email,
          nickname: form.nickname,
          password: form.password,
          // repeatPassword: form.repeatPassword,
        }
      )
      
      if(res.data.success){
        Swal.fire({
          title: "회원가입 성공",
          text: "회원가입에 성공하셨습니다! 로그인을 해주세요",
          icon: "success"
        })
        .then(navigate("/login"));
      }
    }catch(e){
      if(e.response.status === 409){
        alert("중복된 이메일 혹은 아이디 입니다.");
      }
      else if(e.response.status === 400){
        alert("유효성 검사에 통과하지 못했습니다.");
      }
      else if(e.response.status === 500){
        alert("서버에 에러가 있습니다 서버가 켜져있는지 확인해주세요");
      }
      else if(e.response.status === 404){
        alert("서버의 주소를 찾을 수 없습니다. URL이나 HTTP 요청을 수정하세요");
      }
    }
  };

  const selectFile = async (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      const file = e.target.files[0];
      try {
        //업로드할 파일의 이름으로 Date 사용
        const name = Date.now();
        //s3 관련 설정
        AWS.config.update({
          region: REACT_APP_AWS_S3_BUCKET_REGION,
          accessKeyId: REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID,
          secretAccessKey: REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY,
          
        });
        //s3에 업로드할 객체 생성
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: "allways-test-bucket", //버킷 이름
            Key: `upload/${name}.${file.type.split("/")[1]}`,
            Body: file,
            ContentType: file.type,
          },
        });
        //이미지 업로드 url 반환
        const IMG_URL = await upload.promise().then((res) => res.Location);
        setForm({...form, profileImage : IMG_URL});
        
      } catch (error) {
        console.log(error);
      }
    } else {
      //업로드 취소할 시
      setForm({...form, profileImage :  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
      );
      return;
    }

    //화면에 프로필 사진 표시

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        //setForm({...form, profileImage : reader.result});
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Topbar />
      
      <Container>
        <SignUpSection>
          <SignUpTitle>회원가입</SignUpTitle>
          

          <Profile
            src={form.profileImage}
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
          <SignUpText>이메일 {isEmailValid ? "" : 
          <Tooltip title= "ex) aaaaaa@gmail.com" placement="right">
                  <IconButton size="small"><InfoIcon /></IconButton></Tooltip>}
          </SignUpText>
            
          
            <TextInputContainer>
              <Input
                placeholder="이메일을 입력해주세요."
                onChange={(e) => {
                  setForm({...form, email : e.target.value});
                  (valid_email.test(e.target.value) ? setIsEmailValid(true) :  setIsEmailValid(false))
                }}
              /> 
              
              {/* <EmailBtn>인증하기</EmailBtn> */}
            </TextInputContainer>
            
            <SignUpText>아이디{isUserIdValid ? "" : 
                  <Tooltip title= "한글 입력은 안됩니다!" placement="right">
                  <IconButton size="small"><InfoIcon /></IconButton></Tooltip>}

            </SignUpText>

            <TextInputContainer>
              <Input
                placeholder="아이디를 입력해주세요."
                onChange={(e) => {
                  setForm({...form, userId : e.target.value});
                  (valid_userId.test(e.target.value) ? setIsUserIdValid(true) : setIsUserIdValid(false))
                }}
              />
              
            </TextInputContainer>

            <SignUpText>닉네임</SignUpText>

            <TextInputContainer>
              <Input
                placeholder="닉네임을 입력해주세요."
                onChange={(e) => {
                  setForm({...form, nickname : e.target.value});
                }}
              />
            </TextInputContainer>

            <SignUpText>비밀번호{isPasswordValid ? "" : 
                  <Tooltip title= "영어, 숫자, 특수문자 포함하여 8글자 이상으로 만들어주세요!" placement="right">
                  <IconButton size="small"><InfoIcon /></IconButton></Tooltip>}
            </SignUpText>

            <TextInputContainer>
              <Input
                placeholder="비밀번호를 입력해주세요."
                type={isShowPw ? "text":"password"}
                onChange={(e) => {
                  setForm({...form, password : e.target.value});
                  (valid_password.test(e.target.value) ? setIsPasswordValid(true) :  setIsPasswordValid(false))
                }}
                
              />
                <Icon onClick={toggleHidePassword}> {isShowPw ? <FaEyeSlash /> : <FaEye />}</Icon>
            </TextInputContainer>

            <SignUpText>비밀번호 재입력{isConfirmPassword ? "" : 
                  <Tooltip title= "비밀번호와 일치하게 작성해주세요!" placement="right">
                  <IconButton size="small"><InfoIcon /></IconButton></Tooltip>}</SignUpText>

            <TextInputContainer>
              <Input
                placeholder="비밀번호를 다시 입력해주세요."
                type={isShowPw? "text":"password"}
                onChange={(e) => {
                  setForm({...form, repeatPassword : e.target.value});
                  (form.password === e.target.value ? setIsConfirmPassword(true) : setIsConfirmPassword(false))
                }}
              />
                <Icon onClick={toggleHidePassword}> {isShowPw ? <FaEyeSlash /> : <FaEye />}</Icon>

            </TextInputContainer>
          </SignUpContainer>

          <Line></Line>
           
          {(isEmailValid && isUserIdValid && isPasswordValid && isConfirmPassword) ?<SignUpBtn onClick={signUpBtnClicked}>회원가입</SignUpBtn> : <SignUpBtn disabled>회원가입</SignUpBtn> }
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

  // background: #fff;
`;

const SignUpSection = styled.div`

  box-shadow: 1px 1px 15px -5px black;

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
  margin-bottom: 20px;

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
  margin-bottom: 20px;
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

  position : relative;
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

  }
`;

const EmailBtn = styled(CommonColorButton)`
  width: 100px;
  height: 38px;
  margin-left: 15px;
  margin-right: 0px;
  line-height: 38px;
  font-size: 14px;
`;

const SignUpBtn = styled(CommonColorButton)`
  text-align: center;
`;

const Icon = styled.div`
  position: absolute;
  top: 7px;
  bottom: 0px;
  /* left: 64%; */
  left : 85%;
  height: 20px;
  cursor: pointer;
`;

export default SignUpPage;