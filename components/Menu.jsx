import React from "react";
import styles from "../styles/Menu.module.css";
import Link from "next/link";

function Menu({ isActive , handleToggle, admin, logoutClickHandler }) {
  


  return (
    <div
      className={
        isActive
          ? `${styles.menu_wrapper} ${styles.active}`
          : `${styles.menu_wrapper_inactive}`
      }
    >
      {isActive ? (
        <div className={styles.menu_list_container}>
          <ul>
            { admin && (<li className={isActive ? styles.visible : null}>
              <Link href="/admin/dashboard">
                <a onClick={handleToggle}>
                  <span>Dashboard</span>
                </a>
              </Link>
            </li>)}
            <li className={isActive ? styles.visible : null}>
              <Link href="/">
                <a
                  onClick={handleToggle}
                >
                  <span>Products</span>
                </a>
              </Link>
            </li>
            <li className={isActive ? styles.visible : null}>
              <Link href="#">
                <a
                  onClick={handleToggle}
                >
                  <span>Menu</span>
                </a>
              </Link>
            </li>
            <li className={isActive ? styles.visible : null}>
              <Link href="#">
                <a>
                  <span
                    onClick={handleToggle}
                  >
                    Events
                  </span>
                </a>
              </Link>
            </li>
            <li className={isActive ? styles.visible : null}>
              <Link href="#">
                <a
                  onClick={handleToggle}
                >
                  <span>Blog</span>
                </a>
              </Link>
            </li>
            <li className={isActive ? styles.visible : null}>
              <Link href="#">
                <a
                  onClick={handleToggle}
                >
                  <span>Contact</span>
                </a>
              </Link>
            </li>
            { admin && (<li className={isActive ? styles.visible : null}>
                <a onClick={logoutClickHandler}>
                  <span>Logout</span>
                </a>
            </li>)}
          </ul>
        </div>
      ) : (<div className={styles.menu_list_container}>
          <ul>
            { admin && (<li className={`${styles.visible} ${styles.closing}`}>
              <Link href="/admin/dashboard">
                <a>
                  <span>Dashboard</span>
                </a>
              </Link>
            </li>)}
            <li className={`${styles.visible} ${styles.closing}`}>
              <Link href="/">
                <a>
                  <span>Products</span>
                </a>
              </Link>
            </li>
            <li className={`${styles.visible} ${styles.closing}`}>
              <Link href="#">
                <a>
                  <span>Menu</span>
                </a>
              </Link>
            </li>
            <li className={`${styles.visible} ${styles.closing}`}>
              <Link href="#">
                <a>
                  <span>Events</span>
                </a>
              </Link>
            </li>
            <li className={`${styles.visible} ${styles.closing}`}>
              <Link href="#">
                <a>
                  <span>Blog</span>
                </a>
              </Link>
            </li>
            <li className={`${styles.visible} ${styles.closing}`}>
              <Link href="#">
                <a>
                  <span>Contact</span>
                </a>
              </Link>
            </li>
            { admin && (<li className={`${styles.visible} ${styles.closing}`}>
                <a onClick={logoutClickHandler}>
                  <span>Logout</span>
                </a>
            </li>)}
          </ul>
        </div>) }
    </div>
  );
}

export default Menu;