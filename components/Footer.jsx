import React from 'react'
import styles from "../styles/Footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bgFooter.jpg" objectFit='cover' layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID. THE PIZZA MARIO, ALWAYS FRESH AND TASTY.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>1654 R. Don Road #304. <br/> New York, 85022 <br/> (602) 867-1010</p>
          <p className={styles.text}>12 Beekman Court, Albany <br/> New York, 12211 <br/> (518) 877-6812</p>
          <p className={styles.text}>2272 Geneva Street <br/> New York, 10016 <br/> (575) 376-2281</p>
          <p className={styles.text}>1994 Westwood Avenue, Farmingdale <br/> New York, 11735 <br/> (516) 777-3090</p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY <br/> 9:00 - 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY <br/> 12:00 - 00:00
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer