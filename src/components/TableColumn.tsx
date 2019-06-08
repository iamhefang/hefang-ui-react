import * as React from "react";
import {ReactNode, ReactText} from "react";
import {TableFieldFunction} from "../types/TableFieldFunction";
import {BaseModel} from "../interfaces/BaseModel";

export interface TableColumnState {

}

export interface TableColumnProps<T extends BaseModel> {
    width?: ReactText
    title: ReactNode | Function
    field: ReactText | TableFieldFunction<T>
    align?: "right" | "left" | "center"
    sort?: string | boolean
}

export class TableColumn<T extends BaseModel> extends React.Component<TableColumnProps<T>, TableColumnState> {
    static readonly defaultProps: TableColumnProps<BaseModel> = {
        title: null,
        field: null
    };

    constructor(props: TableColumnProps<T>) {
        super(props);
        this.state = {};
    }

    render() {
        return <></>
    }
}