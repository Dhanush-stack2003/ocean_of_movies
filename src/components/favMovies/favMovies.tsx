import './favMovies.css'
import { useEffect, useState } from 'react'
import Paginate from '../../pages/watchList/paginate'
import FavMoviesList from './favMoviesList'
import type {movie} from '../../types'

const FavMovies= () => {
  const postPerPage = 10;
  const [currentPage,setCurrentPage] = useState<number>(1)
  const [FavMovies,setFavMovies] = useState<movie[]>([])
  
  useEffect(()=>{
      const getMovie = localStorage.getItem('favourites')
      setFavMovies(getMovie ? JSON.parse(getMovie) : '[]')   
    },[])
    
 return (
   <div className="favourite">
     <h1>Liked Movies 😊</h1>
     <div className="favMoviesContainer">
      <FavMoviesList postPerPage={postPerPage} favMovies={FavMovies} currentPage={currentPage}/>
     </div>
       <Paginate currentPage={setCurrentPage}  postPerPage={postPerPage} totalPost={FavMovies.length} />
   </div>
 );
}

export default FavMovies