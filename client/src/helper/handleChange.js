export default function handleChange(event, state, setState){
    let value = event.target.value;
    let name = event.target.name;

    setState({
        ...state, [name]: value
    })

}