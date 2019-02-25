import * as React from "react";
import {CSSProperties, ErrorInfo, RefObject} from "react";
import {execute} from "hefang-js";
import {OnWebViewLoad} from "../types/OnWebViewLoad";

export interface WebViewState {

}

export interface JsObject<T> {
    name: string
    value: T
    onError?: (error: Error) => void
}

export interface WebViewProps<T> {
    url: string
    id?: string
    style?: CSSProperties
    name?: string
    className?: string
    frameBorder?: number
    jsObject?: JsObject<T>
    onLoad?: OnWebViewLoad
    onUnLoad?: Function
}

export class WebView<T> extends React.Component<WebViewProps<T>, WebViewState> {

    static readonly displayName = "WebView";

    static readonly defaultProps: WebViewProps<any> = {
        url: null,
        frameBorder: 0
    };

    private ref: RefObject<HTMLIFrameElement> = React.createRef();

    constructor(props: WebViewProps<T>) {
        super(props)
    }

    //注入js对象
    private initJsInterface = (win: Window) => {
        try {
            if (win &&
                this.props.jsObject &&
                this.props.jsObject.name &&
                !win[this.props.jsObject.name]) {
                Object.defineProperty(win, this.props.jsObject.name, {
                    value: this.props.jsObject.value
                });
                const event = document.createEvent("CustomEvent");
                event.initEvent("JsInterfaceReady", true, true);
                win.dispatchEvent(event);
            }
        } catch (e) {
            execute(this.props.jsObject.onError, e)
        }
    };

    //页面加载完成事件
    private onLoad = () => {
        const win = this.ref.current.contentWindow;
        if (win) {
            this.initJsInterface(win);
            execute(this.props.onLoad, win);
        }
    };

    componentDidCatch(error: Error, errInfo: ErrorInfo) {
        console.group("WebView 组件异常");
        console.error(error);
        console.error(errInfo);
        console.groupEnd();
    }

    componentDidMount() {
        this.initJsInterface(this.ref.current.contentWindow);
    }

    componentWillUnmount() {
        execute(this.props.onUnLoad);
    }

    render() {
        return <iframe src={this.props.url}
                       id={this.props.id}
                       name={this.props.name}
                       style={this.props.style}
                       ref={this.ref}
                       onLoad={this.onLoad}
                       className={this.props.className}
                       frameBorder={this.props.frameBorder}/>
    }
}