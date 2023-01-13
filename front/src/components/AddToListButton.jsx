import React, { useState } from 'react';

export default function AddToListButton() {

    const add = `M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z`;
    const check = `l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z', 'l-9.005 9.565-4.995-5.865.761-.649 4.271 5.016 8.24-8.752.728.685z`;

    const [checked, setChecked] = useState(add);

    return (
        <svg 
            width="24" 
            height="24" 
            color="#000"
            fill="true"
            xmlns="http://www.w3.org/2000/svg" 
            fill-rule="evenodd" 
            clip-rule="evenodd">
            <path d={checked ? check : add} />
        </svg>
    );
};