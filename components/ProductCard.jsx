import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${product._id}`} passHref>
        <a>
          {" "}
          <Image src={product.img[0].path} alt="" width={500} height={500} />
        </a>
      </Link>
      <h1 className={styles.title}>{product.title} </h1>
      <span className={styles.price}>Tk.{product.price}</span>
      <p className={styles.desc}>{product.desc}</p>
    </div>
  );
};

export default ProductCard;
