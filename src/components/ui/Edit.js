import './Edit.css'
import Form from './Form'

export default function Edit(props) {
    const onCloseEditForm = () => {
        props.onCloseEditForm();
    }   
    return (
        <div className='edit' >
            <Form 
                module={props.module}
                onCloseEditForm={onCloseEditForm}
                onEdit={(module) => {
                    props.onEdit(module); 
                    console.log(module)}
                }   
                tooltipTitle='Edit Module Form'
                tooltipEdit='Edit Module'
                title='Edit'
            />
        </div>
    )
}
