import './Backdrop.css';

function Backdrop(props) {
    function handler(){
        props.onClick();
        props.onClickIcon();
    }

    return (
        <div className='backdrop' onClick={handler} />
    )
}

export default Backdrop;