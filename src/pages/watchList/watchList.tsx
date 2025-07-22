import { useEffect, useState } from "react"
import './watchList.css'
import WLPost from "./WL_Post"
import Paginate from "./paginate";
import type {movie} from '../../types'


const WatchList = () => {
    const [watchList,setWatchList] = useState<movie[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const postPerPage = 10

    useEffect(()=>{
        const getList = localStorage.getItem('watchlist')
        setWatchList(getList ? JSON.parse(getList) : [])
    },[])

    const paginate = (pagenumber:number)=> {
      window.scrollTo({
        top:0,
        behavior:'smooth'
      })
      setCurrentPage(pagenumber)
    }


  return (
    <div className="watchlist">
      <h1 className="watchList_heading">My WatchLists</h1>
      <WLPost watchList={watchList} setWatchList={setWatchList} currentPage={currentPage} onPaginate={paginate} postPerPage={postPerPage}/>
      <Paginate totalPost={watchList.length} currentPage={setCurrentPage} postPerPage={postPerPage}/>
    </div>
  );
}

export default WatchList