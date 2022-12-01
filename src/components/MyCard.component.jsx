import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
<FontAwesomeIcon icon="fa-regular fa-address-card" />;
const MyCardComponent = ({
  title,
  description,
  image,
  price,
  _id,
  onDelete,
  quantity,
  onEdit,
}) => {
  const handleDeleteClick = () => {
    if (userData.email) {
      onDelete(_id);
    } else {
      alert("Please login to add items to cart");
    }
  };
  const [amount, setAmount] = useState(quantity);
  const [edit, setEdit] = useState(true);
  const handlePlusClick = () => {
    setAmount(amount + 1);
  };
  const handleMinusClick = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  const handleEditClick = () => {
    setEdit(!edit);
  };
  const handleUpdateClick = () => {
    console.log("update");
    onEdit(_id, amount);
    setEdit(!edit);
  };
  const userData = useSelector((state) => state.auth.userData);
  return (
    <div className="card col-3 m-1">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <h5 className="card-title">{price}$</h5>
      </div>
      <label className="card-title">
        Amount: {amount}
        {!edit && (
          <FontAwesomeIcon
            className="shopIcon"
            icon={faPlus}
            onClick={handlePlusClick}
          />
        )}
        {!edit && (
          <FontAwesomeIcon
            className="shopIcon"
            icon={faMinus}
            onClick={handleMinusClick}
          />
        )}
       
      </label>
      {!edit && (
          <button
            className="card-link btn btn-danger"
            onClick={handleUpdateClick}
          >
            Update
          </button>
        )}
      <div className="card-body">
        <button
          className="card-link btn btn-danger"
          onClick={handleDeleteClick}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          Delete
        </button>
        <button className="card-link btn btn-danger" onClick={handleEditClick}>
          <FontAwesomeIcon icon={faPen} />
          Edit
        </button>
      </div>
    </div>
  );
};
export default MyCardComponent;
