export default function input(props) {
    return(
        <div>
            <input
                type="text"
                defaultValue={props.defaultValue}
                required
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </div>
    )
}