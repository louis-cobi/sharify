import "./index.css"

const Button = ({onClick, text, isLoading}) => {
    
    return(
        <button disabled={isLoading} onClick={onClick} className="submit-btn">{text}</button>
    )
}

export default Button