import * as React from "react";
import {ReactNode} from "react";
import {guid} from "hefang-js";
import {div} from "../functions/dom";
import {render} from "react-dom";


export interface NotificationProps {
    id?: string
    title?: string
    message?: string
    actions?: string[]
    icon?: ReactNode
}

const poolKey = Symbol("NotificationPoolKey")
    , containerKey = Symbol("NotificationContainerKey");

export class Notifications extends React.Component<NotificationProps> {
    static readonly defaultProps: NotificationProps = {
        actions: []
    };

    constructor(props) {
        super(props);
    }

    static send(props: NotificationProps) {
        props.id = props.id || guid();
        Notifications[poolKey][props.id] = props;
        Notifications[containerKey] = Notifications[containerKey] || div({appendTo: document.body});
        Notifications.update();
    }

    /**
     * 关闭通知
     * @param id 要关闭的通知的id, 如果不传则关闭所有通知
     */
    static close(id?: string) {
        if (!id) {
            Object.keys(Notifications[poolKey]).forEach(key => {
                delete Notifications[poolKey][key];
            });
        } else {
            delete Notifications[poolKey][id];
        }
        Notifications.update();
    }

    private static update() {
        const keys = Object.keys(Notifications[poolKey]);
        render(keys.map(key => {
            return <Notifications {...Notifications[poolKey][key]} key={Notifications[poolKey][key].id}/>
        }), Notifications[containerKey])
    }

    render() {
        return <div className="hui-notification">
            {this.props.icon ? <div className="hui-notification-icon">
                {this.props.icon}
            </div> : null}
            <div className="hui-notification-body flex-1">
                <div className="hui-notification-title">{this.props.title}</div>
                <div className="hui-notification-message">{this.props.message}{this.props.id}</div>
                <div className="text-right">
                    {this.props.actions.map(btn => <button className="no-background no-border">{btn}</button>)}
                </div>
            </div>
            <button className="hui-notification-close" onClick={e => Notifications.close(this.props.id)}>x</button>
        </div>
    }
}

Notifications[poolKey] = {};