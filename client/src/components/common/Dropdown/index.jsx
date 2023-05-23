import React, { useState, useEffect, useRef } from "react"
import "./index.css"

const Dropdown = ({ icon, children, left, center, right }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false)
        }
    }

    const toggleDropdown = (e) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    // const handleItemClick = (e, props) => {
    //     e.stopPropagation()
    //     const { onClick } = props
    //     onClick()
    //     setIsOpen(false)
    // }

    const className = () => {
        if (left) {
            return "dropdown-content dropdown-left"
        } else if (center) {
            return "dropdown-content dropdown-center"
        } else if (right) {
            return "dropdown-content dropdown-right"
        }
    }

    return (
        <div ref={dropdownRef} className="dropdown">
            <button
                className="dropdown-button"
                onClick={(e) => toggleDropdown(e)}
            >
                {icon}
            </button>
            {isOpen && (
                <div className={className()}>
                    {React.Children.map(children, (child) => (
                        <div className="dropdown-content-child">
                            {child}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown
