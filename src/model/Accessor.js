import API from '../components/api/API.js';

class Accessor {
  constructor(props){  
    this.endpointStr = props.endpointStr 
    this.getEndpoint = (id) => { return `${props.endpointStr}/${id}` }
  }

  create = (record) =>      API.post( this.endpointStr, record );
  read = (id) =>            API.get( this.getEndpoint(id) );
  update = (id, record) =>  API.put( this.getEndpoint(id), record );
  delete = (id) =>          API.delete( this.getEndpoint(id) );
  list = () =>              API.get( this.endpointStr );
}

export default Accessor;