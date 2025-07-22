import type React from "react";
import { useMemo, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import type { movie } from "../../types";
import Modal from "./modal";

interface WL_props {
  watchList: movie[];
  setWatchList: React.Dispatch<React.SetStateAction<movie[]>>;
  currentPage: number;
  postPerPage: number;
  onPaginate: (pageNumber:number)=>void;
}

const WLPost:React.FC<WL_props> = ({watchList,setWatchList,onPaginate,currentPage,postPerPage}) => {

  const [showModal,setShowModal] = useState<boolean>(false);
  const [selectedId,setSelectedId] = useState<string | null>('')
  let indexOfLastPage = currentPage * postPerPage;
  let indexOfFirstPage = indexOfLastPage - postPerPage

  const currentPost = useMemo(()=>{
    return watchList.slice(indexOfFirstPage,indexOfLastPage)
  },[currentPage,watchList,indexOfFirstPage,indexOfLastPage])


  const confirmDelete = () => {
    const removeItem = watchList.filter((item) => item.imdbID !== selectedId);
    localStorage.setItem("watchlist", JSON.stringify(removeItem));
    setWatchList(removeItem);

    const currentUpdatedItems = removeItem.slice(indexOfFirstPage,indexOfLastPage)
    if(currentUpdatedItems.length === 0 && currentPage > 1) {
      onPaginate(currentPage - 1);
    }
    toast.success("Removed from watchlist");
    setShowModal(false)
    setSelectedId(null)
  }
  
  const removeHandler = (imdbID: string) => {
    setSelectedId(imdbID)
    setShowModal(true)
  };

  return (
    <>
    {showModal &&
     <Modal 
     onConfirm={confirmDelete}
     onCancel={()=>{
     setShowModal(false)
     setSelectedId(null)
     }}/>}

      <div className="watchList_container">
        {currentPost && currentPost.length === 0 ? (
          <p className="no_watchlist">☹ You have no watchlist</p>
        ) : (
          currentPost.map((movie:movie) => (
            <div className="watchList_card" key={movie.Year}>
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt="poster" />
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
              </Link>
              <button
                className="watchlist_btn"
                onClick={() => removeHandler(movie.imdbID)}
              >
                Remove from Watchlist
              </button>
            </div>
          ))
        )}
      </div> 
    </>
  );
};

export default WLPost;
