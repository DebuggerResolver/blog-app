
const Button=({title})=>{
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
            }}>{title}</button>
        </div>
    );
}

export default Button;