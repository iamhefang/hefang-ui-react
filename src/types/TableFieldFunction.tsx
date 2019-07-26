import {TableDoExpand} from "./TableDoExpand";
import {BaseModel} from "../interfaces/BaseModel";

export type  TableFieldFunction<T> = (row?: T, doExpand?: TableDoExpand, index?: number) => void