import * as React from "react";
import {ReactText} from "react";
import {PagerOnChange} from "../types/PagerOnChange";
import {execute, range, type} from "hefang-js";
import {PagerHrefFunction} from "../types/PagerHrefFunction";
import {Toast} from "./Toast";
import {IPager} from "../interfaces/IPager";

export interface PagerState {
    pages: number
    pageStart: number
    pageEnd: number
    pageIndex: number
    pageSize: number
    jumpTo: number
}

export interface PagerProps extends IPager {
    onChange?: PagerOnChange
    href?: string | PagerHrefFunction
}

const pageSizes = [10, 20, 50, 100, 200];

function calcState(props: PagerProps): PagerState {
    const {pageSize, pageIndex, total} = props
        , pages = Math.ceil(total / pageSize);

    let pageStart = pageIndex - 3, pageEnd = pageIndex + 3;

    if (pageStart < 1) pageStart = 1;
    if (pageEnd > pages) pageEnd = pages;

    return {pages, pageStart, pageEnd, pageIndex, pageSize, jumpTo: null}
}

function makeHref(props: PagerProps, index: number, pageSize: number) {
    if (!props.href) return "javascript:;";
    let href = "";
    if (type(props.href) === "Function") {
        href = execute(this.props.href, index, pageSize) || href
    } else {
        href = (this.props.href + "").replace("${pageIndex}", index + "").replace("${pageSize}", pageSize + "")
    }
    return href;
}

export class Pager extends React.Component<PagerProps, PagerState> {
    static readonly defaultProps: PagerProps = {
        pageIndex: 1,
        pageSize: 20,
        total: 0
    };

    constructor(props: PagerProps) {
        super(props);
        this.state = calcState(props);
    }

    private onChange = (pageIndex: number, pageSize: number) => {
        if (pageIndex < 1 || pageIndex > this.state.pages) {
            Toast.show(`当前共${this.state.pages}页, 只能跳转到1-${this.state.pages}页`, {
                type: "danger",
                duration: 5000
            });
            return;
        }
        if (execute(this.props.onChange, pageIndex, pageSize) !== false) {
            this.setState(calcState({
                pageIndex, pageSize, total: this.props.total
            }))
        }
    };

    componentWillReceiveProps(props: PagerProps) {
        this.setState(calcState(props))
    }

    private onJumpToChange = (e) => {
        this.setState({
            jumpTo: e.currentTarget.value ? +e.currentTarget.value : null
        })
    };

    private renderPagerItem = (index: number, text: ReactText) => {
        if (!index) return;
        const {pageSize} = this.state;
        return this.state.pageIndex === index ?
            <span key={`pageSpanIndex${index}${text}`} className="hui-pager-item">{text}</span> :
            <a href={makeHref(this.props, index, pageSize)} key={`pageIndex${index}${text}`} className="hui-pager-item"
               onClick={e => this.onChange(index, pageSize)}>{text}</a>;
    };

    render() {
        const {pageSize, pages, pageStart, pageEnd} = this.state;
        return <div className="hui-pager">
            <span className="hui-pager-item">
                共{this.props.total}条, 共{pages}页, 每页<select value={pageSize}
                                                           onChange={e => this.onChange(1, +e.currentTarget.value)}>
                {pageSizes.indexOf(pageSize) == -1 ?
                    <option value={pageSize}>pageSize</option> : null}
                {pageSizes.map(size => <option value={size}>{size}</option>)}
            </select>条
            </span>
            {this.renderPagerItem(1, "首页")}
            {range(pageStart, pageEnd).map(index => this.renderPagerItem(index, index))}
            {this.renderPagerItem(pages, "尾页")}
            <span className="hui-pager-item">跳转到<input type="number" value={this.state.jumpTo || ""}
                                                       onChange={this.onJumpToChange}/>
                <a href={makeHref(this.props, this.state.jumpTo, pageSize)} key={`pageIndexJump`}
                   onClick={e => this.onChange(this.state.jumpTo, pageSize)}>页</a>
            </span>
        </div>
    }
}