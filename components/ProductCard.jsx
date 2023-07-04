import React from 'react'
import styles from "../styles/ProductCard.module.css";
import Image from "next/image";
import Link from 'next/link';

const ProductCard = ({pizza}) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`} passHref>
        <div className={styles.img}>
        <Image src={pizza.img} alt="" width="500" height="500"  style={{cursor: "pointer"}}  /></div>
        </Link>
        <Link href={`/product/${pizza._id}`} passHref>
        <h1 className={styles.title}>{pizza.title}</h1>
        </Link>
        <span className={styles.price}>${pizza.prices[0]}</span>
        <p className={styles.description}>
          {pizza.description}
        </p>
        <Link href={`/product/${pizza._id}`} passHref>
          <p className={styles.more}>read more</p>
        </Link>
        </div>
  );
};

export default ProductCard;