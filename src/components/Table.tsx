import * as React from "react";
import {CSSProperties, ReactElement, ReactNode, ReactText} from "react";
import {TableChildren} from "../types/TableChildren";
import {TableColumnProps} from "./TableColumn";
import {execute, type} from "hefang-js";
import {BaseModel} from "../interfaces/BaseModel";
import {TableOnSelected} from "../types/TableOnSelected";
import {TableOnSort} from "../types/TableOnSort";
import {SqlSort} from "../interfaces/SqlSort";
import {Icon} from "./Icon";

export interface TableState<T> {
    columns: TableColumnProps<T>[]
    selected: { [key: string]: boolean }
    allSelected: boolean
    sort: SqlSort
    expandId: string
}

export interface TableProps<T> {
    id?: string
    className?: string
    style?: CSSProperties
    height?: ReactText

    children: TableChildren<T>

    selectable?: boolean
    selected?: string[]
    header?: boolean | "fixed"
    border?: "row" | "col" | "both" | "none"
    sort?: SqlSort

    data: Array<T>
    emptyChildren?: ReactNode
    footer?: ReactNode

    onSelected?: TableOnSelected
    onSort?: TableOnSort
    rowKey?: string
}

function parseChildren<T>(children: TableChildren<T>, columns: TableColumnProps<T>[]) {
    if (!children) return;
    if (Array.isArray(children)) {
        (children as Array<ReactElement<TableColumnProps<T>>>).forEach(item => {
            parseChildren(item, columns)
        })
    } else {
        columns.push((children as any).props)
    }
}

export class Table<T> extends React.Component<TableProps<T>, TableState<T>> {
    static readonly defaultProps: TableProps<BaseModel> = {
        children: [],
        header: true,
        selectable: false,
        selected: [],
        data: null,
        border: "row",
        rowKey: "id"
    };

    private expandElement: ReactNode;

    static getDerivedStateFromProps<T>(props: TableProps<T>, state) {
        const columns: TableColumnProps<T>[] = []
            , selected = {};
        if (Array.isArray(props.selected)) {
            props.selected.forEach(s => {
                selected[s] = true;
            })
        }
        parseChildren(props.children, columns);
        return {selected, columns}
    }

    constructor(props: TableProps<T>) {
        super(props);
        const columns: TableColumnProps<T>[] = []
            , selected = {};
        if (Array.isArray(props.selected)) {
            props.selected.forEach(s => {
                selected[s] = true;
            })
        }
        parseChildren(props.children, columns);
        this.state = {
            columns, selected,
            allSelected: false,
            sort: props.sort,
            expandId: undefined
        };
    }

    private onRowCheck = (key: string, checked: boolean) => {
        let {allSelected, selected} = this.state;

        if (key === "all") {
            if (Array.isArray(this.props.data) && this.props.data.length > 0) {
                for (let i = 0; i < this.props.data.length; i++) {
                    if (checked) {
                        selected[this.props.data[i][this.props.rowKey]] = true;
                    } else {
                        delete selected[this.props.data[i][this.props.rowKey]];
                    }
                }
                allSelected = checked;
            }
        } else {
            if (checked) {
                selected[key] = true;
            } else {
                delete selected[key];
            }
            if (Array.isArray(this.props.data) && this.props.data.length > 0) {
                allSelected = true;
                for (let i = 0; i < this.props.data.length; i++) {
                    if (!(this.props.data[i][this.props.rowKey] in selected)) {
                        allSelected = false;
                        break;
                    }
                }
            }
        }
        this.setState({allSelected});
        if (execute(this.props.onSelected, Object.keys(selected)) !== false) {
            this.setState({selected});
        }
    };

    private onSort = (sort: SqlSort) => {
        if (!sort || !sort.key) return;
        if (execute(this.props.onSort, sort) !== false) {
            this.setState({sort})
        }
    };

    private onExpand = (row: BaseModel, node: ReactNode) => {
        if (row[this.props.rowKey] === this.state.expandId) {
            this.expandElement = null;
            this.setState({expandId: null})
        } else {
            this.expandElement = node;
            this.setState({expandId: row[this.props.rowKey]})
        }
    };

    /**
     * 渲染表头
     */
    private renderHeader = () => {
        const tds: ReactElement<HTMLTableDataCellElement>[] = [];
        if (this.props.selectable) {
            tds.push(<td key={"selectAll"} style={{textAlign: "center", width: "2rem"}}>
                <label>
                    <input
                        type="checkbox" checked={this.state.allSelected}
                        onChange={e => this.onRowCheck("all", e.currentTarget.checked)}/>
                </label>
            </td>)
        }

        this.state.columns.forEach((col: TableColumnProps<T>, idx) => {
            let sort = undefined, sortIcon = undefined, cursor = undefined;
            if (col.sort) {
                if (type(col.sort) === "String") {
                    sort = col.sort;
                } else if (col.sort === true) {
                    if (type(col.field) === "String") {
                        sort = col.field
                    } else if (type(col.title) === "String") {
                        sort = col.title
                    }
                }
            }

            if (sort) {
                cursor = "pointer";
                if (this.state.sort && this.state.sort.key === sort) {
                    sortIcon = <Icon name={"sort-alpha-" + (this.state.sort.type === "DESC" ? "up" : "down")}/>
                } else {
                    sortIcon = <Icon name={"sort"}/>
                }
            }

            tds.push(<td
                id={`header${idx}`}
                style={{textAlign: col.align, width: col.width}}>
                {cursor ? <button
                    className="no-background no-border mp-0"
                    style={{cursor}}
                    onClick={e => this.onSort({
                        key: sort,
                        type: this.state.sort && this.state.sort.type === "DESC" ? "ASC" : "DESC"
                    })}>
                    {col.title}
                    {sortIcon}
                </button> : col.title}
            </td>)
        });

        return <thead>
        <tr>{tds}</tr>
        </thead>;
    };

    /**
     * 渲染表格
     */
    private renderBody = () => {
        if (!this.props.data || this.props.data.length === 0) {
            return <tr key={"trEmptyBody"}>
                <td colSpan={this.state.columns.length + (this.props.selectable ? 1 : 0)}>
                    {this.props.emptyChildren}
                </td>
            </tr>
        }

        const trs: ReactElement<HTMLTableColElement>[] = [];

        this.props.data.forEach((data, index) => {
            if (!data) return;
            const tds: ReactElement<HTMLTableDataCellElement>[] = [];
            if (this.props.selectable) {
                tds.push(<td key={`select${data[this.props.rowKey]}`} style={{textAlign: "center", width: "2rem"}}>
                    <label>
                        <input type="checkbox"
                               checked={data[this.props.rowKey] in this.state.selected}
                               onChange={e => this.onRowCheck(data[this.props.rowKey], e.currentTarget.checked)}/>
                    </label></td>)
            }
            this.state.columns.forEach((col, idx) => {
                if (!col) return;
                const fieldType = type(col.field)
                    , style: CSSProperties = {}
                    , key = `td${data[this.props.rowKey]}${idx}`;
                col.width && (style.width = col.width);
                col.align && (style.textAlign = col.align);
                if (fieldType === "String" || fieldType === "Number") {
                    tds.push(<td key={key} style={style}>{data[col.field as string]}</td>)
                } else if (fieldType === "Function") {
                    tds.push(<td key={key}
                                 style={style}>
                        {execute(col.field, data, (node: ReactNode) => this.onExpand(data, node), index)}
                    </td>)
                } else {
                    tds.push(<td key={key} style={style}>{col.field + ""}</td>)
                }
            });
            trs.push(<tr key={`tr${data[this.props.rowKey]}`}>{tds}</tr>);
            if (this.state.expandId && this.state.expandId === data[this.props.rowKey]) {
                trs.push(<tr className="hui-table-expand" key={`expand${data[this.props.rowKey]}`}>
                    <td colSpan={this.state.columns.length + (this.props.selectable ? 1 : 0)}>{this.expandElement}</td>
                </tr>)
            }
        });

        return trs
    };

    render() {
        const style: CSSProperties = this.props.style || {};
        return <div
            className={`hui-table ${this.props.className || ""}`}
            style={style}
            data-border={this.props.border}
            data-fixed-header={this.props.header === "fixed"}
            id={this.props.id}>
            {this.props.header === "fixed" ? <div className="hui-table-header">
                <table cellPadding={0} cellSpacing={0}>
                    {this.renderHeader()}
                </table>
            </div> : undefined}
            <div className="hui-table-body" style={{height: this.props.height}}>
                <table cellPadding={0} cellSpacing={0}>
                    {this.props.header === true ? this.renderHeader() : undefined}
                    <tbody>{this.renderBody()}</tbody>
                </table>
            </div>
            {this.props.footer ? <div className="hui-table-footer">
                {this.props.footer}
            </div> : undefined}
        </div>
    }
}