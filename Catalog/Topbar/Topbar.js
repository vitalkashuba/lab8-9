import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ItemContext } from "../ItemPage/context/ItemContext";
import "./Topbar.css";

const Topbar = () => {
  const {
    searchText,
    setSearchText,
    setSelectedGenre,
    setSelectedRelease,
    setSelectedArtist,
  } = useContext(ItemContext);

  const location = useLocation();
  const isItemPage = location.pathname.includes("/item/");

  const onClear = () => {
    setSelectedGenre("");
    setSelectedRelease("");
    setSelectedArtist("");
    setSearchText("");
  };

  return (
    <div className="topbar-container">
      <div className="topbar bg-dark text-light py-3">
        <div className="container-fluid d-flex align-items-center gap-3">
          <div className="filters d-flex gap-3">
            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                id="genreDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={isItemPage} 
              >
                Genre
              </button>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="genreDropdown">
                {["Rock", "Metal", "Indie", "Alternative"].map((genre) => (
                  <li key={genre}>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedGenre(genre)}
                      disabled={isItemPage} 
                    >
                      {genre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                id="releaseDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={isItemPage}
              >
                Release
              </button>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="releaseDropdown">
                {["2016", "2014", "2003", "1999", "1998", "1997", "1994"].map((release) => (
                  <li key={release}>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedRelease(release)}
                      disabled={isItemPage}
                    >
                      {release}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                id="artistDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={isItemPage}
              >
                Artist Names
              </button>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="artistDropdown">
                {["mitski", "Korn", "MSI", "Muse"].map((artist) => (
                  <li key={artist}>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedArtist(artist)}
                      disabled={isItemPage}
                    >
                      {artist}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by artist, genre, etc."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            disabled={isItemPage} 
          />
          <button
            className="btn btn-success apply-button ms-auto"
            type="button"
            onClick={onClear}
            disabled={isItemPage} 
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;