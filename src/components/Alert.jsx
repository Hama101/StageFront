import React from 'react'
import './css/newCss/alert.css'

function Alert(props) {
    const[closed , setClosed] = React.useState(null)
    React.useEffect(()=> {
        setClosed(false)
    },[] )
    console.log(closed);
    return (
        <div>
        {
            !closed ? 
            (<div class="alert">
            <span class="closebtn" onClick={()=>{
                                        setClosed(true)}}>
                                        &times;</span> 
            <strong>{props.daKey}  </strong> {props.error}
            </div>)
            :
            (<div></div>)
        }
    </div>
    )
}

export default Alert
