import './User.scss';
import { useState } from 'react';
// import { apiRequest } from '../api/apiRequest.js';
import Card from './Card.js';
import Tooltip from './Tooltip.js';
// import Form from './FormReuse.js';

function User(props) {
  // Properties
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
  const message = {
    [id_]: 'ID',
    [image_]: 'Image',
    [fname_]: 'First Name',
    [lname_]: 'Last Name',
    [email_]: 'Email',
    [password_]: 'Password',
    [registered_]: 'Registered State',
    [registered_+true]: 'Registered',
    [registered_+false]: 'Not Registered',
    [typeid_]: 'User Type ID',
    [level_]: 'Level 3 - 7' ,
  }
  const User = props.record;
  
  // States
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser ] = useState('');
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
  
  User && user === '' && setUser(User);

  // Methods
  const renderParagraph = (value) => {
    return (
      <p>{value}</p>
    )
  }

  const renderRegistered = () => {
    return (
      <p>{message[registered_+user[registered_]]}</p>
    )
  }

  const handleTextChangeTEST = (target) => {
    console.log(target.id, target.value)
    setUser({...user, [target.id]: target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)

    // setUser(...user, e);
    props.onEdit(user);
  }

  const renderWhich = (prop, value) => {
    value = prop === registered_ ? message[prop+user[prop]] : value
    // prop === registered_ && console.log( message[prop+user[prop]])

    return (
      prop === image_ 
      ? renderImage(value) 
      : renderParagraph( value )
    )
  }

  const renderTextInput = (prop, value) => {
    return (
      <input 
        id={prop}   
        prop={prop} 
        type='text' 
        placeholder={prop === registered_ ? message[prop+user[prop]]: value} 
        defaultValue={value} 
        onChange={(e) => {handleTextChangeTEST(e.target); console.log(e.target.id)}}
      />
    )
  }

  const TooltipInput = (prop) => {
    const value = user[prop];
    const message_ = prop === registered_ ? message[prop+user[prop]] : message[prop]  ;    

    return renderTooltip( message_, 
      renderOnClickSetIsEditing(
        isEditing 
        ? (prop === registered_ ? renderRegisterdOption(prop, value) : renderTextInput(prop, value)) : renderWhich(prop, value)
      )
    )
  }

  const renderSelect = (prop, value, children) => {
    return (
      <select  
        id={prop}  
        prop={prop}
        value={value}
        onChange={(e) => handleTextChangeTEST(e.target)}
      >
        <option value={false} >Not Registered</option> 
        <option value={true} >Registered</option>
        {/* {children} */}
      </select>
    )
  }
    
  const renderRegisterdOption = (prop, value) => {
    return (
      renderSelect(prop, value,
        <>
          <option value={false} >Not Registered</option> 
          <option value={true} >Registered</option> 
        </>
      )
    )
  }

  const renderTooltip = (message, children) => {
    return <Tooltip message={message}>
      {children}
    </Tooltip>
  }

  const renderOnClickSetIsEditing = (children) => {
    return <div onClick={() => setIsEditing(true)}>
      {children}
    </div>
  }

  const renderImage = (value) => {
    return (
      <img className='userThumbnail' src={value} alt=''/>
    )
  }
  
    
  // VIEW
  return (
    <div >
      {renderTooltip('To Edit, Click on Card',
        <div className='user' >
          {User ? 
            <Card>
                
              {isEditing 
              ? 
                <form 
                  onSubmit={(e) => {handleSubmit(e); }}
                >
                  {TooltipInput(image_) }
                  {TooltipInput(fname_) }
                  {TooltipInput(lname_) }
                  {TooltipInput(email_) }
                  {TooltipInput(password_) }
                  {TooltipInput(registered_) }
                  {TooltipInput(typeid_) }
                  {TooltipInput(level_)}
                  <button onClick={() => setIsEditing(!isEditing)}>X</button>
                  <button type="submit" onClick={() => {setIsEditing(!isEditing); props.onEdit(user)}}>O</button>
                </form>
                :
                <div onClick={() =>setIsEditing(true)}>
                  {renderImage(user[image_])}
                  {renderParagraph(user[fname_])}
                  {renderParagraph(user[lname_])}
                  {renderParagraph(user[email_])}
                  {renderParagraph(user[password_])}
                  {renderRegistered(user[registered_])}
                  {renderParagraph(user[typeid_])}
                  {renderParagraph(user[level_])}
                </div>
              }
            </Card>    
          : 
            loadingMessage
          }
        </div>    
      )}
    </div>
  )
}

export default User;
