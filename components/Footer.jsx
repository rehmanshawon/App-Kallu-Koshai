import React from "react";
import styles from "../styles/Footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src={`/images/bg.png`} alt="" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            {" "}
            KALLU KOSHAI. FRESH MEAT FROM OUR OWN FARM{" "}
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR SHOPS</h1>
          <p className={styles.text}>
            Siddik Mansion, Puran Paltan #304.
            <br /> Dhaka, 1200
            <br /> 002-08950425
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            SUNDAY - THURSDAY
            <br /> 9:00 - 22:00
          </p>
          <p className={styles.text}>
            FRIDAY - SATURDAY
            <br /> 12:00 - 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
