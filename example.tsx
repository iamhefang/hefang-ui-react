import * as React from "react";
import * as ReactDOM from "react-dom";
import {ColorType} from "./src/types/ColorType";
import {MenuView} from "./src/components/MenuView";
import {Icon} from "./src/components/Icon";

const colorMap: ColorType[] = [
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "light",
    "dark"
];

interface State {
    menuOpen: boolean
}

class Example extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {menuOpen: true}
    }

    render() {
        return <div data-open={this.state.menuOpen}>
            <nav id="navbar"></nav>
            <div id="side">
                <MenuView open={this.state.menuOpen} items={[
                    {
                        icon: <Icon name="info"/>,
                        label: "关于"
                    },
                    {
                        icon: <Icon name="table"/>,
                        label: "表格",
                        child: [
                            {label: "普通表格"},
                            {label: "带分页"},
                        ]
                    }
                ]} size={"large"}/>
                <button className="toggle-btn" onClick={e => this.setState({menuOpen: !this.state.menuOpen})}>
                    菜单
                </button>
            </div>
            <div id="main"></div>
        </div>;
    }
}

ReactDOM.render(<Example/>, document.getElementById("root"));