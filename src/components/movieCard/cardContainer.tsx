import { toast } from "react-toastify";
import type {movie} from '../../types'
import {Link} from 'react-router-dom'

interface keyProps {
  MovieList: movie[];
  showMovies:boolean
}

const CardContainer = ({showMovies,MovieList}:keyProps) => {
  return (
    <div className="movieCard_container">
      {!showMovies ? <p className="fetch_text">Fetching movies...</p>
      : MovieList && MovieList.length > 0 ? (
        MovieList.map((movie) => (
          <div className="movieCard" key={movie.Year}>
            <Link to={`/movie/${movie.imdbID}`}>
              <img src={movie.Poster} alt="poster" />
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
            </Link>
            <button
              className="add_to_watchlist"
              onClick={(e) => {
                e.stopPropagation();
                const currentItem = JSON.parse(
                  localStorage.getItem("watchlist") || "[]"
                );
                const alreadyExist = currentItem.find(
                  (item: any) => item.imdbID === movie.imdbID
                );

                if (!alreadyExist) {
                  const newItem = [...currentItem, movie];
                  localStorage.setItem("watchlist", JSON.stringify(newItem));
                  toast.success("added to watchlist");
                } else {
                  toast.success("already in watchlist");
                }
              }}
            >
              Add to watchlist
            </button>
          </div>
        ))
      ) : (
        <div className="not_found_container">
          <p className="not_found">No result found!</p>
        </div>
      )}
    </div>
  );
}

export default CardContainer