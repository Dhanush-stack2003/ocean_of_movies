import React, { useEffect, useRef, useState } from "react";
import "./searchBar.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../header/header";
import useDebounce from "./useDebounce";
import DeleteHistory from "./deleteHistory";

interface suggestionProps {
  Title: string;
  imdbID: string;
  Year: string;
}

const SearchBar = () => {
  const [keywords, setKeywords] = useState<string>("");
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const debouncedValue = useDebounce({ value: keywords, delay: 500 });
  const searchRef = useRef<HTMLInputElement>(null);
  const [suggestion, setSuggestion] = useState<suggestionProps[]>([]);
  const [type, setType] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  
  const searchHandler = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const enteredValue = searchRef.current?.value.trim() || "";
    if (!enteredValue) return;
    setQuery(enteredValue);
    setSearchParams({ query: enteredValue, year, type });
    navigate(`/result?query=${enteredValue}&year=${year}&type=${type}`);

    const prev = JSON.parse(localStorage.getItem("recentSearch") || "[]");
    const updated = [
      enteredValue,
      ...prev.filter((item: string) => item !== enteredValue),
    ];
    localStorage.setItem("recentSearch", JSON.stringify(updated.slice(0, 5)));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeywords(value);

    if (!value.trim()) {
      setSuggestion([]);
      return;
    }
  };

  useEffect(() => {
    if (!debouncedValue) return;
    async function getSuggestion() {
      const requestMovie = await fetch(
        `https://www.omdbapi.com/?i=tt3896198&apikey=${
          import.meta.env.VITE_OMDB_KEY
        }&s=${debouncedValue}`
      );
      const result = await requestMovie.json();
      if (result.Search) {
        setSuggestion(result.Search.slice(0, 5));
      } else {
        setSuggestion([]);
      }
    }
    getSuggestion();
  }, [debouncedValue]);

  useEffect(() => {
    const recentHistory = JSON.parse(
      localStorage.getItem("recentSearch") || "[]"
    );
    setHistory(recentHistory);
  }, [query]);

  const deleteHistory = (idx:string) => {
    const deletedItem =  DeleteHistory(idx)
    setHistory(deletedItem);
  }

  const clearHistory = () => {
    localStorage.removeItem("recentSearch");
    setHistory([]);
  };

  const searchFromRecent = (item: string) => {
    const enteredValue = item;
    if (!enteredValue) return;
    setQuery(enteredValue);
    setSearchParams({ query: enteredValue, year, type });
    navigate(`/result?query=${enteredValue}&year=${year}&type=${type}`);

    const prev = JSON.parse(localStorage.getItem("recentSearch") || "[]");
    const updated = [enteredValue,...prev.filter((item: string) => item !== enteredValue)];
    localStorage.setItem("recentSearch", JSON.stringify(updated.slice(0, 5)));
  };

  return (
    <>
      <Header />
      <div className="searchbar">

        <div className="tagline">
        <h1>ocean of movies</h1>
        <p>The one stop for cine enthusiast.</p>
        </div>

        <div className="searchbar_input">
          <input
            type="text"
            placeholder="type movie name..."
            onFocus={() => setIsFocused(true)}
            onBlur={() =>
              setTimeout(() => {
                setIsFocused(false);
              }, 300)
            }
            ref={searchRef}
            onChange={(e) => handleInput(e)}
            onKeyDown={(e) => e.key === "Enter" && searchHandler(e)}
          />
          <button onClick={searchHandler}>Search</button>
          {isFocused && (
            <div className="search_history">
              {isFocused && suggestion.length === 0 && history.length > 0 ? (
                <div>
                  <p>
                    Recent searches:
                    <span onClick={clearHistory}>clear history</span>
                  </p>
                  <ul>
                    {history.map((item, idx) => {
                      return (
                        <div className="delete_history">
                        <li key={idx} onClick={() => searchFromRecent(item)}>
                          {item}
                        </li>
                          <span onClick={() => deleteHistory(item)}>X</span>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              ) : suggestion.length === 0 ? (
                <p>No result found</p>
              ) : (
                <ul>
                  {suggestion.map((item) => (
                    <li
                      key={item.imdbID}
                      onClick={() => searchFromRecent(item.Title)}
                    >
                      {item.Title} <span>{item.Year}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="filter_section">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">choose type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">choose year</option>
            {[...Array(2025 - 1950)].map((_, i) => {
              let year = 1950 + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
