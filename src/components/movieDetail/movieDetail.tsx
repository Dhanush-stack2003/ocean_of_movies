import './movieDetail.css'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import type { movie } from '../../types';
import { toast } from 'react-toastify';

 const MovieDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false)
  const [loading,setLoading] = useState<boolean>(false);
  const apiKey = import.meta.env.VITE_OMDB_KEY;
  const [movieInfo,setMovieInfo]= useState<movie | null>(null);

  
  useEffect(()=>{
    async function fetchMovieDetail() {
    setLoading(true)
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
      const result = await res.json();
      setLoading(false)
      setMovieInfo({...result});  
    } catch (error) {
      console.log(error)
    }}

    fetchMovieDetail()
  },[id])

  
  useEffect(()=>{
      const getFavs = JSON.parse(localStorage.getItem("favourites") || "[]");
      const checkLiked = getFavs.find((movie: movie) => movie.imdbID === movieInfo?.imdbID);
      if(checkLiked){
        setLiked(true)
      }else{
        setLiked(false)
      }
  },[liked,movieInfo])


  const likeHandler = (movie:movie) => {
    const getLikedMovies = JSON.parse(localStorage.getItem('favourites') || '[]')
    const alreadyExist = getLikedMovies.find((e:movie)=>e.imdbID === movie.imdbID)
    if(!alreadyExist){
      setLiked(true)
      const updatedList =  [movie,...getLikedMovies]
      localStorage.setItem('favourites',JSON.stringify(updatedList))
      toast.success("Added to favourite")
    }else {
      const removeItem = getLikedMovies.filter((e:movie)=>e.imdbID !== movie.imdbID)
      localStorage.setItem('favourites',JSON.stringify(removeItem))
      setLiked(false)
      toast.success("Removed from favourite")
    }
   }

  return (
    <div className="movie_detail">
      {loading ? (
        <p>Fetching details...</p>
      ) : movieInfo && movieInfo.Response === "True" ? (
        <div className="movie_detail_container">
          <img src={movieInfo.Poster} alt="poster" />
         {liked ? <IoIosHeart size={40} className='liked' onClick={()=>likeHandler(movieInfo)}/> : <IoIosHeartEmpty size={40} className='icon' onClick={()=>likeHandler(movieInfo)}/> }
          <h1>
            {movieInfo.Title} - {movieInfo.Released}
         
          </h1>
          <p>
            <strong>Genre: </strong>
            {movieInfo.Genre}
          </p>
          <p>
            <strong>Director: </strong>
            {movieInfo.Director}
          </p>
          <p>
            <strong>Casts: </strong>
            {movieInfo.Actors}
          </p>
          <p>
            <strong>Plot: </strong>
            {movieInfo.Plot}
          </p>
          <p>
            <strong>Rating: </strong>
            {movieInfo.imdbRating}
          </p>
          <p>
            <strong>Language: </strong>
            {movieInfo.Language}
          </p>
          <p>
            <strong>Run time: </strong>
            {movieInfo.Runtime}
          </p>
        </div>
      ) : (
        <p>could't find the details.</p>
      )}
      <button onClick={() => navigate(-1)} className="go_back">
        Go Back
      </button>
    </div>
  );
}

export default MovieDetail
