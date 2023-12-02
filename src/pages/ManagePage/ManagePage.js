import styled from "@emotion/styled";
import ManageTopSideBar from "../../components/TopSidebar/ManageTopSideBar";
import { Box, Container, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CommonColorButton, CommonDeleteButton } from '../../common';
import {FaEye} from "react-icons/fa"
import {FaEyeSlash} from "react-icons/fa"
import { TokenAxios } from "../../lib/TokenAxios";
import AWS from "aws-sdk";
import { loginStore,blogStore } from "../../store/store";

const ManagePage = ({isLogin, hasBlog, username}) => {
    const HeaderTitle = "블로그 관리";
    const {setProfileImg, setUserName,setUserSeq} = loginStore(state => state);
    const {setBlogName,setBlogDescription} = blogStore(state => state);

    const REACT_APP_AWS_S3_BUCKET_REGION = process.env.REACT_APP_AWS_S3_BUCKET_REGION;
    const REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID = process.env.REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID;
    const REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY;
    // const [userName, setUserName] = useState();
    // const [profileImg,setProfileImg]=useState();
    

    const DEFAULT_IMAGE_URL="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

    //localstorage 에서 불러오기 
    const profileImg = localStorage.getItem('profileImg');
    const userName = localStorage.getItem("userName");
    const blogName = localStorage.getItem("blogName")
    const blogDescription = localStorage.getItem("blogDescription");

    const [modifiedBlogName, setModifiedBlogName] = useState(blogName);
    const [modifiedBlogDescription, setModifiedBlogDescription] = useState(blogDescription);
    const [modifiedUserName,setModifiedUserName] =useState(userName);
    const [modifiedPassword,setModifiedPassword] = useState();
    const [finalPassword,setFinalPassword] = useState("");
    const [modifiedRepeatPassword, setModifiedRepeatPassword] = useState();
    const [modifiedProfileImg,setModifiedProfileImg] = useState(profileImg);
    const [isShowPw, setShowPwState] = useState(false);

    const fileInput = useRef(null);
    const [file, setFile] = useState("");
    const [imageURL, setImageURL] = useState(null);
    
    

    // const apiGetUserInfo=async()=>{
      
    //   const res=await TokenAxios.get(`/api/user`);
    //   setModifiedProfileImg(res.data.result.data.profileUrl)
    // }


    const getBlogInfo = async() => {
      try{
          const res = await TokenAxios.get(`/api/blog`);
          const data=res.data.result.data
          console.log(data);
          if(res.data.success){
              setBlogName(data.blogName);
              setBlogDescription(data.blogDescription);
          }
      }catch (e) {
          if (e.response && e.response.status === 500) {
              setBlogName("");
              setBlogDescription("")
              console.log("로컬스토리지에 accessToken 없거나 만료되었습니다.");
          } else {
              // Handle other types of errors or log them
              console.error("An error occurred:", e);
              // You might want to redirect to an error page or display an error message to the user
          }
      }
        
    }

    const log = () => {
      console.log(blogName);
    }

    const apiPutModifiedBlogInfo = () => {
      TokenAxios
        .put(`/api/blog`, {
          blogName : modifiedBlogName,
          blogDescription : modifiedBlogDescription,
        })
        .then((response) => {
          alert(response.status)
        }).catch((error) => {
          console.error('Error in Axios request:', error);
          console.error("Error in modify blog info ");
          
        });
    };
  
    const apiPutModifiedUserInfo = () => {

      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

      console.log(modifiedPassword===undefined)
      console.log(modifiedPassword==="")
      console.log(modifiedPassword===null || modifiedPassword==="")
      if (modifiedPassword===undefined){
        saveData();
      } else {
        if(!passwordRegex.test(modifiedPassword)){
          console.error('정규화 통과 못함');
          console.log(modifiedPassword);
          return;
        } else if (modifiedPassword !== modifiedRepeatPassword) {
          console.error('Password does not match Repeat Password');
          return;
        }
        saveData();
      }
      
      /*
      console.log("!!!!!!!!!")
      console.log(modifiedPassword)
      console.log(!(modifiedPassword===""))
      console.log(!passwordRegex.test(modifiedPassword))

      if ( !(modifiedPassword==="")) {

          if(!passwordRegex.test(modifiedPassword)){
            console.error('정규화 통과 못함');
            console.log(modifiedPassword);
            return;
          }
          
      } else if (modifiedPassword !== modifiedRepeatPassword) {
          console.error('Password does not match Repeat Password');
          return;
      }

      
      
      saveData();
      */
    };

    const saveData = () => {
    console.log("@@@@")
    console.log(modifiedUserName)
    console.log(modifiedPassword)
    console.log(modifiedProfileImg)
    console.log("````````````")
    const userPayload = {
        nickname: modifiedUserName,
        password:modifiedPassword,
        profileImgSeq: modifiedProfileImg,
    };

  TokenAxios
      .put('/api/user', userPayload)
      .then((response) => {
          alert(response.status);
      })
      .catch((error) => {
          console.error('Error in Axios request:', error);
          console.error('Error in modify user info');
      });
    }
    
    const apiDeleteUser = () => {
      TokenAxios.delete(`/api/user`,{
      }) 
    };

    const modifyBtnClicked = () => {

      Swal.fire({
        title: "회원정보를 수정하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#ec5353",
        cancelButtonColor: "#00b4ef",
        confirmButtonText: "수정",
        cancelButtonText: "취소",
      }).then(function (result) {
        if (result.isConfirmed) {
          
          setUserName(modifiedUserName)
          setProfileImg(modifiedProfileImg)
          apiPutModifiedUserInfo();
          apiPutModifiedBlogInfo();
          // apiPutModifiedUserPasswordInfo()
          
          setBlogName(modifiedBlogName)
          setBlogDescription(modifiedBlogDescription)
          
        }
      });
    };

    const deleteBtnClicked = () => {
      Swal.fire({
        title: "회원탈퇴를 하시겠습니까?",
        text: "다시 되돌릴 수 없습니다. 신중해주세요.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ec5353",
        cancelButtonColor: "#00b4ef",
        confirmButtonText: "탈퇴",
        cancelButtonText: "취소",
      }).then(function (result) {
        if (result.isConfirmed) {
          apiDeleteUser();
        }
      });
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
              Bucket: "suhabuckettest", //버킷 이름
              Key: `upload/${name}.${file.type.split("/")[1]}`,
              Body: file,
              ContentType: file.type,
            },
          });
          //이미지 업로드 url 반환
          const IMG_URL = await upload.promise().then((res) => res.Location);
          console.log(IMG_URL);
          
          setModifiedProfileImg(IMG_URL)  
                
        } catch (error) {
          console.error('Error during S3 upload:', error);

          // 오류 메시지 또는 에러 코드 출력
          if (error.message) {
            console.error('Error message:', error.message);
          }
          if (error.code) {
            console.error('Error code:', error.code);
          }
        }
      } else {
        //업로드 취소할 시
        
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
    
      // Display the selected file as the modified profile image
    
    const toggleHidePassword =()=>{
      setShowPwState(!isShowPw);
    }

    useEffect(() => {
    }, [finalPassword]);

    useEffect(() => {
      getBlogInfo();
    },[])

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
              src={modifiedProfileImg}
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
              value={modifiedUserName}
              onChange={(e) => {
                setModifiedUserName(e.target.value);
              }}
            />
          </TextInputContainer>

          <TextInputContainer>
            <Text>블로그 이름</Text>

            <BlogNameInput
              placeholder=""
              value={modifiedBlogName}
                onChange={(e) => {
                  setModifiedBlogName(e.target.value);
                }}
            />
          </TextInputContainer>

          <TextInputContainer>
            <Text>블로그 소개</Text>

            <BlogDescriptionInput
              placeholder=""
              value={modifiedBlogDescription}
              onChange={(e) => {
                setModifiedBlogDescription(e.target.value);
              }}
            />
          </TextInputContainer>

          <TextInputContainer>
            <Text>비밀번호</Text>

            <PasswordInput
              placeholder=""
              type={isShowPw ? "text":"password"}
              value={modifiedPassword}
              onChange={(e) => {
                setModifiedPassword(e.target.value);
              }}
            />
            {/* {console.log(modifiedPassword)} */}
            <Icon onClick={toggleHidePassword}> {isShowPw ? <FaEyeSlash /> : <FaEye />}</Icon>
          </TextInputContainer>

          <TextInputContainer>
            <Text>비밀번호 재입력</Text>

            <PasswordInput
              placeholder=""
              type={isShowPw ? "text":"password"}
              value={modifiedRepeatPassword}
              onChange={(e) => {
                setModifiedRepeatPassword(e.target.value);
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
            {log()}
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
