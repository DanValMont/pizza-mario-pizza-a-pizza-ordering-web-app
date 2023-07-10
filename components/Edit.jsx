import { useState } from "react";
import styles from "../styles/Edit.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const Edit = ({ setCloseEdit, productEdit }) => {
  const router = useRouter();
  const [file, setFile] = useState(productEdit.img);
  const [title, setTitle] = useState(productEdit.title);
  const [description, setDescription] = useState(productEdit.description);
  const [prices, setPrices] = useState(productEdit.prices);
  const [extraOptions, setExtraOptions] = useState(productEdit.extraOptions);
  const [extra, setExtra] = useState(productEdit.extra);

  const changePrice = (e, index) => {
    const currentPrices = prices.slice();
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

      const create = await axios.put("/api/products/" + productEdit._id, newProduct);
      setCloseEdit(true);
      router.push("/");
      

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setCloseEdit(true)} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>Update {title}</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input
            className={styles.input}
            type="text"
            value={file}
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.input}
            rows={4}
            type="text"
            value={description}
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
              value={prices[0]}
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              value={prices[1]}
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              value={prices[2]}
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

export default Edit;