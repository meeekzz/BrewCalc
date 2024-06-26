import { useState } from 'react';
import '../styles/CustomerInfo.css';

const CustomerInfo = ({ onNext, name, setName, busName, setBusName, location, setLocation, email, setEmail, phone, setPhone }) => {
    const [errors, setErrors] = useState('');

    const handleNext = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required.';
        else if (!busName) newErrors.busName = 'Company Name is required.';
        else if (!location) newErrors.location = 'City, State is required.';
        else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email address.';
        else if (!phone) newErrors.phone = 'Phone Number is required.';
    
        if (Object.keys(newErrors).length === 0) {
          setErrors({});
          onNext();
        } else {
          setErrors(newErrors);
        }
      };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <div className='grid gap-1 py-4 rounded-2xl'>
            <input
                type="text"
                className="font-medium w-64 h-8 border-2 place-self-center text-xs" 
                value={name}
                placeholder=" Name"
                onChange={(e) => setName(e.target.value)}
                aria-label="Name"
                required
            />
            <input
                type="text"
                className="font-medium w-64 h-8 border-2 place-self-center text-xs"
                value={busName}
                placeholder=" Company Name" 
                onChange={(e) => setBusName(e.target.value)}
                aria-label="Company Name"
                required
            />
            <input
                type="text"
                className="font-medium w-64 h-8 border-2 place-self-center text-xs"
                value={location}
                placeholder=" City, State" 
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Location"
                required
            />
            <input
                type="email"
                className="font-medium w-64 h-8 border-2 place-self-center text-xs"
                value={email}
                placeholder=" Email"
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                required
            />  
            <input
                type="tel"
                className="font-medium w-64 h-8 border-2 place-self-center text-xs"
                value={phone}
                placeholder=" Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                aria-label="Phone Number"
                required
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            {errors.busName && <p className="text-red-500">{errors.busName}</p>}
            {errors.location && <p className="text-red-500">{errors.location}</p>}  
            {errors.email && <p className="text-red-500">{errors.email}</p>}   
            {errors.phone && <p className="text-red-500">{errors.phone}</p>} 
            <br/>
            <button onClick={handleNext} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Next Step</button>
        </div>
    )
};

export default CustomerInfo;