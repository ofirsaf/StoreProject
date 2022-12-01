import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MyCardComponent from "../components/MyCard.component";
import { cloneDeep } from "lodash";
const MyCardPage = () => {
  const [card, setCard] = useState([]);
  useEffect(() => {
    getMyProducts();
  }, []);

  const getMyProducts = () => {
    axios
      .get("/prod")
      .then((res) => {
        setCard(res.data);
      })
      .catch((err) => {
        console.log("Axios error", err);
        toast.error("Something went wrong, please try again later");
      });
  };
  const handleDeleteClick = (id) => {
    console.log("id", id);
    axios
      .delete(`/prod/${id}`)
      .then((res) => {
        let newArr = cloneDeep(card);
        newArr = newArr.filter((item) => item._id !== id);
        setCard(newArr);
      })
      .catch((err) => {
        console.log("Axios error", err);
        toast.error("Something went wrong, please try again later");
      });
  };
  const handleEditClick = (id, quantity) => {
    let obj = card.find((item) => item._id === id);
    let newObj = {
      prodDescription: obj.prodDescription,
      prodTitle: obj.prodTitle,
      prodPrice: obj.prodPrice,
      prodImage: obj.prodImage,
      prodQuantity: quantity,
    };
    axios
      .put("/prod/" + id, newObj)
      .then((res) => {
        console.log("res", res);
        getMyProducts();
      })
      .catch((err) => {
        console.log("Axios error", err);
        toast.error("Something went wrong, please try again later");
      });
  };
  const renderCard = (arr) => {
    return arr.map((item) => {
      return (
        <MyCardComponent
          key={item._id}
          _id={item._id}
          title={item.prodTitle}
          price={item.prodPrice}
          image={item.prodImage}
          quantity={item.prodQuantity}
          description={item.prodDescription}
          onDelete={handleDeleteClick}
          onEdit={handleEditClick}
        />
      );
    });
  };
  return (
    <Fragment>
      <h1>Your Shop Card</h1>
      <div className="row">{renderCard(card)}</div>
    </Fragment>
  );
};
export default MyCardPage;
