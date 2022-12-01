import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "../styles/card.css";
import { useState } from "react";
<FontAwesomeIcon icon="fa-solid fa-cart-shopping" />;
const CardComponent = ({
  title,
  description,
  image,
  price,
  brand,
  id,
  onAdd,
}) => {
  const handleAddClick = () => {
    if (userData.email) {
      onAdd(id,amount);
    } else {
      alert("Please login to add items to cart");
    }
  };
  const userData = useSelector((state) => state.auth.userData);
  const [amount, setAmount] = useState(1);
  const handlePlusClick = () => {
    setAmount(amount + 1);
  };
  const handleMinusClick = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  return (
    <div className="card col-3 m-1">
      <img src={image} className="card-img-top" alt={brand} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <h5 className="card-title">{price}$</h5>
        <label className="card-title">Amount: </label>
        <FontAwesomeIcon
          className="shopIcon"
          icon={faPlus}
          onClick={handlePlusClick}
        />
        <label> {amount}</label>
        <FontAwesomeIcon
          className="shopIcon"
          icon={faMinus}
          onClick={handleMinusClick}
        />
      </div>
      <div className="card-body">
        <button className="card-link btn btn-warning" onClick={handleAddClick}>
          <FontAwesomeIcon icon={faShoppingCart} />
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default CardComponent;
