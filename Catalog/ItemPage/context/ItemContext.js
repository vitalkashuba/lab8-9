// context/ItemContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = "http://localhost:5000";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRelease, setSelectedRelease] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");

  // Fetch items from API when filters (genre, release, artist) change
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const filters = {
          genre: selectedGenre,
          releaseDate: selectedRelease,
          artist: selectedArtist,
        };
        const response = await axios.get(`${API_BASE_URL}/api/clips`, { params: filters });
        setItems(response.data);
        setFilteredItems(response.data); // Initially set filtered items to match fetched items
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, [selectedGenre, selectedRelease, selectedArtist]);

  // Frontend filtering by song title only (case and space insensitive)
  useEffect(() => {
    if (searchText) {
      const normalizedSearch = searchText.toLowerCase().replace(/\s+/g, " ").trim();
      const filtered = items.filter((item) =>
        `${item.artist} ${item.title}`.toLowerCase().includes(normalizedSearch)
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items); // Reset to all items when search text is empty
    }
  }, [searchText, items]);

  return (
    <ItemContext.Provider
      value={{
        items: filteredItems, // Provide filtered items to the app
        setItems,
        searchText,
        setSearchText,
        selectedGenre,
        setSelectedGenre,
        selectedRelease,
        setSelectedRelease,
        selectedArtist,
        setSelectedArtist,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
