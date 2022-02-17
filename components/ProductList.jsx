import React from "react";
import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductList = ({ productList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BEST MEAT IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet. Et commodi autem 33 itaque ducimus id error
        praesentium et exercitationem illum qui aliquam enim quo officiis vitae.
        Et harum quis qui doloremque perspiciatis et ipsam facere id delectus
        temporibus ea dolores officia eos modi voluptas sed tempore mollitia.
        Non esse distinctio est amet voluptatibus eos rerum omnis quo beatae
        error hic voluptate velit sit dolor velit. Eum accusantium itaque ut
        perferendis facere sit dicta reiciendis sit internos quia.
      </p>
      <div className={styles.wrapper}>
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
