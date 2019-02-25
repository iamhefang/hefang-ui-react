import {ApiResult} from "./ApiResult";
import {PagerModel} from "../models/PagerModel";

export interface PagerResult<T> extends ApiResult<PagerModel<T>> {

}