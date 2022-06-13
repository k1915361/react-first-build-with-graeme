import React, { useState, useEffect } from "react";

function Favourites(props) {
    const favourites = props.favourites;

    return (
        <div>
            FAVOURITES
            <br/>
            {props.children}
        </div>
    )
}

export default Favourites;