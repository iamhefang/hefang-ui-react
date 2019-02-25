import * as React from "react";
import {ReactNode} from "react";
import * as ReactDOM from "react-dom";
import {execute, extend, guid, noop, type, Types} from "hefang-js";
import {Icon} from "./Icon";
import {IconSize} from "../enums/IconSize";
import {IconAnimation} from "../enums/IconAnimation";
import {ToastOnClose} from "../types/ToastOnClose";
import {HuiMask} from "../types/HuiMask";
import {ColorType} from "../types/ColorType";

export interface ToastProps {
    duration?: number
    onClosed?: ToastOnClose
    onClosing?: ToastOnClose
    mask?: HuiMask
    type?: ColorType
}

let container: HTMLDivElement = null
    , timer = null
    , lastToast: Toast = null;

export class Toast {
    public static readonly defaultProps: ToastProps = {
        duration: 3000,
        mask: false,
        type: ""
    };
    private readonly id: string;
    private readonly container: HTMLDivElement;
    private readonly option: ToastProps;

    private constructor(container: HTMLDivElement, option: ToastProps) {
        this.container = container;
        this.option = extend(true, {
            onClosed: noop, onClosing: noop
        }, option);
        this.id = guid();
    }

    public static show(content: ReactNode, option?: ToastProps): Toast {
        const opt = extend(true, {}, Toast.defaultProps, option) as ToastProps;
        if (!container) {
            container = document.createElement("div");
            document.body.appendChild(container);
        }
        lastToast && lastToast.close();
        opt.mask && (container.className = `hui-mask${opt.mask === true ? "" : `-${opt.mask}`}`);
        ReactDOM.render(<div className={`hui-toast${opt.type ? `-${opt.type}` : ''}`}>{content}</div>, container);
        timer && clearTimeout(timer);
        lastToast = new Toast(container, opt);
        if (opt.duration > 0) {
            timer = setTimeout(() => lastToast.close(), opt.duration);
        }
        return lastToast;
    }

    public static success(): Toast
    public static success(message: string): Toast
    public static success(option: ToastProps): Toast
    public static success(message: string, option: ToastProps): Toast
    public static success(message?, option?): Toast {
        if (type(message) === Types.Object) {
            option = message;
            message = "成功"
        }
        message = message || "成功";
        return Toast.show(<div className="hui-toast-block">
            <Icon name="check" size={IconSize._3x}/>
            <p>{message}</p>
        </div>, extend(true, {}, option))
    }

    public static loading(): Toast
    public static loading(message: string): Toast
    public static loading(option: ToastProps): Toast
    public static loading(message: string, option: ToastProps): Toast
    public static loading(message?, option?): Toast {
        if (type(message) === Types.Object) {
            option = message;
            message = "请稍候..."
        }
        message = message || "请稍候...";
        return Toast.show(<div className="hui-toast-block">
            <Icon name="spinner" size={IconSize._3x} animation={IconAnimation.spin}/>
            <p>{message}</p>
        </div>, extend(true, {mask: 10}, option, {duration: -1, mask: 10}))
    }

    public getId() {
        return this.id;
    }

    public close() {
        if (execute(this.option.onClosing, this.getId()) !== false) {
            container.className = "";
            ReactDOM.unmountComponentAtNode(container);
            execute(this.option.onClosed, this.getId())
        }
    }
}