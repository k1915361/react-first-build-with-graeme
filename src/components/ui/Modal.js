import './Modal.css';

function Modal(props) {
    function confirmHandler() {
        props.onConfirm();
    }

    function closeHandler() {
        props.onClose();
    }

    function deleteHandler() {
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