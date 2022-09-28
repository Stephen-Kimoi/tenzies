import React from "react";
import './App.css'; 

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "rgb(74, 162, 197)" : "white", 
    }

    return (
        <div className="die-numbers" onClick={props.hold} style={styles}>
            {props.number}
        </div>
    )
}