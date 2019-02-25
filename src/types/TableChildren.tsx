import {ReactElement} from "react";
import {TableColumnProps} from "../components/TableColumn";

export type TableChildren =
    ReactElement<TableColumnProps>
    | ReactElement<TableColumnProps>[]
    | ReactElement<TableColumnProps[]>
    | ReactElement<TableColumnProps[]>[]