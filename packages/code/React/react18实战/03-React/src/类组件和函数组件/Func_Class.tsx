import React, { useState } from "react";

function Func_Class() {
    const [name, setName] = useState("Linxae");
    return <div onClick={() => setName("gg")}>{name}</div>;
}

export default Func_Class;
