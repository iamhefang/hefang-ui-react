import * as React from "react";
import {ReactNode, ReactText} from "react";
import {TableFieldFunction} from "../types/TableFieldFunction";

export interface TableColumnState {

}

export interface TableColumnProps<T> {
    width?: ReactText
    title: ReactNode
    field: ReactText | TableFieldFunction<T>
    align?: "right" | "left" | "center"
    sort?: string | boolean
}

export class TableColumn<T> extends React.Component<TableColumnProps<T>, TableColumnState> {
    static readonly defaultProps: TableColumnProps<any> = {
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