import * as React from "react";
import {CSSProperties, ReactNode, ReactText, RefObject} from "react";
import * as ReactDOM from "react-dom";
import {Icon} from "./Icon";
import {execute, extend, guid, isFunction, type} from "hefang-js";
import {JsObject, WebView} from "./WebView";
import {DialogOperater} from "../interfaces/DialogOperater";
import {IDialogOption} from "../interfaces/IDialogOption";
import {DialogOptions} from "../interfaces/DialogOptions";
import {DialogPromptOption} from "../interfaces/DialogPromptOption";
import {DialogOnClose} from "../types/DialogOnClose";
import {IconNamespace} from "../types/IconNamespace";
import {remove} from "../functions/dom";

export interface DialogState {
    maximize: boolean
    left: number
    top: number
    width: number
    height: number
    moving: boolean
    title?: string | boolean
}

export interface DialogProps extends IDialogOption {
    children: ReactNode
}

const dialogs: { [key: string]: Dialog } = {}
    , operaters: { [key: string]: DialogOperater } = {};

export class Dialog extends React.Component<DialogProps, DialogState> {
    static readonly defaultProps: DialogProps = {
        children: null,
        maximize: false,
        maximizable: true,
        doubleClickTitle2Max: true,
        resizable: false,
        movable: true
    };

    public static show(option: DialogOptions): DialogOperater {
        const container = document.createElement("div") as HTMLDivElement;
        document.body.appendChild(container);
        if (option.mask) {
            container.className = typeof option.mask === "boolean" ? "hui-mask" : `hui-mask-${option.mask}`;
        }
        option.id = option.id || guid();
        const dialog = <Dialog {...option}>{option.content}</Dialog>;
        ReactDOM.render(dialog, container);
        return operaters[option.id];
    }

    public static alert(content: ReactNode): DialogOperater
    public static alert(content: ReactNode, title: string): DialogOperater
    public static alert(content: ReactNode, onOk: DialogOnClose): DialogOperater
    public static alert(content: ReactNode, option: DialogOptions): DialogOperater
    public static alert(content: ReactNode, title: string, onOk: Function): DialogOperater
    public static alert(content: ReactNode, onOk: DialogOnClose, option: DialogOptions): DialogOperater
    public static alert(content: ReactNode, title: string, option: DialogOptions): DialogOperater
    public static alert(content: ReactNode, title: string, onOk: DialogOnClose, option: DialogOptions): DialogOperater
    public static alert(content: ReactNode, title?, onOk?, option?): DialogOperater {
        const defaultTitle = "提示框";
        if (isFunction(title)) {
            option = onOk;
            onOk = title;
            title = defaultTitle
        }
        if (type(title) === "Object") {
            option = title;
            title = defaultTitle;
            onOk = undefined;
        }
        if (type(onOk) === "Object") {
            option = onOk;
            onOk = undefined;
        }
        return Dialog.show(extend(true, {
            mask: 10,
            maximizable: false
        }, {
            content, title: title || defaultTitle,
            buttons: [{
                text: "确定",
                className: "hui-btn-primary",
                onClick: (operater?: DialogOperater) => {
                    execute(onOk, operater) === false || Dialog.close(operater.id())
                }
            }],
            icon: true
        }, option));
    }

    public static confirm(content: ReactNode): DialogOperater
    public static confirm(content: ReactNode, option: DialogOptions): DialogOperater
    public static confirm(content: ReactNode, onOk: DialogOnClose): DialogOperater
    public static confirm(content: ReactNode, onOk: DialogOnClose, onCancel: DialogOnClose): DialogOperater
    public static confirm(content: ReactNode, onOk: DialogOnClose, option: DialogOptions): DialogOperater
    public static confirm(content: ReactNode, title: string): DialogOperater
    public static confirm(content: ReactNode, title: string, option: DialogOptions): DialogOperater
    public static confirm(content: ReactNode, title: string, onOk: DialogOnClose): DialogOperater
    public static confirm(content: ReactNode, title: string, onOk: DialogOnClose, onCancel: DialogOnClose): DialogOperater
    public static confirm(content: ReactNode, title: string, onOk: DialogOnClose, option: DialogOptions): DialogOperater
    public static confirm(content: ReactNode, title: string, onOk: DialogOnClose, onCancel: DialogOnClose, option: DialogOptions): DialogOperater
    public static confirm(content: ReactNode, title?, onOk?, onCancel?, option?): DialogOperater {
        const defaultTitle = "询问框";
        if (isFunction(title)) {
            option = onCancel;
            onCancel = onOk;
            onOk = title;
            title = defaultTitle
        }
        if (type(title) === "Object") {
            option = title;
            title = defaultTitle;
        }
        if (type(onOk) === "Object") {
            option = onOk;
            onOk = undefined;
        }
        if (type(onCancel) === "Object") {
            option = onCancel;
            onCancel = undefined;
        }
        const defOpt: DialogOptions = {
            content, title: title || defaultTitle,
            buttons: [{
                text: "取消",
                className: "hui-btn-danger",
                onClick: (operater?: DialogOperater) => {
                    execute(onCancel, operater) === false || Dialog.close(operater.id())
                }
            }, {
                text: "确定",
                className: "hui-btn-primary",
                onClick: (operater?: DialogOperater) => {
                    execute(onOk, operater) === false || Dialog.close(operater.id())
                }
            }],
            icon: true
        };
        return Dialog.show(extend(true, {
            mask: 10,
            maximizable: false
        }, defOpt, option));
    }

    public static window(url: string): DialogOperater
    public static window(url: string, option: DialogOptions): DialogOperater
    public static window(url: string, title: string | boolean): DialogOperater
    public static window(url: string, title: string | boolean, option: DialogOptions): DialogOperater
    public static window(url: string, title?, option?): DialogOperater {
        if (type(title) === "Object") {
            option = title;
            title = true;
        }
        return Dialog.show(extend(true, {
            url, title,
            resizable: true,
            icon: true
        }, option))
    }

    public static prompt(message: ReactNode): DialogOperater
    public static prompt(message: ReactNode, option: DialogPromptOption): DialogOperater
    public static prompt(message: ReactNode, onOk: DialogOnClose): DialogOperater
    public static prompt(message: ReactNode, onOk: DialogOnClose, onCancel: DialogOnClose): DialogOperater
    public static prompt(message: ReactNode, onOk: DialogOnClose, onCancel: DialogOnClose, option: DialogPromptOption): DialogOperater
    public static prompt(message: ReactNode, option: DialogPromptOption): DialogOperater
    public static prompt(message: ReactNode, defaultValue: ReactText, onOk: DialogOnClose): DialogOperater
    public static prompt(message: ReactNode, defaultValue: ReactText, option: DialogPromptOption): DialogOperater
    public static prompt(message: ReactNode, defaultValue: ReactText, onOk: DialogOnClose, onCancel: DialogOnClose): DialogOperater
    public static prompt(message: ReactNode, defaultValue: ReactText, onOk: DialogOnClose, option: DialogPromptOption): DialogOperater
    public static prompt(message: ReactNode, defaultValue: ReactText, onOk: DialogOnClose, onCancel: DialogOnClose, option: DialogPromptOption): DialogOperater
    public static prompt(message: ReactNode, defaultValue: ReactText): DialogOperater
    public static prompt(message: ReactNode, defaultValue: ReactText, title: string): DialogOperater
    public static prompt(message: ReactNode, defaultValue: ReactText, title: string, onOk: DialogOnClose): DialogOperater
    public static prompt(message: ReactNode, defaultValue: ReactText, title: string, onOk: DialogOnClose, onCancel: DialogOnClose): DialogOperater
    public static prompt(message: ReactNode, defaultValue: ReactText, title: string, onOk: DialogOnClose, onCancel: DialogOnClose, option: DialogPromptOption): DialogOperater
    public static prompt(message: ReactNode, defaultValue?, title?, onOk?, onCancel?, option?): DialogOperater {
        const defaultTitle = "输入框";
        if (type(defaultValue) === "Function") {
            option = onCancel;
            onCancel = onOk;
            onOk = defaultValue;
            defaultValue = "";
            title = defaultTitle;
        }

        if (type(title) === "Function") {
            option = onCancel;
            onCancel = onOk;
            onOk = title;
            title = defaultTitle;
        }

        if (type(onCancel) === "Object") {
            option = onCancel;
            onCancel = undefined;
        }
        if (type(onOk) === "Object") {
            option = onOk;
            onOk = onCancel = undefined;
        }
        if (type(title) === "Object") {
            option = title;
            title = defaultTitle;
            onOk = onCancel = undefined;
        }

        if (type(defaultValue) === "Object") {
            option = defaultValue;
            title = defaultTitle;
            onOk = onCancel = undefined;
            defaultValue = "";
        }
        let form;

        if (type(option) !== "Object") {
            option = {inputType: "text"}
        }


        const defaultOption: DialogPromptOption = {
            inputType: "text",
            rows: 3,
            id: guid()
        };
        option = extend(true, defaultOption, option) as DialogPromptOption;

        option.inputType = option.inputType || "text";

        if (option.inputType === "textarea") {
            form = <textarea
                rows={option.rows} className="hui-input display-block no-resize"
                id={`prompt${option.id}input`}
                placeholder={option.placeholder}
                style={{width: "15rem"}}
                onChange={e => {
                    execute(option.onChange, e.currentTarget, option.id)
                }}
                defaultValue={defaultValue} key={`prompt${option.inputType}`}
                maxLength={option.maxLength}/>
        } else {
            form =
                <input
                    max={option.max} placeholder={option.placeholder}
                    id={`prompt${option.id}input`}
                    key={`prompt${option.inputType}`}
                    defaultValue={defaultValue} className="hui-input display-block"
                    type={option.inputType}
                    onChange={e => {
                        execute(option.onChange, e.currentTarget, option.id)
                    }}
                    pattern={option.pattern}
                    maxLength={option.maxLength}/>
        }
        const defOpt: DialogPromptOption = {
            title: title || defaultTitle,
            buttons: [{
                text: "取消",
                className: "hui-btn-danger",
                onClick: (operater?: DialogOperater) => {
                    execute(onCancel, operater) === false || Dialog.close(operater.id())
                }
            }, {
                text: "确定",
                className: "hui-btn-primary",
                onClick: (operater?: DialogOperater) => {
                    const value = (document.getElementById(`prompt${option.id}input`) as HTMLInputElement).value;
                    execute(onOk, operater.data(value)) === false || Dialog.close(operater.id())
                }
            }],
            icon: true,
        };
        return Dialog.show(extend(true, {maximizable: false}, defOpt, option, {
            content: <div className="hui-dialog-content">
                <p style={{marginTop: 0}} key={"promptmessage"}>{message || "请输入"}</p>
                {form}
            </div>,
        }));
    }

    public static close(id: string) {
        if (!id) return;
        id = id.toLowerCase();
        if (id === "all") {
            for (const _id in dialogs) {
                Dialog.close(_id)
            }
        } else {
            const dialog = dialogs[id];
            if (!dialog) return;
            if (execute(dialog.props.onClosing, dialog.dialog) !== false) {
                const container = document.getElementById(`dialog${id}`).parentElement;
                ReactDOM.unmountComponentAtNode(container);
                delete dialogs[id];
                remove(container)
            }
        }
    }

    constructor(props: DialogProps) {
        super(props);
        this.id = props.id || guid();
        this.state = {
            maximize: props.maximize,
            left: 0, top: 0,
            width: 0,
            height: 0,
            moving: false,
            title: props.url && props.title === true ? "加载中。。。" : props.title
        };
        dialogs[this.id] = this;
        operaters[this.id] = this.dialog as DialogOperater;
    }

    private id: string;
    private data: any;
    private refBody: RefObject<HTMLDivElement> = React.createRef();
    private refContainer: RefObject<HTMLDivElement> = React.createRef();
    private isMouseDown: boolean = false;
    private dialog = {
        height: (value?: ReactText) => {
            if (typeof value === "number") {
                this.refContainer.current.style.height = value + "px";
                return this.dialog
            }
            if (typeof value === "string") {
                this.refContainer.current.style.height = value;
                return this.dialog
            }
            return parseInt(this.refContainer.current.style.height);
        },
        width: (value?: ReactText) => {
            if (typeof value === "number") {
                this.refContainer.current.style.width = value + "px";
                return this.dialog
            }
            if (typeof value === "string") {
                this.refContainer.current.style.width = value;
                return this.dialog
            }
            return parseInt(this.refContainer.current.style.width);
        },
        close: (data: any = this.data) => {
            this.data = data;
            Dialog.close(this.id)
        },
        data: (data?: any) => {
            if (data !== undefined) {
                this.data = data;
                return this.dialog;
            }
            return this.data
        },
        id: () => this.id,
        shake: (duration = 500) => {
            if (duration < 500) duration = 500;
            this.refContainer.current.setAttribute("data-shake", "true");
            setTimeout(() => {
                this.refContainer.current.removeAttribute("data-shake")
            }, duration);
            return this.dialog
        },
        contentElement: () => this.refBody.current.firstChild
    };

    //鼠标按下时的坐标
    private startX: number = 0;
    private startY: number = 0;

    //鼠标按下时窗口的坐标
    private startLeft: number = 0;
    private startTop: number = 0;

    private onHeaderMouseDown = e => {
        if (this.state.maximize) return;
        this.isMouseDown = true;
        this.startX = e.pageX;
        this.startY = e.pageY;
        this.startLeft = this.state.left;
        this.startTop = this.state.top;
    };

    private onDocumentMouseMove = e => {
        if (!this.isMouseDown || this.state.maximize) return;
        if (!this.state.moving) {
            this.setState({moving: true});
        }
        let left = this.startLeft + e.pageX - this.startX
            , top = this.startTop + e.pageY - this.startY;
        if (left < 0) left = 0;
        if (top < 0) top = 0;
        if (this.state.width + left > window.innerWidth) left = window.innerWidth - this.state.width;
        if (this.state.height + top > window.innerHeight) top = window.innerHeight - this.state.height;
        if (top < 0) top = 0;
        this.refContainer.current.style.left = `${left}px`;
        this.refContainer.current.style.top = `${top}px`;
    };

    private onDocumentMouseUp = e => {
        if (this.state.maximize) return;
        this.isMouseDown = false;
        const style = this.refContainer.current.style
            , height = parseInt(style.height)
            , width = parseInt(style.width)
            , left = parseInt(style.left)
            , top = parseInt(style.top);
        this.setState({
            left, top, height, width,
            moving: false
        })
    };

    private onMaximize = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const {maximize} = this.state;
        if (execute(this.props.onMaximizing, !maximize, this.dialog) !== false) {
            this.setState(
                {maximize: !maximize},
                () => execute(this.props.onMaximized, !maximize, this.dialog)
            )
        }
        return false;
    };

    private onHeaderDoubleClick = (e) => {
        if (!this.props.maximizable || !this.props.doubleClickTitle2Max) return;
        this.onMaximize(e);
    };

    componentDidMount() {
        this.setState({
            height: this.refContainer.current.offsetHeight,
            width: this.refContainer.current.offsetWidth,
            left: (window.innerWidth - this.refContainer.current.offsetWidth) / 2,
            top: (window.innerHeight - this.refContainer.current.offsetHeight) / 2
        });
        if (this.props.movable) {
            document.addEventListener("mousemove", this.onDocumentMouseMove);
            document.addEventListener("mouseup", this.onDocumentMouseUp);
        }
        execute(this.props.componentDidMount, this.dialog);
    }

    componentWillUnmount() {
        execute(this.props.onClosed, this.data, this.dialog);
        if (this.props.movable) {
            document.removeEventListener("mousemove", this.onDocumentMouseMove);
            document.removeEventListener("mouseup", this.onDocumentMouseUp);
        }
    }

    componentWillReceiveProps(newProps: DialogProps) {
        this.setState({maximize: newProps.maximize})
    }

    //渲染内容
    private renderContent = () => {
        if (this.props.url) {
            const js: JsObject<DialogOperater> = {
                name: "dialogOperater",
                value: this.dialog as DialogOperater,
                onError: error => this.setState({title: "网页"})
            };
            return <WebView className="hui-dialog-content"
                            url={this.props.url}
                            onLoad={(win: Window) => {
                                Object.defineProperty(win, "close", {
                                    value: (data?: any) => {
                                        this.dialog.data(data);
                                        Dialog.close(this.id);
                                    }
                                });
                            }}
                            jsObject={js}/>;
        }
        if (type(this.props.children) === "String" || type(this.props.children) === "Number") {
            return <div className="hui-dialog-content">
                {this.props.children}
            </div>
        }
        return this.props.children;
    };

    //渲染图标
    private renderIcon = () => {
        if (!this.props.icon) return null;
        let name = null, namespace: IconNamespace = "fa";
        if (this.props.icon === true) {
            const ua = navigator.userAgent.toLocaleLowerCase();
            namespace = "fab";
            if (ua.indexOf("firefox") !== -1) {
                name = "firefox"
            } else if (ua.indexOf("opera") !== -1) {
                name = "opera"
            } else if (ua.indexOf("macintosh") !== -1 && ua.indexOf("version") !== -1) {
                name = "safari"
            } else if (ua.indexOf("chrome") !== -1) {
                name = "chrome"
            } else {
                name = "internet-explorer";
            }
        } else if (typeof this.props.icon === "string") {
            name = this.props.icon;
        }
        if (name !== null) return <Icon name={name} namespace={namespace} className="hui-dialog-icon"/>;
        return this.props.icon;
    };

    //渲染标题
    private renderTitle = () => {
        if (!this.state.title) return null;
        return <h2 className="hui-dialog-title">{this.state.title}</h2>;
    };

    //渲染控制按钮
    private renderControls = () => {
        return <div className="hui-dialog-controls">
            {this.props.maximizable ?
                <button className="hui-btn-border-less"
                        onClick={this.onMaximize}>
                    {this.state.maximize ? <Icon name="window-restore"/> : <Icon name="window-maximize"/>}
                </button> : null}
            <button className="hui-btn-border-less" onClick={e => this.dialog.close()}>
                <Icon name="window-close"/>
            </button>
        </div>;
    };

    render() {
        let className = "hui-dialog";
        const {top, left, width, height, maximize} = this.state
            , {maxHeight, maxWidth, minHeight, minWidth} = this.props
            , style: CSSProperties = {
            width: this.props.width,
            height: this.props.height,
            maxHeight, maxWidth, minHeight, minWidth
        }, bodyStyle: CSSProperties = {};
        if (maximize) {
            className += "-maximize"
        } else if (this.props.resizable) {
            className += "-resizable";
        }
        if (!this.props.buttons || this.props.buttons.length < 1) {
            bodyStyle.paddingBottom = 0;
        }
        if (!maximize) {
            top > 0 && (style.top = top);
            left > 0 && (style.left = left);
            width > 0 && (style.width = width);
            height > 0 && (style.height = height);
        }

        return <div
            className={className} style={style}
            id={`dialog${this.id}`}
            data-moving={this.state.moving}
            data-movable={this.props.movable}
            ref={this.refContainer}>
            <div
                className="hui-dialog-header"
                onDoubleClick={this.onHeaderDoubleClick}
                onMouseDown={this.onHeaderMouseDown}>
                {this.renderIcon()}
                {this.renderTitle()}
                {this.renderControls()}
            </div>
            <div className="hui-dialog-body" style={bodyStyle} ref={this.refBody}>
                {this.renderContent()}
            </div>
            {Array.isArray(this.props.buttons) ?
                <div className="hui-dialog-footer">{this.props.buttons.map((btn, index) =>
                    <button
                        className={btn.className}
                        key={`dialogBtnKey${index}`}
                        style={btn.style}
                        onClick={e => execute(btn.onClick, this.dialog)}>
                        {btn.text}
                    </button>
                )}</div> : null}
        </div>
    }
}