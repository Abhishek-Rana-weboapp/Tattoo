import { useEffect, useState } from 'react'
import { Calendar } from 'react-date-range'
import { format, parse, isValid } from 'date-fns'

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { IoCalendarNumberOutline } from "react-icons/io5";


const DatePicker = ({date, setDate, ...props}) => {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isValidDate, setIsValidDate] = useState(true)
    const [calendarDate, setCalendarDate] = useState(date || new Date())

    // Initialize input value when date prop changes
    useEffect(() => {
        if (date) {
            if (typeof date === 'string') {
                setInputValue(date)
                // Try to parse the string date for calendar
                const parsedDate = parse(date, "MM/dd/yyyy", new Date())
                if (isValid(parsedDate)) {
                    setCalendarDate(parsedDate)
                }
            } else if (date instanceof Date) {
                setInputValue(format(date, "MM/dd/yyyy"))
                setCalendarDate(date)
            }
        } else {
            setInputValue('')
            setCalendarDate(new Date())
        }
    }, [date])

    // Auto-format input with forward slashes
    const formatInputWithSlashes = (value) => {
        // Remove all non-numeric characters
        const numbersOnly = value.replace(/\D/g, '')
        
        // Limit to 8 digits (MMDDYYYY)
        const limitedNumbers = numbersOnly.slice(0, 8)
        
        // Add slashes at appropriate positions
        if (limitedNumbers.length <= 2) {
            return limitedNumbers
        } else if (limitedNumbers.length <= 4) {
            return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2)}`
        } else {
            return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2, 4)}/${limitedNumbers.slice(4)}`
        }
    }

    // Handle manual input changes
    const handleInputChange = (e) => {
        const value = e.target.value
        const formattedValue = formatInputWithSlashes(value)
        setInputValue(formattedValue)
        
        // Validate the input format
        if (formattedValue === '') {
            setIsValidDate(true)
            setDate(null)
            return
        }

        // Only validate if we have a complete date (MM/DD/YYYY)
        if (formattedValue.length === 10) {
            const parsedDate = parse(formattedValue, "MM/dd/yyyy", new Date())
            
            if (isValid(parsedDate)) {
                // Check if date is not in the future
                if (parsedDate <= new Date()) {
                    setIsValidDate(true)
                    setDate(parsedDate)
                    setCalendarDate(parsedDate) // Update calendar date
                } else {
                    setIsValidDate(false)
                }
            } else {
                setIsValidDate(false)
            }
        } else {
            // Incomplete date, don't validate yet
            setIsValidDate(true)
        }
    }

    // Handle calendar selection
    const onChange = (value) => {
        setDate(value)
        setInputValue(format(value, "MM/dd/yyyy"))
        setCalendarDate(value) // Update calendar date state
        setOpen(false)
        setIsValidDate(true)
    }

    // Handle input blur - final validation
    const handleInputBlur = () => {
        if (inputValue && !isValidDate) {
            setInputValue('')
            setDate(null)
        }
    }

    return (
        <div className='relative w-full'>
            <div className='flex gap-1 items-center w-full pr-2 bg-white rounded-md'>
                <input 
                    value={inputValue} 
                    placeholder='MM/DD/YYYY' 
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    maxLength={10}
                    className={`px-2 py-1 w-full rounded-md text-black focus:outline-none ${
                        !isValidDate ? 'border-2 border-red-500' : ''
                    }`} 
                />
                <IoCalendarNumberOutline 
                    size={20} 
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                />
            </div>
            
            {/* Show error message if date is invalid */}
            {!isValidDate && inputValue && inputValue.length === 10 && (
                <div className="text-red-500 text-xs mt-1 ml-2">
                    Please enter a valid date not in the future
                </div>
            )}
            
            {open && (
                <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20' onClick={() => setOpen(false)}>
                    <div onClick={e => e.stopPropagation()}>
                        <Calendar 
                            {...props} 
                            onChange={onChange} 
                            maxDate={new Date()}   
                            className='z-50'
                            date={calendarDate}
                        /> 
                    </div>
                </div>
            )}
        </div>
    )
}

export default DatePicker
