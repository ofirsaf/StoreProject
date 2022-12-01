import { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "./card.page.css";
import axios from "axios";
import lodash from "lodash";
import CardComponent from "../components/Card.component";
const CardPage = () => {
  const [card, setCard] = useState([]);
  const [category, setCategory] = useState([]);
  const [selected, setSelected] = useState("choose");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState(minPrice + 1);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const handleMinPrice = (e) => {
    setMinPrice(e.target.value);
    setMaxPrice(parseInt(e.target.value) + 1);
  };
  const handleMaxPrice = (e) => {
    setMaxPrice(
      minPrice > e.target.value ? parseInt(minPrice) + 1 : e.target.value
    );
  };
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((data) => {
        const arr = [];
        arr[0] = "choose";
        for (let i = 0; i < data.data.products.length; i++) {
          arr.push(data.data.products[i].category);
        }
        const unique = lodash.uniq(arr);
        setCategory(unique);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBtnclIck = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((data) => {
        const arr = [];
        for (let i = 0; i < data.data.products.length; i++) {
          if (
            (data.data.products[i].category === selected ||
              selected === "choose") &&
            data.data.products[i].price >= minPrice &&
            data.data.products[i].price <= maxPrice
          ) {
            arr.push(data.data.products[i]);
          }
        }
        setCard(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddClick = (e, amount) => {
    console.log(amount);
    axios.get("https://dummyjson.com/products").then((data) => {
      for (let i = 0; i < data.data.products.length; i++) {
        if (data.data.products[i].id === e) {
          console.log(data.data.products[i]);
          let dataToSend = {
            // id: data.data.products[i].id,
            prodTitle: data.data.products[i].title,
            prodPrice: data.data.products[i].price,
            prodImage:
              data.data.products[i].images.length > 0
                ? data.data.products[i].images[0]
                : data.data.products[i].images,
            prodDescription: data.data.products[i].description,
            prodQuantity: amount,
          };
          axios
            .post("/prod", dataToSend)
            .then((data) => {
              toast("new card created 😎 ");
            })
            .catch((err) => {
              console.log(err);
              toast.error("Product already added to your card");
            });
        }
      }
    });
  };
  return (
    <Fragment>
      <h1>Wellcome to api products page</h1>
      <div id="booking" className="section">
        <div className="section-center">
          <div className="container-fluid">
            <div className="booking-form">
              <div className="row">
                <div className="col-3">
                  <div className="form-group">
                    <span className="form-label">Type</span>
                    <select
                      id="room_select"
                      className="form-control"
                      value={selected}
                      onChange={handleChange}
                    >
                      {category.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <span className="select-arrow"></span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <span className="form-label">Min Price</span>
                    <input
                      className="form-control"
                      id="minprice"
                      type="number"
                      min="0"
                      value={minPrice}
                      onChange={handleMinPrice}
                    />
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <span className="form-label">Max Price</span>
                    <input
                      className="form-control"
                      id="maxprice"
                      type="number"
                      min="0"
                      value={maxPrice}
                      onChange={handleMaxPrice}
                    />
                  </div>
                </div>
                <div className="form-btn col-3">
                  <button
                    id="search"
                    className="submit-btn m-4"
                    onClick={handleBtnclIck}
                  >
                    Check availability
                  </button>
                </div>
              </div>
              <div className="row">
                {card.map((item) => (
                  <CardComponent
                    title={item.title}
                    description={item.description}
                    image={
                      item.images.length > 0 ? item.images[0] : item.images
                    }
                    price={item.price}
                    brand={item.brand}
                    id={item.id}
                    onAdd={handleAddClick}
                    key={item.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default CardPage;
