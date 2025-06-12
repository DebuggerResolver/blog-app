import Button from "../button";
const Header=()=>{
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
            <Button title={"Add New Blog"}/>
        </header>
    );
}

export default Header;