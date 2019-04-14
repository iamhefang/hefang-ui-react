import * as React from "react";
import {OnSelectChange} from "../types/OnSelectChange";
import {RefObject} from "react";
import {SelectorItem} from "../models/SelectorItem";
import {rem2px} from "../functions/size";
import {execute} from "hefang-js";

export interface SelectorProps {
    id?: string
    name?: string
    className?: string
    placeholder?: string
    onChange?: OnSelectChange
    multiple?: boolean
    value?: any
    data: SelectorItem[]
    filterPlaceholder?: string
    size?: number
}

interface State {
    value: any
    showing: boolean
    filter: string
    current: number
}

const itemHeight = rem2px(3);

export class Selector extends React.Component<SelectorProps, State> {
    public static readonly defaultProps: SelectorProps = {
        data: [],
        filterPlaceholder: '筛选',
        size: 5
    };

    private data: SelectorItem[] = [];

    constructor(props: SelectorProps) {
        super(props);
        this.state = {
            value: props.value,
            showing: false,
            filter: '',
            current: 0
        }
    }

    private refList: RefObject<HTMLDivElement> = React.createRef();

    private refInput: RefObject<HTMLInputElement> = React.createRef();

    componentWillReceiveProps(nextProps: Readonly<SelectorProps>, nextContext: any): void {
        this.setState({
            value: nextProps.value
        })
    }

    private onItemHover = (item: SelectorItem, current: number) => {
        this.setState({current})
    };

    private onKeyPress = e => {
        const {current} = this.state;
        if (e.keyCode === 40) {//down
            if (current === this.data.length - 1) return;
            this.setState({current: current + 1})
        } else if (e.keyCode === 38) {//up
            if (current === 0) return;
            this.setState({current: current - 1})
        }
        if (e.keyCode === 13) {
            this.onChange(this.data[current]);
        }
        this.refList.current.scrollTo(0, (current - 2) * itemHeight)
    };

    private onChange = (item: SelectorItem) => {
        if (execute(this.props.onChange, item) !== false) {
            this.setState({value: item.value, showing: false, filter: ''});
        }
    };

    private renderPopup = () => {
        if (!this.state.showing) return undefined;
        this.data = this.props.data.filter(item => {
            const text = item.text.toLowerCase();
            return !this.state.filter || (text.indexOf(this.state.filter.toLowerCase()) !== -1)
        });
        return <div className="hui-popup hui-selector-popup display-flex-column">
            <input type="text" className='hui-input'
                   value={this.state.filter}
                   autoFocus={true}
                   onChange={e => this.setState({filter: e.currentTarget.value})}
                   placeholder={this.props.filterPlaceholder}/>
            <div className="flex-1 hui-selector-list" ref={this.refList}>
                <ul className='mp-0' style={{height: itemHeight * this.props.size}}>
                    {this.data.map((item, index) => <li
                        onClick={e => this.onChange(item)}
                        onMouseOver={e => this.onItemHover(item, index)}
                        key={`selector${item.text}`}
                        className={`hui-selector-item ${this.state.current === index ? ' active' : ''}`}>
                        {item.text}
                    </li>)}
                </ul>
            </div>
        </div>
    };

    private renderValue = () => {
        const val = this.props.data.filter(item => item.value === this.state.value);
        if (val.length === 0) return "";
        return val[0].text;
    };

    render(): React.ReactNode {
        return <span className="hui-selector-container" onKeyUp={this.onKeyPress}>
            <input type="text"
                   ref={this.refInput}
                   className={this.props.className}
                   placeholder={this.props.placeholder}
                   id={this.props.id}
                   onFocus={e => this.setState({showing: true})}
                   value={this.renderValue()}
                   name={this.props.name}/>
            {this.renderPopup()}
        </span>;
    }
}