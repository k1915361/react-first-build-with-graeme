import './Card.css';

export default function Card(props) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------

  // View ----------------------------------------
  return (
    <div className='card' >
      {props.children}
    </div>
  )
}