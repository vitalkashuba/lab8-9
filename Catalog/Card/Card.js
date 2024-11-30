import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ id, image, genre, artist, title, releaseDate, price }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/catalog/item/${id}`);
  };

  return (
    <div className="card catalog-card bg-dark text-light">
      <img
        src={image}
        className="card-img-top catalog-card-img"
        alt={`${artist} cover`}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{artist} - {title}</h5> {/* Display artist and title */}
        <p className="card-text catalog-text">
          <strong>Genre:</strong> {genre}
        </p>
        <p className="card-text catalog-text">
          <strong>Release:</strong> {releaseDate}
        </p>
        <p className="card-text price">
          <strong>Price:</strong> ${price}
        </p>
        <button className="btn btn-secondary mt-auto" onClick={handleViewMore}>
          View More
        </button>
      </div>
    </div>
  );
};

export default Card;
