import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdbreact';
import "./Footer.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import styles from "./Footer.module.css";


export default function footer() {
  return (
    <MDBFooter bgColor='#f4f4f4' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
         
        
      </section>

      <section className=''>
        <MDBContainer >
        
        <div className='d-flex justify-content-end mt-3'> 
          
           
          <a href='https://www.google.com/' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='https://www.instagram.com/' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='https://github.com/KEA-Allways' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
        </MDBContainer>
      
        <MDBContainer className=' justify-content-between align-items-center'>
          <MDBRow className='mt-2'>
            <MDBCol md="4" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
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
                    <button type="button" className="btn btn-dark" style={{marginLeft:"3px", padding:"20px"}}> </button>
                </div>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Skills</h6>
              <p>
              <i class="fas fa-power-off"  ></i>
                <span style={{marginLeft:"10px"}}>Spring boot</span>
                  
              </p>
              <p>

              <i class="fab fa-react"></i>
              <span style={{marginLeft:"10px"}}> React</span>
                 
              </p>
              <p>
              <i class="fab fa-bootstrap"></i>  
              <span style={{marginLeft:"10px"}}>bootstrap</span>
                 
              </p>
               
            </MDBCol>

             

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
              
                    <MDBIcon icon="home" className="me-2" />
                
                Gachon University, ko-kr
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 89
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