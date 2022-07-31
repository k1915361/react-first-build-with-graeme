import { useState } from "react";
import "./Form.css";
import Tooltip from "./Tooltip";
import { UsersPage, ListofUsers } from "../../data/itemLeader";

function FormReuse(props) {
  
  // Properties
  item = props.item;
  idKey = props.idKey;
  mutableKeys = props.mutableKeys;
  idSchema = props.idSchema;
  createSchema = props.createSchema;
  updateSchema = props.updateSchema;
  items = props.items;
  moduleLevels = [3, 4, 5, 6, 7];

  this.object = {
    a: 'a',
    b: 'b',
    c: 'c',
  }
  this.object.entries(this.item).map(item => {
    console.log(item)
  })

  // constructor(item, schema, items) {  }
  
  // const mutableKeys = ['UserFirstname','UserLastname','UserEmail','UserPassword','UserRegistered','UserUsertypeID', 'UserLevel','UserImageURL']
  // const mutableKeys = ['ItemName', 'ItemCode', 'ItemLevel','ItemLeaderID','ItemImageURL']
  
    
  // States
  
  // Methods
  
  const handleAdd = (e) => {
    setItem({...item, ['this.idKey']: props.onGetNewItemID()})
    handleAddItem(item);
  };

  const handleWhichSubmit = (e) => {
    e.preventDefault();
    props.item ? handleEdit(item) : handleAdd(e);
  };

  const handleEdit = (item) => {
    props.onEdit(item);
    closeEditForm();
  };

  const closeEditForm = () => {
    props.onCloseEditForm();
  };

  const handleAddItem = (item) => {
    if (handleItemValidations(item)) {
      props.onAddItem(item);
    }
  };

  const getTitleTooltipMessage = () => {
    return props.tooltipTitle ? props.tooltipTitle : "Add Item Form";
  };
  const getAddEditTooltipMessage = () => {
    return props.tooltipEdit ? props.tooltipEdit : "Add Item";
  };
  const getTitle = () => {
    return props.title ? props.title : "Add";
  };



  consthandleValueChange = (target) => {
    setItem({ ...item, [target.id]: target.value });
  };

  constTooltipInput = (id, message, value, placeholder) => {
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
  return (
    <div className="form">
      {tooltip(
        getTitleTooltipMessage(),
        <div className="title">{getTitle()}</div>
      )}

      <form onSubmit={handleWhichSubmit}>
        
        {TooltipInput(
          'ItemImageURL',
          "Item Image URL",
          item.ItemImageURL,
          "Image"
        )}

        {TooltipInput(
          'ItemName',
          handleItemNameValidation(item.ItemName) 
          ? "Item Name" : "Item Name e.g. Database",
          item.ItemName, 
          'Name'
        )}

        {tooltip(
          'Select Item Level',
          <select
            id={'ItemLevel'}
            value={item.ItemLevel}
            selected={item.ItemLevel ? item.ItemLevel : 3}
            placeholder={item.ItemLevel ? item.ItemLevel : "Level"}
            onChange={(e) => handleValueChange(e.target)}
          >
            {this.moduleLevels.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>          
        )}
        
        {TooltipInput(
          'ItemCode',
          handleItemCodeValidation(item.ItemCode) ? "Item Code" : "Item Code e.g. CI0123",
          item.ItemCode,
          "Code",
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

export default FormReuse;
