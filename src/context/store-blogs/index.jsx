import { createContext,useState } from "react";

export const BlogsContext=createContext(null);

const BlogsStore=({children})=>{
    const [blogs,setBlogs]=useState([]);
    return (
        <BlogsContext.Provider value={{blogs,setBlogs}}>
            {children}
        </BlogsContext.Provider>
    );
}


export default BlogsStore;