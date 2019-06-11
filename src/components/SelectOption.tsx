import * as React from "react";
import {ReactNode} from "react";

export interface SelectOptionProps {
    value?: string
    children: ReactNode
    key?: string
}

export class SelectOption extends React.Component<SelectOptionProps> {
    constructor(props) {
        super(props);
    }

    render() {
        return ''
    }
}