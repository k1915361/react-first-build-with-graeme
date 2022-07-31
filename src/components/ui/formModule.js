function formModule() {
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
      code !== item.ModuleCode &&
      name !== item.ModuleName &&
      level !== item.ModuleLevel &&
      image !== item.ModuleImageURL &&
      id !== item.ModuleID
    ) {
      setItem({...item, 
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

  const handleModuleValidations = (item) => {
    let message = '';
    if (!handleModuleNameValidation(item.ModuleName)) {
      message += 'Name is Invalid, e.g. Computing'
    }
    else if (!handleModuleLevelValidation(item.ModuleLevel)) {
      message += 'Level is Not Selected'      
    } 
    else if (!handleModuleCodeValidation(item.ModuleCode)){
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

}