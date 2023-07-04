import React from 'react';
import styles from "../styles/ProductList.module.css";
import ProductCard from './ProductCard';

const ProductList = ({pizzaList}) => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>THE BEST PIZZERIA IN TOWN</h1>
        <p className={styles.description}>
            Following traditional recipes and using classic methods, we bring in every pizza a slice of &#39;belle vita&#39; to you.
        </p>
        
        <div className={styles.wrapper}>
          {pizzaList.map(pizza => (
            <ProductCard key={pizza._id} pizza={pizza}/>
          ))}           
        </div>
    </div>
  )
}

export default ProductList;