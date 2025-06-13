import {memo} from 'react';
const Button=memo(({title,onChangeEvent=null})=>{
    return (
        <div>
            <button style={{
                color:"white",
                backgroundColor:"#038cfc",
                border:"none",
                width:"110px",
                height:"35px",
                padding:"5px",
                textAlign:"center"
            }}
            onClick={onChangeEvent}
            >{title}</button>
        </div>
    );
})

export default Button;