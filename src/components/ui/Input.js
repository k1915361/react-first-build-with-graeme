import './Input.css'

export default function input(props) {
    return(
        <div className='input'>
            <input
                type="text"
                defaultValue={props.defaultValue}
                required
                value={props.value ? props.value : ''}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </div>
    )
}