import { useState } from "react";
import "./Form.css";
import Tooltip from "./Tooltip";
import { UsersPage, ListofUsers } from "../../model/datafiles/users";

function Form(props) {
  // Properties
  let image, name, level, code, lId, id;
  const recordType = props.recordType; // 'Module' or 'User'
  const idType = props.recordType+'ID'; // 'Module' or 'User' + 'ID'
  if (props.record) {
    let r = props.record;
    // image = r.recordType+ImageURL;
    // name = r.recordType+Name;
    // level = r.recordType+Level;
    // code = r.recordType+Code;
    // lId = r.recordType+leaderID;
    // id = r.recordType+ID;
    
    image = r[recordType+'ImageURL'];
    name = r[recordType+'Name'];
    level = r[recordType+'Level'];
    code = r[recordType+'Code'];
    lId = r[recordType+'leaderID'];
    id = r[recordType+'ID'];
  }

  // States
  const [record, setRecord] = useState('');

  // Methods
  // UsersPage();

  const handleAdd = (e) => {
    setRecord({...record, [recordType+'ID']: props.onGetNewRecordID()})
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

  // if (code && "" === ModuleCode) {
    // setModule({...record, 
    //   ['ModuleCode']:code,
    //   ['ModuleName']:name,
    //   ['ModuleLevel']:level,
    //   ['ModuleImageURL']:image,
    //   ['ModuleID']:id,
  // }


  const autoFillEditForm_ = () => {
    if (
      code &&
      code !== record[recordType+'Code'] &&
      name !== record[recordType+'Name'] &&
      level !== record[recordType+'Level'] &&
      image !== record[recordType+'ImageURL'] &&
      id !== record[recordType+'ID']
    ) {
      setRecord({...record, 
        [recordType+'Code']:code,
        [recordType+'Name']:name,
        [recordType+'Level']:level,
        [recordType+'ImageURL']:image,
        [recordType+'ID']:id,    
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
    if (!handleModuleNameValidation(record[recordType+'Name'])) {
      message += 'Name is Invalid, e.g. Computing'
    }
    else if (!handleModuleLevelValidation(record[recordType+'Level'])) {
      message += 'Level is Not Selected'      
    } 
    else if (!handleModuleCodeValidation(record[recordType+'Code'])){
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

  console.log(record)

  return (
    <div className="form">
      {tooltip(
        getTitleTooltipMessage(),
        <div className="title">{getTitle()}</div>
      )}

      <form onSubmit={handleWhichSubmit}>
        
        {TooltipInput(
          recordType+'ImageURL',
          recordType+" Image URL",
          record[recordType+'ImageURL'],
          "Image"
        )}

        {TooltipInput(
          'ModuleName',
          handleModuleNameValidation(record[recordType+'Name']) 
          ? "Module Name" : "Module Name e.g. Database",
          record[recordType+'Name'], 
          'Name'
        )}

        {tooltip(
          'Select Module Level',
          <select
            id={'ModuleLevel'}
            value={record[recordType+'Level']}
            defaultValue={record[recordType+'Level'] ? record[recordType+'Level'] : 3}
            selected={record[recordType+'Level'] ? record[recordType+'Level'] : 3}
            placeholder={record[recordType+'Level'] ? record[recordType+'Level'] : "Level"}
            onChange={(e) => handleValueChange(e.target)}
          >
            {moduleLevels.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>          
        )}
        
        {TooltipInput(
          'ModuleCode',
          handleModuleCodeValidation(record[recordType+'Code']) ? recordType+" Code" : recordType+" Code e.g. CI0123",
          record[recordType+'Code'],
          "Code",
        )}

        {tooltip(
          "Select Module Leader",
          <select
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
