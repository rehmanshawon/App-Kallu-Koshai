import React, { useRef, useState } from "react";
import styles from "../styles/ImageViewer.module.css";
import Image from "next/image";
const ImageViewer = ({ product, setShowImageViewer, imageIndex }) => {
  const [enlarge, setEnlarge] = useState(false);
  const [imgIndex, setImageIndex] = useState(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [bg, setBG] = useState(0);
  const imgRef = useRef(null);
  let style = enlarge
    ? {
        backgroundImage:
          "url(" +
          product.imgLarge[imgIndex === null ? imageIndex : imgIndex].path +
          ")",
        backgroundRepeat: "no-repeat",

        backgroundPosition: "center",
      }
    : {
        backgroundImage: "none",
      };
  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!enlarge) return;

    // imgRef.current.style.left = x - e.clientX + "px";
    // imgRef.current.style.top = y - e.clientY + "px";
    // imgRef.current.style.backgroundPosition =
    //       "-" + (x - e.pageX) / 100 + "% -" + (y - e.pageY) / 100 + "%";

    var _tmp = window
      .getComputedStyle(imgRef.current, null)
      .backgroundPosition.trim()
      .split(/\s+/);
    var positions = {
      left: _tmp[0],
      top: _tmp[1],
      numbers: {
        left: parseFloat(_tmp[0]),
        top: parseFloat(_tmp[1]),
      },
      units: {
        left: _tmp[0].replace(/\d+/, ""),
        top: _tmp[1].replace(/\d+/, ""),
      },
    };
    setBG(positions.numbers.left);
    // var halfWidth =
    //   product.imgLarge[imgIndex === null ? imageIndex : imgIndex].path.width /
    //   2;
    // var halfHeight =
    //   product.imgLarge[imgIndex === null ? imageIndex : imgIndex].path.height /
    //   2;
    imgRef.current.style.backgroundPosition =
      "-" +
      (3000 - e.nativeEvent.offsetX) +
      "px -" +
      (2000 - e.nativeEvent.offsetY) +
      "px";

    // imgRef.current.style.backgroundPosition =
    //   "-" + (900 / 6000) * 100 + "px -" + (600 / 4000) * 100 + "px";

    //imgRef.current.style.backgroundPositionY = "-" + e.offsetY + "px";
  };
  const getMousePosition = (e) => {
    e.preventDefault();
    imgRef.current.style.backgroundPosition = "center";
    //setBG(imgRef.current.style.backgroundSizeX);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {enlarge && (
          <div
            style={style}
            className={styles.imgContainer}
            onClick={() => setEnlarge(!enlarge)}
            ref={imgRef}
            onMouseOver={getMousePosition}
            onMouseMove={handleMouseMove}
          >
            {" "}
          </div>
        )}
        {!enlarge && (
          <div className={styles.imgContainerSmall}>
            <Image
              src={product.img[imgIndex === null ? imageIndex : imgIndex].path}
              alt=""
              //   layout="fill"
              width={900}
              height={600}
              objectFit="contain"
              quality={100}
              className={styles.zoomIn}
              onClick={() => setEnlarge(!enlarge)}
            />
          </div>
        )}

        <div className={styles.infoContainer}>
          <p className={styles.infoTitle}>{product.title}</p>{" "}
          <p className={styles.infoDesc}>{product.desc}</p> <p>{bg}</p>
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
        <div className={styles.close} onClick={() => setShowImageViewer(false)}>
          {" "}
          <span>X</span>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
