import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./movieCard.css";
import type { movie } from "../../types";
import CardContainer from "./cardContainer";

interface keyProps {
  MovieList: movie[];
  movieTitle: string;
  releaseYear: string;
}

const MovieCard: React.FC<keyProps> = ({MovieList,movieTitle,releaseYear}) => {
  const [showMovies, setShowMovies] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMovies(true);
    }, 2000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="movieCard_section">
      <h1 className="result">
        Result for {movieTitle} - {releaseYear || "all"}
      </h1>
      <CardContainer showMovies={showMovies} MovieList={MovieList}/>
        <button className="go_home" onClick={()=>navigate('/')}>Go home</button>
    </div>
  );
};

export default MovieCard;
