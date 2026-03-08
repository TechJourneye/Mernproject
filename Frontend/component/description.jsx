
export default function Description({text,need=true}){

    return(
        <p className="card-text"> {text.length > 60 &&need
    ? text.slice(0, 60) + "..."
    : text}</p>
    )
}