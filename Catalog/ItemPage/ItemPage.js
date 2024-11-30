import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemContext } from "./context/ItemContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions.js";
import "./ItemPage.css";

const ItemPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { items } = useContext(ItemContext);
  const dispatch = useDispatch();

  const item = items.find((item) => item.id === parseInt(itemId));
  const [quantity, setQuantity] = useState(1);
  const [format, setFormat] = useState("Vinyl");

  if (!item) {
    return <div className="container">Item not found.</div>;
  }

  const handleAddToCart = () => {
    const itemToAdd = { ...item, quantity, format };
    dispatch(addToCart(itemToAdd));
    alert(`Added ${quantity} x ${format} of ${item.title} to cart!`);
    navigate("/cart");
  };

  return (
    <div className="container item-page mt-5">
      <div className="row">
        <div className="col-md-5">
          <img
            src={item.image}
            className="img-fluid rounded shadow"
            alt={`${item.artist} cover`}
          />
        </div>
        <div className="col-md-7">
          <h2 className="display-5">{item.artist} - {item.title}</h2>
          <p><strong>Genre:</strong> {item.genre}</p>
          <p><strong>Release Date:</strong> {item.releaseDate}</p>
          <p><strong>Price:</strong> ${item.price}</p>

          <div className="mt-4">
            <label htmlFor="quantity" className="form-label"><strong>Quantity:</strong></label>
            <input
              type="number"
              id="quantity"
              className="form-control w-50"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="format" className="form-label"><strong>Format:</strong></label>
            <select
              id="format"
              className="form-select w-50"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="Vinyl">Vinyl</option>
              <option value="Digital">Digital</option>
              <option value="CD">CD</option>
            </select>
          </div>

          <button className="btn btn-success mt-4" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
