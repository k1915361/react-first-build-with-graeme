import './Edit.css'
import Form from './Form'

export default function Edit(props) {
    const onCloseEditForm = () => {
        props.onCloseEditForm();
    }   
    return (
        <div className='edit' >
            <Form 
                record={props.record}
                onCloseEditForm={onCloseEditForm}
                onEdit={(record) => props.onEdit(record)}   
                tooltipTitle={'Edit '+props.recordType+' Form'}
                tooltipEdit={'Edit '+ props.recordType}
                recordType={props.recordType}
                title='Edit'
            />
        </div>
    )
}
