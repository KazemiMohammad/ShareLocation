import { createStore } from "redux";
import LoactionReducer from './reducer'

const Store=createStore(LoactionReducer);

export default Store;