import * as React from "react";
import {Icon} from "./Icon";
import {execute} from "hefang-js";

export interface SelectProps<T> {
    value?: T
    defaultValue?: T
    onChange?: (value?: T) => void | boolean
    filterOption?: (inputValue: string) => boolean
}

interface State {
    dropdown: boolean
}

export class Select<T> extends React.Component<SelectProps<T>, State> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="hui-select display-flex-row hui-input">
            <div className="flex-1">
                <input type="text" onChange={e => execute(this.props.filterOption, e.currentTarget.value)}/>
            </div>
            <Icon name={'angle-down'}/>
        </div>;
    }
}