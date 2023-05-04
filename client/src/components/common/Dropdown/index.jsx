import React, { useState, useEffect, useRef } from "react"

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

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleItemClick = (props) => {
        const { onClick } = props
        onClick()
        setIsOpen(false)
    }

    return (
        <div ref={dropdownRef}>
            <button onClick={toggleDropdown}>{icon}</button>
            {isOpen && (
                <div>
                    {React.Children.map(children, (child) => (
                        <div onClick={() => handleItemClick(child.props)}>
                            {child}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown
