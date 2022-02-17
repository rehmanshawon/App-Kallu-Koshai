import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [fileLarge, setFileLarge] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [unit, setUnit] = useState("");
  const [offer, setOffer] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    const data2 = new FormData();
    data2.append("file", fileLarge);
    data2.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/kopotron-corporation/image/upload",
        data
      );
      const uploadRes2 = await axios.post(
        "https://api.cloudinary.com/v1_1/kopotron-corporation/image/upload",
        data2
      );

      const { url } = uploadRes.data;
      const { url2 } = uploadRes2.data;

      const newProduct = {
        title,
        desc,
        img: url,
        imgLarge: url2,
        price,
        countInStock,
        unit,
        offer,
        returnPolicy,
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
      setClose(true);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose preview image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Choose Large image</label>
          <input
            type="file"
            onChange={(e) => setFileLarge(e.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Price</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Count/Amount In Stock</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Count/Amount"
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Unit</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Kg/Litre/Piece"
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Special Offer</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Offer"
              onChange={(e) => setOffer(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Return Policy</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Return Policy"
              onChange={(e) => setReturnPolicy(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
