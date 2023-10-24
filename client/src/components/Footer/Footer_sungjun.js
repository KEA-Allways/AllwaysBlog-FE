import React from 'react'
import styles from "./Footer.module.css";
import CopyButton from '../CopyButton/CopyButton';

function Footer() {
    return (
        <div className={styles.footerContainer}>
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    저희 Allways와 함께 여행을 떠나보시겠습니까?
                </p>
                <p className={styles.footerSubscriptionText}>
                    언제든 여행을 그만두실수도 있습니다.
                </p>
                <div className={styles.inputAreas}>
                    <form>
                        <input type="email" name = "email" placeholder = "Your Email" 
                        className={styles.footerInput}/>
                        <button className={styles.btnOutline}>구독</button>
                    </form>
                </div>
            </section>
            <section className={styles.footerSubscription}>
                <h2>Contact Us</h2><br />
                <h4>사용하시면서 불편하신점이 있으시다면</h4><br />
                <CopyButton content="kis07150@naver.com"/><br />
                <p>깃허브 : <a href='https://github.com/KEA-Allways/' target="_blank" rel="noopener noreferrer">
                    <img src='/img/githubLogo.png' alt="GitHub" width="32" height="32" />
                </a>
                </p>
            </section>
            <section>
                    <small>Allways © 2023</small>
            </section>
        </div>
    )
}

export default Footer