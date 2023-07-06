import Image from 'next/image';
import React, { useState } from 'react';
import styles from "../styles/Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';
import axios from "axios";
import { useRouter } from "next/router";
import { loggedOutAdmin } from '../redux/adminSlice';
import Menu from './Menu';

const Navbar = () => {
    const [isActive, setActive] = useState("false");
    const [menu, setMenu] = useState(false);
    const [adminMenu, setAdminMenu] = useState(false);

    const router = useRouter();
    const quantity = useSelector((state) => state.cart.quantity);
    const admin = useSelector((state) => state.admin.isAdmin);

    const dispatch = useDispatch();

    const handleAdminMenu = () => {
        setAdminMenu(!adminMenu);
    }

    const handleToggle = () => {
    setActive(!isActive);
    setMenu(true);
    };

    const logoutClickHandler = async() => {
       try {
      await axios.get("http://localhost:3000/api/logout");
      dispatch(loggedOutAdmin(false));
      setActive("false");
      setMenu(false); //
      router.push("/");
    } catch (err) {
      setError(true);
    }
    }
    
  return (
    <>
    
    <div className={styles.container}>
        <div className={styles.item}>
            <div className={isActive ? `${styles.hamburgerMenuContainer}`: `${styles.hamburgerMenuContainer} ${styles.change}` } onClick={handleToggle}>
                 <div className={styles.bar1}></div>
                 <div className={styles.bar2}></div>
                 <div className={styles.bar3}></div>
            </div>
            <div className={styles.callButton}>
                <Image src="/img/telephone.png" alt="" width="32" height="32" layout={"responsive"} />
            </div>
            <div className={styles.texts}>
                <div className={styles.text}>Order Now!</div>
                <div className={styles.text}>(602) 867 1010</div>
            </div>
        </div>
        <div className={styles.item}>
            <ul className={styles.list}>
                <Link href="/" passHref>
            <li className={styles.listItem}>Homepage</li>
          </Link>
                <li className={styles.listItem}>Products</li>
                <li className={styles.listItem}>Menu</li>
                <Image src="/img/PizzaMarioLogoBosento.png" alt="" width="100" height="100" />
                <li className={styles.listItem}>Events</li>
                <li className={styles.listItem}>Blog</li>
                <li className={styles.listItem}>Contact</li>
            </ul>
        </div>
        <div className={styles.item}>
            {
            admin && (
               <div className={styles.adminMenuWrapper} onClick={handleAdminMenu}>
            <button className={styles.avatarButtonIcon} ><Image src="/img/adminAvatar.png" alt="admin-avatar-button-menu" width="32" height="32" /></button>
            <div className={!adminMenu ? `${styles.adminMenu}` : `${styles.animateMenu}`}>
                <ul className={styles.menuList}>
                    <Link href="/admin/dashboard" passHref>
                        <li className={styles.listItem}>Dashboard</li>
                    </Link>
                    
                    <li className={styles.listItem} onClick={logoutClickHandler}>Logout</li>
                </ul>
            </div>
            </div>
            
        )
        }
         <Link href="/cart" passHref>
            <div className={styles.cart}>
                <Image src="/img/cart.png" alt="" width="30" height="30" />
                <div className={styles.counter}>{quantity}</div>
            </div>
            </Link>
        </div>
        </div>
        {menu && (<Menu isActive={!isActive} handleToggle={handleToggle} admin={admin} logoutClickHandler={logoutClickHandler} />)
        }
        </>
  )
}

export default Navbar;