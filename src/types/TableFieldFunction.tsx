import {BaseModel} from "../interfaces/BaseModel";
import {TableDoExpand} from "./TableDoExpand";

export type  TableFieldFunction = (row?: BaseModel, doExpand?: TableDoExpand) => void