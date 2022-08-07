import { useState } from "react";
import "./Form.css";
import Tooltip from "./Tooltip.js";
import { Records, LoadingMessage } from "../../model/datafiles/getRecords";
import tableOfUsers from '../../model/datafiles/tableOfUsers.js'

function Form(props) {
  // Properties
  let image, name, level, code, lId, id;
  const recordType = props.recordType; // 'Module' or 'User'
  
  // MODULE SPECIFIC, MOVE TO MODULES.
  const strID = recordType+'ID'; // 'Module' or 'User' + 'ID'
  const strImageURL = recordType+'Image'; //  
  const strName = recordType+'Name'; 
  const strLevel = recordType+'Level'; 
  const strCode = recordType+'Code'; 
  const strLeaderID = recordType+'LeaderID'; 
  
  if (props.record) {
    const r = props.record;
    
    image = r[strImageURL];
    name = r[strName];
    level = r[strLevel];
    code = r[strCode];
    lId = r[strLeaderID];
    id = r[strID];
  }

  const endPoint = 'Users'
  const method = 'GET'
  const records = Records(endPoint, method)
  
  const ListofUsers = records && records
  
  // UserList()
  // ListofUsers
  
  // States
  const [record, setRecord] = useState('');
  
  // Methods
  const editProperty = (property, value) => {
    setRecord({ ...record, [property]: value })
  }

  const handleAdd = (e) => {
    setRecord({...record, [strID]: props.onGetNewRecordID()})
    handleAddRecord(record);
  };

  const handleWhichSubmit = (e) => {
    e.preventDefault();
    props.record ? handleEdit(record) : handleAdd(e);
  };

  const handleEdit = (record) => {
    props.onEdit(record);
    closeEditForm();
  };

  const closeEditForm = () => {
    props.onCloseEditForm();
  };

  const handleAddRecord = (record) => {
    if (handleRecordValidations(record)) {
      props.onAddRecord(record);
    }
  };

  const getTitleTooltipMessage = () => {
    return props.tooltipTitle ? props.tooltipTitle : "Add "+ recordType +" Form";
  };
  const getAddEditTooltipMessage = () => {
    return props.tooltipEdit ? props.tooltipEdit : "Add "+ recordType;
  };
  const getTitle = () => {
    return props.title ? props.title : "Add";
  };
  
  const autoFillEditForm_anotherVersion = () => {
    if (code && "" === record[strID]) {
      setRecord({...record, 
        [strCode]:code,
        [strName]:name,
        [strLevel]:level,
        [strImageURL]:image,
        [strLeaderID]:lId,
        [strID]:id,
        }
      )
    }
  }

  const autoFillEditForm_ = () => {
    if (
      code &&
      code !== record[strCode] &&
      name !== record[strName] &&
      level !== record[strLevel] &&
      image !== record[strImageURL] &&
      id !== record[strID]
    ) {
      setRecord({...record, 
        [strCode]:code,
        [strName]:name,
        [strLevel]:level,
        [strImageURL]:image,
        [strLeaderID]:lId,
        [strID]:id,    
    })
    }
  };
  autoFillEditForm_();

  const handleModuleCodeValidation = (code) => {
    if (code && code.trim().match(/^[A-Z]{2}[0-9]{4}$/g)) {
      return true;
    } else {
      return false;
    }
  };

  const handleModuleNameValidation = (name) => {
    if (name && name.match(/^[A-z]{2,}/)) {
      return true;
    } else {
      return false;
    }
  };

  const handleModuleLevelValidation = (level) => {
    console.log(level ? level : `''`)
    if (level) {
      return true;
    } else {
      return false;
    }
  };

  const handleRecordValidations = (record) => {
    let message = '';
    if (!handleModuleNameValidation(record[strName])) {
      message += 'Name is Invalid, e.g. Computing'
    }
    else if (!handleModuleLevelValidation(record[strLevel])) {
      message += 'Level is Not Selected'      
    } 
    else if (!handleModuleCodeValidation(record[strCode])){
      message += 'Code is Invalid, e.g. CI0123';
    }
    if(message){
      window.alert(message)
      return false;
    }
    else {
      return true;
    }
  };

  const handleValueChange = (target) => {
    setRecord({ ...record, [target.id]: target.value });
  };

  const TooltipInput = (id, message, value, placeholder) => {
    return (
      <Tooltip message={message}>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          // value={value}
          defaultValue={value}
          onChange={(e) => handleValueChange(e.target)}
        />
      </Tooltip>
    );
  };

  const tooltip = (message, children) => {
    return (
      <Tooltip message={message}>
        {children}
      </Tooltip>
    )
  }

  // VIEW
  var moduleLevels = [3, 4, 5, 6, 7];

  return (
    <div className="form" key={id}>
      {tooltip(
        getTitleTooltipMessage(),
        <div className="title">{getTitle()}</div>
      )}

      <form onSubmit={handleWhichSubmit}>
        
        {TooltipInput(
          strImageURL,
          recordType+" Image URL",
          record[strImageURL],
          "Image"
        )}

        {TooltipInput(
          'ModuleName',
          handleModuleNameValidation(record[strName]) 
          ? "Module Name" : "Module Name e.g. Database",
          record[strName], 
          'Name'
        )}

        {tooltip(
          'Select Module Level',
          <select
            id={'ModuleLevel'}
            value={record[strLevel]}
            // defaultValue={record[strLevel] ? record[strLevel] : 3}
            selected={record[strLevel] ? record[strLevel] : 3}
            placeholder={record[strLevel] ? record[strLevel] : "Level"}
            onChange={(e) => handleValueChange(e.target)}
          >
            {moduleLevels.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>          
        )}
        
        {TooltipInput(
          strCode,
          handleModuleCodeValidation(record[strCode]) ? recordType+" Code" : recordType+" Code e.g. CI0123",
          record[strCode],
          "Code",
        )}

        {tooltip(
          "Select Module Leader",
          <select
            key={recordType+'LeaderId'}  
            id={recordType+'LeaderId'}
            value={record[recordType+'LeaderId']}
            onChange={(e) => handleValueChange(e.target)}
          >
            {ListofUsers ? (
              ListofUsers.map((u) => (
                <option key={u.UserID}>
                  {u.UserFirstname} {u.UserLastname}
                </option>
              ))
            ) : (
              <option>Loading Module Leaders</option>
            )}
          </select>
        )}

        {tooltip(
          "Cancel",
          <button className="button" onClick={closeEditForm}>
            X
          </button>
        )}

        {tooltip(
          getAddEditTooltipMessage(),
          <button className="button">+</button>
        )}
      </form>
    </div>
  );
}

export default Form;
