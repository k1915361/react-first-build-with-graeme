import { useState } from "react";
import "./Form.css";
import Tooltip from "./Tooltip";
import { UsersPage, ListofUsers } from "../../data/moduleLeader";
import Input from "./Input";

function Form(props) {
  // Properties
  let image, name, level, code, lId, id;

  if (props.module) {
    let m = props.module;
    image = m.ModuleImageURL;
    name = m.ModuleName;
    level = m.ModuleLevel;
    code = m.ModuleCode;
    lId = m.moduleleaderID;
    id = m.ModuleID;
  }

  // States
  const [module, setModule] = useState('');

  // Methods
  UsersPage();

  const handleAdd = (e) => {
    setModule({...module, ['ModuleID']: props.onGetNewModuleID()})
    handleAddModule(module);
  };

  const handleWhichSubmit = (e) => {
    // console.log(module)
    e.preventDefault();
    props.module ? handleEdit(module) : handleAdd(e);
  };

  const handleEdit = (module) => {
    props.onEdit(module);
    closeEditForm();
  };

  const closeEditForm = () => {
    props.onCloseEditForm();
  };

  const handleAddModule = (module) => {
    if (handleModuleValidations(module)) {
      props.onAddModule(module);
    }
  };

  const getTitleTooltipMessage = () => {
    return props.tooltipTitle ? props.tooltipTitle : "Add Module Form";
  };
  const getAddEditTooltipMessage = () => {
    return props.tooltipEdit ? props.tooltipEdit : "Add Module";
  };
  const getTitle = () => {
    return props.title ? props.title : "Add";
  };

  // if (code && "" === ModuleCode) {
    // setModule({...module, 
    //   ['ModuleCode']:code,
    //   ['ModuleName']:name,
    //   ['ModuleLevel']:level,
    //   ['ModuleImageURL']:image,
    //   ['ModuleID']:id,
  // }


  const autoFillEditForm_ = () => {
    if (
      code &&
      code !== module.ModuleCode &&
      name !== module.ModuleName &&
      level !== module.ModuleLevel &&
      image !== module.ModuleImageURL &&
      id !== module.ModuleID
    ) {
      setModule({...module, 
        ['ModuleCode']:code,
        ['ModuleName']:name,
        ['ModuleLevel']:level,
        ['ModuleImageURL']:image,
        ['ModuleID']:id,    
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

  const handleModuleValidations = (module) => {
    let message = '';
    if (!handleModuleNameValidation(module.ModuleName)) {
      message += 'Name is Invalid, e.g. Computing'
    }
    else if (!handleModuleLevelValidation(module.ModuleLevel)) {
      message += 'Level is Not Selected'      
    } 
    else if (!handleModuleCodeValidation(module.ModuleCode)){
      message += 'Code is Invalid, e.g. CI0123';
    }
    if(message){
      // console.alert(message)
      window.alert(message)
      // console.log(message + ` message='' `)
      return false;
    }
    else {
      return true;
    }
  };

  const handleValueChange = (target) => {
    setModule({ ...module, [target.id]: target.value });
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

  return (
    <div className="form">
      {tooltip(
        getTitleTooltipMessage(),
        <div className="title">{getTitle()}</div>
      )}

      <form onSubmit={handleWhichSubmit}>
        
        {TooltipInput(
          'ModuleImageURL',
          "Module Image URL",
          module.ModuleImageURL,
          "Image"
        )}

        {TooltipInput(
          'ModuleName',
          handleModuleNameValidation(module.ModuleName) 
          ? "Module Name" : "Module Name e.g. Database",
          module.ModuleName, 
          'Name'
        )}

        {tooltip(
          'Select Module Level',
          <select
            id={'ModuleLevel'}
            value={module.ModuleLevel}
            defaultValue={module.ModuleLevel ? module.ModuleLevel : 3}
            // defaultValue is not working on options js - search google
            placeholder={module.ModuleLevel ? module.ModuleLevel : "Level"}
            onChange={(e) => handleValueChange(e.target)}
          >
            {moduleLevels.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>          
        )}
        
        {TooltipInput(
          'ModuleCode',
          handleModuleCodeValidation(module.ModuleCode) ? "Module Code" : "Module Code e.g. CI0123",
          module.ModuleCode,
          "Code",
        )}

        {tooltip(
          "Select Module Leader",
          <select
            id='ModuleLeaderId'
            value={module.ModuleLeaderId}
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
