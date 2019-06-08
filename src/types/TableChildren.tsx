import {ReactElement} from "react";
import {TableColumnProps} from "../components/TableColumn";
import {BaseModel} from "../interfaces/BaseModel";

export type TableChildren<T extends BaseModel> =
    ReactElement<TableColumnProps<T>>
    | ReactElement<TableColumnProps<T>>[]
    | ReactElement<TableColumnProps<T>[]>
    | ReactElement<TableColumnProps<T>[]>[]