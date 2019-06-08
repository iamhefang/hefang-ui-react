import {TableDoExpand} from "./TableDoExpand";
import {BaseModel} from "../interfaces/BaseModel";

export type  TableFieldFunction<T extends BaseModel> = (row?: T, doExpand?: TableDoExpand, index?: number) => void