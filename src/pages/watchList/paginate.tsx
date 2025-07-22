import './paginate.css'
import {useNavigate } from 'react-router-dom'

interface paginateProps {
    currentPage:any,
    totalPost:number,
    postPerPage:number
}
const Paginate = ({currentPage,totalPost,postPerPage}:paginateProps) => {
    const navigate = useNavigate();
    const pageNumber:number[] = []
    for(let i=1;i<=Math.ceil(totalPost/postPerPage);i++){
        pageNumber.push(i)
    }

    const movePreviousPage = () => {
        if(pageNumber.length > 0) {
            currentPage(pageNumber[pageNumber.length - 1] - 1)
        }
    }

    const movetoNextPage = () => {
        if(pageNumber.length > 0) {
            currentPage(pageNumber[0] + 1)
        }
    }
   return (
     <>
       {totalPost > 10 && <div className="paginate">
         <button onClick={movePreviousPage}>previous</button>
         <ul>
           {pageNumber.map((number) => (
             <li onClick={() => currentPage(number)}>{number}</li>
           ))}
         </ul>
         <button onClick={movetoNextPage}>next</button>
       </div>}
       <button onClick={() => navigate(-1)} className="go_back">
         Go Back
       </button>
     </>
   );
};

export default Paginate;
