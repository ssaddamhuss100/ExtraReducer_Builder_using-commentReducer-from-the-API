import { useEffect } from "react";
import { List } from "../components/List";
import { useDispatch } from "react-redux";  // Correct import
import { getInitialAsync } from "../redux/reducers/commentsReducer";
import { fetchStart } from "../redux/reducers/commentsReducer";
export const Home = () => {
  const dispatch = useDispatch();  // Correct usage of dispatch
 
  useEffect(() => {
    dispatch(fetchStart());
    // Dispatch the async thunk action when the component mounts
    dispatch(getInitialAsync());
  }, []);

  return (
    <div className="home">
      <h3>Internet Comments</h3>
      <List />
    </div>
  );
};
