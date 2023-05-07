import React, { useState, useEffect, useRef } from "react"
import "./index.css"

const Dropdown = ({icon, children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }

    const toggleDropdown = (e) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    const handleItemClick = (e ,props) => {
        e.stopPropagation()
        const { onClick } = props
        onClick()
        setIsOpen(false)
    }

    return (
        <div ref={dropdownRef} className="dropdown">
            <button onClick={(e) => toggleDropdown(e)}>{icon}</button>
            {isOpen && (
                <div className="dropdown-content">
                    {React.Children.map(children, (child) => (
                        <div onClick={(e) => handleItemClick(e, child.props)}>
                            {child}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown
