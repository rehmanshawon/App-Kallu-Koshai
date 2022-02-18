import React, { useCallback, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import styles from "../../styles/Product.module.css";
import Image from "next/image";

import { useEffect } from "react";
import ImageViewer from "../../components/ImageViewer";
import dbConnect from "../../util/mongo";

//export default useMousePosition;

const Product = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0.0);
  const [xx, setX] = useState(0);
  const [yy, setY] = useState(0);
  const [cx, setCurrentX] = useState(0);
  const [cy, setCurrentY] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const dispatch = useDispatch();
  let style = {
    backgroundImage: "url(" + product.imgLarge[imageIndex].path + ")",
  };
  const lensRef = useRef(null);
  const zoomedRef = useRef(null);
  const imageRef = useRef(null);
  const imageGuideRef = useRef(null);
  let r = 0;
  for (var i = 0; i < product.RateReview.length; i++) {
    r += parseInt(product.RateReview[i].rate);
  }

  let rating = r / product.RateReview.length;
  let fraction = rating % 1;

  let starArray = [0, 0, 0, 0, 0];
  for (i = 0; i < parseInt(rating); i++) starArray[i] = 1;
  if (fraction > 0) {
    for (i = 0; i < 5; i++) {
      if (starArray[i] === 0) break;
    }
    starArray[i] = 0.5;
  }

  const handleClick = () => {
    let pr = product.price;
    dispatch(addProduct({ ...product, pr, qty }));
    // dispatch(addProduct(product));
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    //setCurrentX(e.pageX - xx);
    //setCurrentY(e.pageY - yy);
    // e = e || window.event;
    let lx = e.clientX - xx;
    let ly = e.clientY - yy;
    // lx -= window.pageXOffset;
    // ly -= window.pageYOffset;
    let endX = xx + imgWidth - lensRef.current.offsetWidth;
    let endY = yy + imgHeight - lensRef.current.offsetWidth;

    // let x =
    //   lensRef.current.offsetWidth / 2 + e.pageX - lensRef.current.offsetWidth;
    // let y = lensRef.current.offsetHeight / 2 + e.pageY; // - lensRef.current.offsetHeight; //- lensRef.current.offsetHeight;
    let x = e.clientX - lensRef.current.offsetWidth / 2;
    let y = e.clientY - lensRef.current.offsetHeight / 2;
    if (x > endX) {
      x = endX;
    }
    if (x < xx) {
      x = xx;
    }
    if (y > endY) {
      y = endY;
    }
    if (y < yy) {
      y = yy;
    }
    lensRef.current.style.left = x + "px";
    lensRef.current.style.top = y + "px";
    // document.getElementById("lens").style.left = x + "px";
    // document.getElementById("lens").style.top = y + "px";
    let deltaX = e.pageX - xx;
    let deltaY = e.pageY - yy;
    let xRatio = (deltaX / imageRef.current.offsetWidth) * 100; // find the displacement ratio of mouse on image  windoow
    let yRatio = (deltaY / imageRef.current.offsetHeight) * 100;

    zoomedRef.current.style.backgroundPosition =
      "+" + xRatio + "% +" + yRatio + "%";
  };
  const hideZoomedImage = () => {
    document.getElementById("imgZoomed").style.visibility = "hidden";
    lensRef.current.style.visibility = "hidden";
    document.getElementById("imgZoomed").style.backgroundPosition =
      0 + "px " + 0 + "px";
    lensRef.current.style.left = 0;
    lensRef.current.style.top = 0;
    imageGuideRef.current.innerHTML = "Roll over image to zoom in";
    //console.log(product.imgLarge);
  };
  const shoowZoomedImage = (e) => {
    const mainImg = document.getElementById("imgOriginal");
    mainImg.style.cursor = "pointer";
    let oImageLeft = mainImg.getBoundingClientRect().x;
    let oImageTop = mainImg.getBoundingClientRect().y;
    setX(oImageLeft);
    setY(oImageTop);
    setImgWidth(mainImg.offsetWidth);
    setImgHeight(mainImg.offsetHeight);

    document.getElementById("imgZoomed").style.backgroundPosition =
      0 + "px " + 0 + "px";
    lensRef.current.style.left = 0;
    lensRef.current.style.top = 0;
    lensRef.current.style.visibility = "visible";
    document.getElementById("imgZoomed").style.visibility = "visible";
    imageGuideRef.current.innerHTML = "Click image to open expanded view";
  };
  return (
    <>
      {showImageViewer && (
        <ImageViewer
          setShowImageViewer={setShowImageViewer}
          product={product}
          imageIndex={imageIndex}
        />
      )}
      <div className={styles.container}>
        <div className={styles.container__left}>
          <div className={styles.left__image}>
            <div ref={imageRef} className={styles.previewImage}>
              <div id="lens" className={styles.imgzoomlens} ref={lensRef}></div>
              <Image
                id="imgOriginal"
                src={product.img[imageIndex].path}
                objectFit="cover"
                width={600}
                height={600}
                // layout="fill"
                quality={100}
                alt=""
                onMouseMove={handleMouseMove}
                onMouseEnter={shoowZoomedImage}
                onMouseLeave={hideZoomedImage}
                onClick={() => setShowImageViewer(true)}
              />
              <span ref={imageGuideRef}>Roll over image to zoom in</span>
            </div>

            <div>
              <div className={styles.thumbnailArea}>
                {product.img.map((image, index) => (
                  <span
                    className={styles.thumbnail}
                    key={index}
                    onClick={() => setImageIndex(index)}
                  >
                    <Image
                      src={image.path}
                      objectFit="cover"
                      // width={60}
                      // height={60}
                      layout="fill"
                      quality={100}
                      alt=""
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.left__info}>
            <div
              id="imgZoomed"
              style={style}
              className={styles.left__imageZoomed}
              ref={zoomedRef}
            ></div>
            <p className={styles.left__name}>{product.title} </p>
            <p>Price: Tk.{product.price} </p>
            <p>Special Offer: {product.offer} </p>
            <p>Description: {product.desc}</p>
            <p>Return Policy: {product.returnPolicy}</p>
            {starArray.map((val, index) =>
              val === 1 ? (
                <span key={index}>
                  <Image
                    src={`/images/ratingstar.png`}
                    width={32}
                    height={32}
                    alt=""
                  />
                </span>
              ) : val === 0.5 ? (
                <span key={index}>
                  <Image
                    src={`/images/ratingstar-half.png`}
                    width={32}
                    height={32}
                    alt=""
                  />
                </span>
              ) : (
                <span key={index}>
                  <Image
                    src={`/images/ratingstar-empty.png`}
                    width={32}
                    height={32}
                    alt=""
                  />
                </span>
              )
            )}

            <h4 style={{ paddingLeft: "10px" }}>
              {product.RateReview.length} Ratings
            </h4>
          </div>
        </div>
        <div className={styles.container__right}>
          <div className={styles.right__info}>
            <p>
              Price: <span>Tk.{price === 0 ? product.price : price}</span>
            </p>
            <p>
              {" "}
              Status:
              <span>
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}{" "}
              </span>
            </p>
            <p>
              Qty
              <select
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                  setPrice(product.price);
                }}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </p>
            <p>
              Unit: <span>{product.unit}</span>
            </p>
            <p>
              <button type="button" onClick={handleClick}>
                ADD TO CART
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.container__bottom}>
        <p>Product Reviews</p>
        {product.RateReview.map((val, index) => (
          <div className={styles.bottom__content} key={index}>
            <div className={styles.bottom__rating}>
              <div className={styles.rating__image}>
                <Image src={val.starImg} alt="" width={170} height={32} />
              </div>
              <div className={styles.rating__date}>
                <span>{val.updatedAt}</span>
              </div>
            </div>
            <p>by {val.customer}</p>
            <p>{val.review} </p>
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  // get the current environment
  let dev = process.env.NODE_ENV !== "production";
  let DEV_URL = process.env.DEV_URL;
  let PROD_URL = process.env.PROD_URL;

  await dbConnect();
  const res = await axios.get(
    `${dev ? DEV_URL : PROD_URL}/api/products/${params.id}`
  );
  return {
    props: {
      product: res.data,
    },
  };
};
export default Product;
