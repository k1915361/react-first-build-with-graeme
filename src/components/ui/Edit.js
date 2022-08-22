import './Edit.css'
import Form from './Form.js'

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
        onValidation={(module) => props.onValidation(module)}
        tooltipTitle={'Edit ' + props.recordType + ' Form'}
        tooltipEdit={'Edit ' + props.recordType}
        formTitle='Edit'
        recordType={props.recordType}
        title='Edit'
      />
    </div>
  )
}
