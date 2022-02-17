import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image
            src={`/images/telephone48.png`}
            width={32}
            height={32}
            alt=""
          />
        </div>
        <div className={styles.text}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>01973979369</div>
        </div>
      </div>

      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Home</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>

          <Image src={`/images/logo.png`} width={160} height={160} alt="" />

          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src={`/images/cart48.png`} width={48} height={48} alt="" />
            <div className={styles.counter}>{quantity}</div>
          </div>{" "}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
