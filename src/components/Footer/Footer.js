import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import "./Footer.module.css";
import styles from "./Footer.module.css";
import {CommonButton }from "../../common";
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { Button } from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import {FaGithub} from "react-icons/fa"
import {FaInstagram} from "react-icons/fa"
import {FaReact} from "react-icons/fa";
import  {FaBootstrap} from  "react-icons/fa";
import {BiLogoSpringBoot} from "react-icons/bi";
import {BiSolidSchool} from "react-icons/bi";
import {BiEnvelope} from "react-icons/bi"
import {BiPhone} from "react-icons/bi"


 

export default function footer() {
   
  return (
    <MDBFooter bgColor='#f4f4f4' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
         
        
      </section>
       
      <section className=''>
        <MDBContainer >
        
        <div className='d-flex justify-content-end mt-3'> 
          
           
          <a href='https://www.google.com/' className='me-4 text-reset'>
             <FaGoogle />
          </a>
          <a href='https://www.instagram.com/' className='me-4 text-reset'>
             <FaInstagram/>
          </a>
          <a href='https://github.com/KEA-Allways' className='me-4 text-reset'>
             <FaGithub/>
          </a>
        </div>
        </MDBContainer>
      
        <MDBContainer className=' justify-content-between align-items-center'>
          <MDBRow className='mt-2'>
            <MDBCol md="4" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                Allways
              </h6>
              <p className={styles.p}>
              저희 Allways와 함께 여행을 떠나보시겠습니까? 언제든 여행을 그만두실수도 있습니다.
              </p>
              <div className='d-flex '>
                    <div className={styles.inputAreas}>
                    <form>
                        <input type="email" name="email" placeholder="Your Email" className={styles.footerInput} />
                    </form>
                    </div>
                    {/* <CommonButton variant="contained" size="small">구독</CommonButton>  */}
                    <SubscribeButton variant='contained' size='small'>구독</SubscribeButton>
                     
                </div>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Skills</h6>
              <p>
              <BiLogoSpringBoot className='me-3'/>
                 Spring boot 
                  
              </p>
              <p>

              <FaReact className='me-3'/>
                React 
                 
              </p>
              <p>
              <FaBootstrap className='me-3'/>
               bootstrap 
                 
              </p>
               
            </MDBCol>

             

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
              
                <BiSolidSchool className="me-3"/>
                
                Gachon University, ko-kr
              </p>
              <p>
                <BiEnvelope className="me-3"/>
                {/* <MDBIcon icon="envelope" className="me-3" /> */}
                info@example.com
              </p>
              <p>
                 <BiPhone className="me-3"/>
                 + 82 10 1234 5678
              </p>
               
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright: <span >Allways</span>
         
      </div>
    </MDBFooter>
  );
}

const SubscribeButton = styled(Button)`
    background: rgba(0,190,254);
    color: white;
    width: 156px;
    height: 45px;
    background : black;
    color : white;
    border: 1px solid #dadada;
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size : 16px;
    line-height: 45px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;

    &:hover {
        transform: scale(1.05);
        background: linear-gradient(to right, #c9ffbf, #ffafbd);
        transition: 0.5s;
    }
`;
