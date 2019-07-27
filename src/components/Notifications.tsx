import * as React from "react";
import {CSSProperties, ReactNode} from "react";
import {execute, extend, guid} from "hefang-js";
import {div} from "../functions/dom";
import {render} from "react-dom";
import {Icon} from "./Icon";

export interface NotificationProps extends NotificationOptions {
	isClosing: boolean
}

export interface NotificationOptions {
	id?: string
	title?: ReactNode
	message?: ReactNode
	actions?: NotificationButton[]
	icon?: ReactNode
	showClose?: boolean
	autoClose?: number
}

export interface NotificationButton {
	onClick?: (props: NotificationOptions) => boolean | void
	text: string
	className?: string
	style?: CSSProperties
}

interface State {
	closeDelay: number
}

const containerId = "notification" + guid()
	, containerKey = Symbol("NotificationContainerKey")
	, propsPool: { [key: string]: NotificationOptions } = {}
	, timerPool: { [key: string]: any } = {};
let updateTimer;

export class Notifications extends React.Component<NotificationProps, State> {
	static readonly defaultProps: NotificationProps = {
		actions: [],
		showClose: true,
		isClosing: false,
		autoClose: 5000
	};

	constructor(props) {
		super(props);
		this.state = {
			closeDelay: 0
		};
	}

	/**
	 * 展开/收缩通知中心
	 */
	static toggleFold() {
		if (!Notifications[containerKey]) return;
		const fold = (Notifications[containerKey] as HTMLDivElement).getAttribute("data-fold") === "true";
		(Notifications[containerKey] as HTMLDivElement).setAttribute("data-fold", fold ? "false" : "true")
	}

	static count(): number {
		return Object.keys(propsPool).length
	}

	static error(message: string, title?: string, options?: NotificationOptions) {
		const props: NotificationOptions = {
			message, title: title || "错误",
			icon: <Icon name="times-circle" style={{color: 'red'}}/>
		};
		Notifications.send(extend(true, {}, options, props))
	}

	static warning(message: string, title?: string, options?: NotificationOptions) {
		const props: NotificationOptions = {
			message, title: title || "警告",
			icon: <Icon name="exclamation-triangle" style={{color: 'orange'}}/>
		};
		Notifications.send(extend(true, {}, options, props))
	}

	static info(message: string, title?: string, options?: NotificationOptions) {
		const props: NotificationOptions = {
			message, title: title || "提示",
			icon: <Icon name="exclamation-circle"/>
		};
		Notifications.send(extend(true, {}, options, props))
	}

	static success(message: string, title?: string, options?: NotificationOptions) {
		const props: NotificationOptions = {
			message, title: title || "成功",
			icon: <Icon name="check" style={{color: 'green'}}/>
		};
		Notifications.send(extend(true, {}, options, props))
	}

	/**
	 * 发送一条通知
	 * @param props
	 */
	static send(props: NotificationOptions) {
		props.id = props.id || guid();
		props['isClosing'] = Notifications.defaultProps.isClosing;
		propsPool[props.id] = props;
		Notifications[containerKey] = Notifications[containerKey] || div({
			appendTo: document.body,
			id: containerId,
			className: "hui-notification-container"
		});
		Notifications.update(() => {
			if (props.autoClose > 0) {
				timerPool[props.id] = setTimeout(() => {
					Notifications.close(props.id)
				}, props.autoClose)
			}
		});
	}

	/**
	 * 关闭通知
	 * @param id 要关闭的通知的id, 如果不传则关闭所有通知
	 */
	static close(id?: string) {
		if (!id) {
			Object.keys(propsPool).forEach(key => {
				Notifications.close(key)
			});
		} else {
			(propsPool[id] as NotificationProps).isClosing = true;
			setTimeout(() => {
				delete propsPool[id];
				Notifications.update();
			}, 360)
		}
		Notifications.update();
	}

	private static update(callback?: (notifications: NotificationOptions[]) => void) {
		updateTimer && clearTimeout(updateTimer);
		updateTimer = setTimeout(() => {
			const keys = Object.keys(propsPool).reverse();
			render(keys.map(key => {
				return <Notifications {...propsPool[key]} key={propsPool[key].id}/>
			}), Notifications[containerKey], () => {
				typeof callback === "function" && callback(Object.keys(propsPool).map(key => propsPool[key]).filter(item => !(item as NotificationProps).isClosing));
			})
		}, 0)
	}

	private onActionClick = (btn: NotificationButton) => {
		if (execute(btn.onClick, this.props) !== false) {
			Notifications.close(this.props.id)
		}
	};

	componentWillUnmount(): void {
		clearTimeout(timerPool[this.props.id]);
		delete timerPool[this.props.id]
	}

	render() {
		return <div className="hui-notification display-flex-row" data-closing={this.props.isClosing}>
			{this.props.icon ? <div className="hui-notification-icon">
				{this.props.icon}
			</div> : null}
			<div className="hui-notification-body flex-1">
				<div className="hui-notification-title">{this.props.title}</div>
				<div className="hui-notification-message">{this.props.message}</div>
				<div className="hui-notification-actions text-right">
					{this.props.actions.map(
						btn => <button className={btn.className}
											onClick={e => this.onActionClick(btn)}>{btn.text}</button>
					)}
				</div>
			</div>
			{this.props.showClose ?
				<button className="hui-btn-border-less hui-notification-close"
						  onClick={e => Notifications.close(this.props.id)}>
					<Icon name={"times"}/>
				</button> : null}
		</div>
	}
}
