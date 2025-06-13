import { useCallback } from "react";
import Button from "../button";
import { useNavigate } from "react-router-dom";

const Header=()=>{
    const navigate=useNavigate();
    const handleOnChange=useCallback(()=>{
        navigate('/add');
    },[]);
    return (
        <header style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-around",
            marginTop:"50px"
        }}>
           <h1 style={{
            display:"inline"
           }}>Blog Admin Panel</h1>
            <Button title={"Add New Blog"} onChangeEvent={handleOnChange}/>
        </header>
    );
}

export default Header;