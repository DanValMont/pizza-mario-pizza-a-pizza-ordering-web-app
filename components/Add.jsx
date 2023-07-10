import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const Add = ({ setClose }) => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
    console.log(extraOptions);
  };

  const deleteExtra = (optionExtra) => {
    console.log(optionExtra);
    console.log(extraOptions);
    const filterExtraOption = extraOptions.filter(option => option.text !== optionExtra);
    
    setExtraOptions(filterExtraOption);
    console.log(extraOptions);
  }

  const handleCreate = async () => {
    
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads-pizza-la-sensazione");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/revelationecommerce/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        description,
        prices,
        extraOptions,
        img: url,
      };

      const create = await axios.post("/api/products", newProduct);
      setClose(true);
      router.push("/");
      

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>Add a New Product</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
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
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.input}
            rows={4}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
             &#43;
            </button>
          </div>
          {extraOptions.length > 0 &&(
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <div className={styles.extraWrapper} key={option.text}>
              <span onClick={() => deleteExtra(option.text)} className={
            styles.deleteExtra}>
                 X
              </span>
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
              </div>
            ))}
          </div>)}
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;