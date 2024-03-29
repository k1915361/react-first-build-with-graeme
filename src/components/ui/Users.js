import './Users.sass';
import User from './User.js';
import { useState, useEffect } from 'react';
import Edit from './Edit.js';
import { Records, LoadingMessage } from '../../model/datafiles/getRecords';
import Accessor from '../../model/Accessor.js'

function Users() {
  // Properties
  const endPoint = 'Users'
  const method = 'GET'
  const getRecords = Records(endPoint, method)
  const loadingMessage = LoadingMessage && LoadingMessage
  const endpointStr = 'Users'
  const accessor = new Accessor({endpointStr})
  const recordType = 'user'
  
  const recordName = 'User'
  const id_ = `${recordName}ID`; 
  const fname_ = `${recordName}Firstname`; 
  const lname_ = `${recordName}Lastname`; 
  const email_ = `${recordName}Email`; 
  const password_ = `${recordName}Password`; 
  const registered_ = `${recordName}Registered`; 
  const typeid_ = `${recordName}UsertypeID`; 
  const level_ = `${recordName}Level`; 
  const image_ = `${recordName}ImageURL`;

  // States
  const [ selectedId , selectId ] = useState();
  const [ editing, setEditing ] = useState(null);

  const [ test, setTest ] = useState([])
  
  const didMount = async () => {
    await accessor.list().then((result) => { setTest(result.response) } )
  }
  
  useEffect(() => { didMount() }, [  ] )
  
  const records = test 
  
  // Context

  // Methods
  const handleModify = async (record) => {
    const outcome = await accessor.update(record[id_], record);

    outcome.success ? didMount() : console.log(outcome.response);
  };

  const handleAdd = async (record) => {
    const outcome = await accessor.create(record);
    didMount()
  }

  const handleDelete = async (id) => {
    const outcome = await accessor.delete(id);
    didMount()
  }

  const isEditing = (id) => {
    return id === selectedId;
  }

  const closeEditForm = () => {
    setEditing(null);
  }
  
  const openEditForm = (record) => {
    return (
    <Edit 
      record={record}
      onCloseEditForm={() => closeEditForm()} 
      onEdit={(record) => handleModify(record)}
      key={record[id_]}
      recordType='User'
    />
    )
  }

  // View
  return (
    <div className='cardContainer'>
      {/* <div className='title'>Users</div> */}
      {
        records && records.map((record) => (
          isEditing(record.UserID) 
          ? 
          <Edit
            record={record}
            onCloseEditForm={() => closeEditForm()} 
            onEdit={(record) => handleModify(record)}
            key={record[id_]}
            recordType='User'      
          />
            : 
          <User 
            onIsEditing={() => selectId(record.UserID)} 
            isEditing={isEditing} 
            onEdit={(record) => handleModify(record)}
            record={record} 
            key={record.UserID}
            openEditForm={(record) => openEditForm(record)}
          >  
          </User>    
        ))  
      }
    </div>
  )
}

export default Users;