import SearchBar from "./components/searchBar/searchBar";
import MovieCard from "./components/movieCard/movieCard";
import MovieDetail from "./components/movieDetail/movieDetail";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WatchList from "./pages/watchList/watchList";
import { ToastContainer } from "react-toastify";
import FavMovies from "./components/favMovies/favMovies";
import PageNotFound from "./components/pageNotFound/PageNotFound";

function App() {
  console.log("file is loaded 1")
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || "";
  const type = searchParams.get("type") || "";
  const query = searchParams.get("query") || "";
  const [title, setTitle] = useState("");
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const requestHandler = async () => {
     console.log("file is loaded 2");
      try {
        setTitle(query);
        const requestMovie = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${
            import.meta.env.VITE_OMDB_KEY
          }&s=${query}&type=${type}&y=${year}`
        );
        console.log("request url" + requestMovie)
        const result = await requestMovie.json();
        setMovieList(result.Search || []);
      } catch (error) {
        console.log("error" +error);
      }
    };
    requestHandler();
  }, [year, type, query]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route
          path="/result"
          element={
            <MovieCard
              MovieList={movieList}
              movieTitle={title}
              releaseYear={year}
            />
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path='/fav-list' element={<FavMovies/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
