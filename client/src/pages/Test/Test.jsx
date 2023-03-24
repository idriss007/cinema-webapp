import React, { useState } from "react";

function Test() {

    const [isClicked, setIsClicked] = useState(false)

    return (
        <button className={isClicked ? "btn btn-success" : "btn btn-danger"} onClick={() => setIsClicked(!isClicked)}>
            {
                isClicked ?
                "true"
                :
                "false"
            }
        </button>
    );
}

export default Test;