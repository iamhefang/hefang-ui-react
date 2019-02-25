import * as React from "react";
import {ReactNode, ReactText} from "react";
import {TableFieldFunction} from "../types/TableFieldFunction";

export interface TableColumnState {

}

export interface TableColumnProps {
    width?: ReactText
    title: ReactNode | Function
    field: ReactText | TableFieldFunction
    align?: "right" | "left" | "center"
    sort?: string | boolean
}

export class TableColumn extends React.Component<TableColumnProps, TableColumnState> {
    static readonly defaultProps: TableColumnProps = {
        title: null,
        field: null
    };

    constructor(props: TableColumnProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <></>
    }
}