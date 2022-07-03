import './Modal.css';

function Modal(props) {
    const confirmHandler = () => {
        props.onConfirm();
    }

    const closeHandler = () => {
        props.onClose();
    }

    const deleteHandler = () => {
        closeHandler();
        confirmHandler();
    }

    return (
        <div className='modal'>
            Are you sure?
            <button className='btn' onClick={deleteHandler}>Yes</button>
            <button className='btn' onClick={closeHandler}>No</button>
        </div>
    )
}

export default Modal;