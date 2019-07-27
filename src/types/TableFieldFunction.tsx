import {TableDoExpand} from "./TableDoExpand";

export type  TableFieldFunction<T> = (row?: T, doExpand?: TableDoExpand, index?: number) => void
