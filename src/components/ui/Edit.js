import './Edit.css'
import Form from './Form'

export default function Edit(props) {
    const onCloseEditForm = () => {
        props.onCloseEditForm();
    }   
    return (
        <div className='edit' >
            <Form 
                onCloseEditForm={onCloseEditForm}
                tooltipTitle='Edit Module Form'
                tooltipEdit='Edit Module'
                title='Edit'
            />
        </div>
    )
}
