import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Date_Picker = () => {
 
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    
    return (
        <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
        />
    );
};

export default Date_Picker;
