import "./index.css"

const BroswerCard = ({children}) => {
    return(
        <div className="browser-card-container">
        <div className="browser-card-header">
            <div className="browser-card-header-icon"></div>
            <div className="browser-card-header-icon"></div>
            <div className="browser-card-header-icon"></div>
        </div>
        <div className="browser-card-form-container">
            {children}
        </div>

    </div>
    )
}

export default BroswerCard