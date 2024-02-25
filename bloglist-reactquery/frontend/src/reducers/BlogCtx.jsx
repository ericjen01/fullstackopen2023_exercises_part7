import { createContext, useContext, useReducer } from "react";

export const initialState = []

export const blogRed = (state, action) => {
  const {type, payload} = action

  switch(type){
    case 'setAllBlogs': 
      console.log('set Blogs: ', payload)
      return{
        ...state,
        blogs: payload
      }
      
    default: 
    throw new Error(`No case for type ${type} found in userRed.`);
  }
}

export const BlogCtx = createContext(initialState)

export const BlogCtxProvider = ({children}) => {
  const [mySate, myDispatch] = useReducer(blogRed, initialState)
     //BlogCtxProvider must be enabled in main.jsx)
  
  return(
  <BlogCtx.Provider value={[mySate, myDispatch]}>
    {children}
  </BlogCtx.Provider>
  )
}

export const peekBlogState = () => useContext(BlogCtx)[0]
export const callBlogDisp = () => useContext(BlogCtx)[1]