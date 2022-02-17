import React, { useRef, useState } from "react";
import styles from "../styles/Featured.module.css";
import Image from "next/image";

const Featured = () => {
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
  const [slide, setSlide] = useState(0);
  const images = [
    "/images/f1.jpg",
    "/images/f2.jpg",
    "/images/f3.jpg",
    "/images/f4.jpg",
    "/images/f5.jpg",
  ];

  const handleArrow = (direction) => {
    if (direction === "l") {
      setSlide(slide !== 0 ? slide - 1 : 0);
    }
    if (direction === "r") {
      setSlide(slide !== images.length - 1 ? slide + 1 : images.length - 1);
    }
    // if (slide === 0) leftArrow.current.style.visibility = "hidden";
    // else leftArrow.current.style.visibility = "visible";
    // if (slide === images.length - 1)
    //   rightArrow.current.style.visibility = "hidden";
    // else rightArrow.current.style.visibility = "visible";
  };
  return (
    <div className={styles.container}>
      <div
        ref={leftArrow}
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}
      >
        <Image
          src={`/images/arrowl.png`}
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div
        className={styles.wrapper}
        style={{ transform: `translate(${-100 * slide}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.imageContainer} key={i}>
            <Image src={img} alt="" layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div
        ref={rightArrow}
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        <Image
          src={`/images/arrowr.png`}
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Featured;
