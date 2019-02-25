import * as React from "react";
import {OnSwitchChange} from "../types/OnSwitchChange";
import {execute} from "hefang-js";
import {ColorType} from "../types/ColorType";

export interface SwitchState {
    checked: boolean
}

export interface SwitchProps {
    on?: boolean
    id?: string
    name?: string
    onChange?: OnSwitchChange
    type?: ColorType
}

export class SwitchBox extends React.Component<SwitchProps, SwitchState> {
    static readonly defaultProps: SwitchProps = {
        on: false,
        type: ""
    };

    constructor(props: SwitchProps) {
        super(props);
        this.state = {
            checked: props.on
        };
    }

    private onChange = e => {
        if (execute(this.props.onChange, e.currentTarget.checked) !== false) {
            this.setState({checked: e.currentTarget.checked})
        }
    };

    componentWillReceiveProps(props: SwitchProps) {
        this.setState({
            checked: props.on
        })
    }

    render() {
        const {id, name, type} = this.props;
        return <input type="checkbox" className={`hui-switch${type ? `-${type}` : ""}`}
                      onChange={this.onChange}
                      id={id}
                      checked={this.state.checked}
                      name={name}/>
    }
}