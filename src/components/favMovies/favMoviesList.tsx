import React, { useMemo } from 'react'
import {Link} from 'react-router-dom'
import type {movie} from '../../types'

interface favMoviesProps {
    favMovies:movie[],
    currentPage:number,
    postPerPage:number
}

const FavMoviesList:React.FC<favMoviesProps> = ({favMovies,currentPage,postPerPage}) => {
    
    let indexOfLastPage = currentPage * postPerPage;
    let indexOfFirstPage = indexOfLastPage - postPerPage;

    const currentPost = useMemo(()=>{
        return favMovies.slice(indexOfFirstPage,indexOfLastPage)
    },[favMovies,indexOfFirstPage,indexOfLastPage])

    
  return (
    <div className="cards">
      {currentPost.map((item: movie, index: number) => (
        <Link to={`/movie/${item.imdbID}`}>
          <div className="card" key={index}>
            <img src={item.Poster} alt="" />
            <p>
              {item.Title} - <span>{item.Year}</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default FavMoviesList