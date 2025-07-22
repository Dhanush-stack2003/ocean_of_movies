import './modal.css'
const Modal = ({onConfirm,onCancel}:{onConfirm:()=>void,onCancel:()=>void}) => {

  return (
    <div className='modal'>
     <div className="modalCard">
        <p>Are you sure about remove the item from watchlist?</p>
        <div className="cta">
            <button onClick={onCancel}>Cancel</button>
            <button onClick={onConfirm}>Confirm</button>
        </div>
     </div>
    </div>
  )
}

export default Modal