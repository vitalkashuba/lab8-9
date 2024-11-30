import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./Topbar/Topbar";
import Cards from "./Cards/Cards";
import Footer from "../Home/Footer/Footer";
import ItemPage from "./ItemPage/ItemPage";
import { ItemProvider, ItemContext } from "./ItemPage/context/ItemContext";
import { fetchItems } from "./CatalogAPI";
import Spinner from "../Spinner/Spinner";
import "../Catalog/Catalog.css";

const Catalog = () => {
  const location = useLocation();
  const isItemPage = location.pathname.includes("/item/");

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const { searchText, selectedGenre, selectedRelease, selectedArtist, items: filteredItems } = useContext(ItemContext);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const filters = {
          genre: selectedGenre,
          releaseDate: selectedRelease,
          artist: selectedArtist,
          search: searchText,
        };
    
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
    
        const data = await fetchItems(filters);
        setItems(data);
      } catch (error) {
        console.error("Failed to load items", error);
      } finally {
        setLoading(false);
      }
    };
    

    loadItems();
  }, [searchText, selectedGenre, selectedRelease, selectedArtist]);

  return (
    <ItemProvider>
      <div className="catalog-container">
        {!isItemPage && <Topbar />} {}
        <div className="catalog-header">
          <h1 className="catalog-title">Browse Available Music</h1>
          <div className="catalog-divider"></div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<Cards items={filteredItems} />} />
            <Route path="item/:itemId" element={<ItemPage />} />
          </Routes>
        )}
        <Footer />
      </div>
    </ItemProvider>
  );
};

export default Catalog;