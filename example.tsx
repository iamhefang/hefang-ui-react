import * as React from "react";
import * as ReactDOM from "react-dom";
import {ColorType} from "./src/types/ColorType";
import {guid, range} from "hefang-js";
import {BaseModel} from "./src/interfaces/BaseModel";
import {Dialog} from "./src/components/Dialog";
import {SwitchBox} from "./src/components/SwitchBox";
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
const data: BaseModel[] = range(1, 20).map(idx => {
    return {
        id: guid(),
        name: "name" + idx,
        title: "title" + idx,
        sex: "sex" + idx,
        age: "age" + idx,
        height: "height" + idx,
    }
});
ReactDOM.render(<div>
    <button onClick={e => Dialog.show({
        content: <h1>1111111</h1>,
        title: true,
        icon: true
    })}>Alert
    </button>
    <SwitchBox on={true}/>
</div>, document.body);


/*<Button text="探寻" className="hui-btn" onClick={e => Toast.success()}/>
    {colorMap.map(type => <Button text={type} className={`hui-btn-${type}`}
                                  onClick={e => Toast.success({type})}/>)}
    {colorMap.map(type => <Switch type={type}/>)}
    <input className={`hui-input`}/>
    {colorMap.map(type => <input className={`hui-input hui-input-${type}`}/>)}
    <Stars total={5} value={2}/>

    <QrCode content={guid()} logo={"https://hefang.link/files/2018/11/05/17250699355861715-sass.jpeg"}/>
    <Table data={data} height={"20rem"} selectable={true} footer={<Pager pageIndex={1} pageSize={20} total={1102000}/>}>
        <TableColumn title={"姓名"} field={"name"} sort={true}/>
        <TableColumn title={"标题"} field={"title"}/>
        <TableColumn title={"操作"} field={(model, doExpand) => {
            return <a href="javascript:;" onClick={e => {
                doExpand(guid())
            }}>展开</a>
        }} align={"center"} width={"6rem"}/>
    </Table>*/