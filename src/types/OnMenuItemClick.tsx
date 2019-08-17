import {MenuViewItemModel} from "../models/MenuViewItemModel";

export type OnMenuItemClick = (item?: MenuViewItemModel, parent?: MenuViewItemModel) => void | boolean
