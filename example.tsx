import * as React from "react";
import * as ReactDOM from "react-dom";
import {ColorType} from "./src/types/ColorType";
import {guid, range} from "hefang-js";
import {Dialog} from "./src/components/Dialog";
import {SwitchBox} from "./src/components/SwitchBox";
import {Selector} from "./src/components/Selector";
import {SelectorItem} from "./src/models/SelectorItem";
import {Menu} from "./src/components/Menu";
import {Notifications} from "./src/components/Notifications";
import {Icon} from "./src/components/Icon";

const colorMap: ColorType[] = [
    "",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "light",
    "dark"
];
const data: SelectorItem[] = range(1, 20).map(idx => {
    return {
        text: idx + "",
        value: idx
    }
});

const timer = setTimeout(() => console.log("in timer"), 0);
console.log(timer);
clearTimeout(timer);

ReactDOM.render(<div>
    <Menu items={[
        {
            type: "menu",
            text: "Menu 1",
            subMenu: [
                {type: "menu", text: "Menu 1", subMenu: []},
                {type: "menu", text: "Menu 2", subMenu: []}
            ]
        },
        {type: "separator"},
        {
            type: "menu",
            text: "Menu 1",
            subMenu: [
                {type: "menu", text: "Menu 1", subMenu: []},
                {
                    type: "menu", text: "Menu 2", subMenu: [
                        {type: "menu", text: "Menu 2", subMenu: []},
                        {type: "menu", text: "Menu 2", subMenu: []}
                    ]
                }
            ]
        }
    ]}/>
    <button onClick={e => Dialog.confirm(<form id={guid()} className='hui-dialog-content'>
        <p>代码语言：
            <Selector data={[
                {text: 'Java', value: 'java'},
                {value: "python", text: "Python"},
                {value: "bash", text: "Bash"},
                {value: "sql", text: "SQL"},
                {value: "html", text: "HTML"},
                {value: "xml", text: "XML"},
                {value: "css", text: "CSS"},
                {value: "javascript", text: "JavaScript"},
                {value: "typescript", text: "TypeScript"},
                {value: "makefile", text: "Makefile"},
                {value: "rust", text: "Rust"},
                {value: "jsx", text: "React JSX"},
            ]}/></p>
        <p style={{marginTop: '1rem'}}>
            <textarea name='code' className='display-block hui-input no-resize' rows={15}/>
        </p>
    </form>, "插入代码块", (dialog) => {
        const form = dialog.contentElement() as HTMLFormElement
            , lang = form.language.value
            , code = form.code.value;

    }, {
        icon: 'file-code',
        width: 500, height: 500, maximizable: true, doubleClickTitle2Max: true
    })}>Alert
    </button>
    <SwitchBox on={true}/>
    <Selector placeholder={'Please select'} data={data} onChange={console.log} className='hui-input'/>
    <button onClick={e => Menu.show([
        {
            type: "menu",
            text: "Menu 1",
            onClick: alert,
            subMenu: [
                {
                    type: "menu", text: "Menu 1",
                    onClick: alert, subMenu: []
                },
                {
                    type: "menu", text: "Menu 2",
                    onClick: alert, subMenu: []
                }
            ]
        },
        {type: "separator"},
        {
            type: "menu",
            text: "Menu 1",
            onClick: alert,
            subMenu: [
                {
                    type: "menu", text: "Menu 1",
                    onClick: alert, subMenu: []
                },
                {
                    type: "menu", text: "Menu 2", subMenu: [
                        {
                            type: "menu", text: "Menu 2",
                            onClick: alert, subMenu: []
                        },
                        {
                            type: "menu", text: "Menu 2",
                            onClick: alert, subMenu: []
                        }
                    ]
                }
            ]
        }
    ])}>Menu
    </button>
    <button onClick={e => Notifications.send({
        title: "这是标题",
        message: "这是一段内容一段内容一段内容一段内容一段内容一段内容",
        showClose: false
    })}>notification
    </button>
    <button onClick={e => Notifications.send({
        title: "这是标题",
        message: "这是一段内容一段内容一段内容一段内容一段内容一段内容",
        icon: <Icon name={"cog"}/>, actions: [
            {
                text: "确定",
                onClick: console.log
            },
            {
                text: "取消",
                onClick: console.log
            }
        ]
    })}>notification with icon
    </button>
    <button onClick={e => Notifications.toggleFold()}>toggle({Notifications.count()})</button>
    <button onClick={e => Notifications.success(guid(), "", {id: "111111"})}>error</button>
</div>, document.body);