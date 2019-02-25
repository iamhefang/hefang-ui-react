import {IPager} from "../interfaces/IPager";

export interface PagerModel<T> extends IPager {
    data: T[]
}