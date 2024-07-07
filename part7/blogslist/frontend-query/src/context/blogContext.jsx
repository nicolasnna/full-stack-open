import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const sortBlogs = (blogA, blogB) => {
  if (blogA.likes > blogB.likes) {
    return -1;
  } else if (blogA.likes < blogB.likes) {
    return 1;
  }
  return 0;
};

const blogReducer = (state, action) => {
  switch (action.type) {
    case "SETBLOGS":
      return action.payload.sort(sortBlogs);
    case "UPDATE":
      return state
        .map((b) => (b.id === action.payload.id ? (b = action.payload) : b))
        .sort(sortBlogs);
    case "CREATE":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((b) => b.id !== action.payload);
    default:
      return state;
  }
};

const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const [blog, dispatch] = useReducer(blogReducer, []);

  return (
    <BlogContext.Provider value={[blog, dispatch]}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogValue = () => {
  const valueAndDispatch = useContext(BlogContext);
  return valueAndDispatch[0];
};

export const useBlogDispatch = () => {
  const valueAndDispatch = useContext(BlogContext);
  return valueAndDispatch[1];
};

export default BlogContext;
