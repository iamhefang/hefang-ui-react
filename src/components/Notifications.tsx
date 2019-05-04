import * as React from "react";


export interface NotificationProps {

}

export class Notifications extends React.Component<NotificationProps> {
    constructor(props) {
        super(props);
    }

    static send(props: NotificationProps) {

    }

    render() {
        return <div className="hui-notification">

        </div>
    }
}