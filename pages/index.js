import { useState } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import dbConnect from "../util/mongo";
import styles from "../styles/Home.module.css";

export default function Home({ productList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Kallu Koshai</title>
        <meta name="description" content="Best Meat Shop in Town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <ProductList productList={productList} />
      {!close && <Add setClose={setClose} />}
      {/* <ProductList productList={productList} /> */}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  await dbConnect();
  //const res = await axios.get("https://kallukoshai.vercel.app/api/products");
  let response = await fetch("https://kallukoshai.vercel.app/api/products");
  //let response = await fetch("http://localhost:3000/api/products");
  // extract the data
  let data = await response.json();
  console.log(data);
  return {
    props: {
      productList: data,
      admin,
    },
  };
};
