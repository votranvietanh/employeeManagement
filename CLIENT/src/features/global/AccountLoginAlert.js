import React, { useState } from 'react';


const AccountLoginAlert = ({ message }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <>
        {isOpen && (
            <div className="popup">
                <div className="popup-content">
                    <p>{message}</p>
                    <button onClick={() => setIsOpen(false)}>Close</button>
                </div>
            </div>
        )}
        </>
    );
};

export default AccountLoginAlert;