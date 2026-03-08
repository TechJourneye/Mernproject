

export default function ErrorPage({ error= "An error occurred" }){
    return(
        <div className="row">
            <div className="alert alert-warning col-5 offset-3 mt-4" role="alert">
                <h4 className="alert-heading">{error}</h4>
            </div>
        </div>
    )
}