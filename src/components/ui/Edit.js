import './Edit.css'
import Form from './Form'

export default function Edit(props) {
    const onCloseEditForm = () => {
        props.onCloseEditForm();
    }   
    return (
        <div>
            <Form onCloseEditForm={onCloseEditForm}/>
        </div>
    )
}
