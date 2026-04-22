import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = ({ animation = "border", variant = "primary", size = "md", className = "" }) => {
    return (
        <div className={`d-flex justify-content-center align-items-center ${className}`}>
            <BootstrapSpinner animation={animation} variant={variant} size={size} />
        </div>
    );
};

export default Spinner;