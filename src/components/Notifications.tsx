import * as React from "react";
import {ReactNode} from "react";


export interface NotificationProps {
    id?: string
    title?: string
    message?: string
    actions?: string[]
    icon?: ReactNode
}

export class Notifications extends React.Component<NotificationProps> {
    constructor(props) {
        super(props);
    }

    static send(props: NotificationProps) {

    }

    render() {
        return <div className="hui-notification">
            {this.props.icon ? <div className="hui-notification-icon">
                {this.props.icon}
            </div> : null}
            <div className="hui-notification-body flex-1">
                <div className="hui-notification-title">{this.props.title}</div>
                <div className="hui-notification-message">{this.props.message}</div>
                <div className="text-right">
                    {this.props.actions.map(btn => <button className="no-background no-border">{btn}</button>)}
                </div>
            </div>
            <button className="hui-notification-close">x</button>
        </div>
    }
}