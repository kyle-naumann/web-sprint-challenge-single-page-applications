import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components"

const Navigationdiv = styled.div`
width: 100%;
height 4rem;
display: flex;
align-items: center;
background: #d12d21;
// justify-content: center;
a {
    margin-left: 4rem;
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
}
`

const Navigation = () => {
    return (
        <Navigationdiv>
            <Link to="/order-form">Order</Link>
            <Link to="/">Home</Link>
        </Navigationdiv>
    )
}

export default Navigation
