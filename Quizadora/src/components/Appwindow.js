import React from "react";
import RouterComponents from "./RouterComponents";
class Appwindow extends React.Component
{
    render()
    {
        return(
        <div  className="AppWindow">
            <RouterComponents/>
        </div>
        )
    }
}

export default Appwindow;