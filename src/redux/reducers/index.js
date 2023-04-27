import { combineReducers } from "redux";
import {postsReducer} from "./blogReducer";


const rootReducer = combineReducers({
    postsReducer,
});

export default rootReducer;