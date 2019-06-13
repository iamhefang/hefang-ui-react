import * as React from "react";
import {InputSize} from "../enums/InputSize";
import {ColorType} from "../types/ColorType";

export interface TagProps {
    text: string
    size?: InputSize
    closable?: boolean
    type?: ColorType
}

export class Tag extends React.Component<TagProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <span className="display-flex-row hui-tag" data-size={this.props.size}>
            <span className="flex-1">{this.props.text}</span>
            {this.props.closable ? <button>x</button> : null}
        </span>;
    }
}