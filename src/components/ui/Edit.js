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
                onEdit={(module) => props.onEdit(module)}   
                tooltipTitle='Edit Module Form'
                tooltipEdit='Edit Module'
                title='Edit'
                // onModuleSelect={(id) => props.onModuleSelect(id)}
            />
        </div>
    )
}
