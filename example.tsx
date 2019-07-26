import * as React from "react";
import * as ReactDOM from "react-dom";
import {ColorType} from "./src/types/ColorType";
import {MenuView} from "./src/components/MenuView";
import {Icon} from "./src/components/Icon";
import Loading from "./src/components/Loading";
import {Empty} from "./src/components/Empty";
import Swiper from "./src/components/Swiper";
import {div} from "./src/functions/dom";

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
					},
					{
						icon: <Icon name="qrcode"/>,
						label: "二维码",
						child: [
							{label: "普通"},
							{label: "带图标"}
						]
					}
				]} size={"large"}/>
				<button className="toggle-btn" onClick={e => this.setState({menuOpen: !this.state.menuOpen})}>
					菜单
				</button>
			</div>
			<div id="main">
				<Loading loading={true} text="loading">
					<h1>加载上</h1>
					<h1>加载上</h1>
					<h1>加载上</h1>
					<h1>加载上</h1>
					<h1>加载上</h1>
					<h1>加载上</h1>
					<h1>加载上</h1>
					<h1>加载上</h1>
					<h1>加载上</h1>
				</Loading>
				<Loading loading={true}>
					<Empty/>
				</Loading>
				<Loading loading={false}>
					<div style={{background: 'red', height: 300, width: 300}}>
						11
					</div>
				</Loading>
				<Swiper>
					<div><h1>1</h1></div>
					<div><h1>2</h1></div>
					<div><h1>3</h1></div>
					<div><h1>4</h1></div>
					<div><h1>5</h1></div>
					<div><h1>6</h1></div>
					<div><h1>7</h1></div>
					<div><h1>8</h1></div>
				</Swiper>
			</div>
		</div>;
	}
}

ReactDOM.render(<Example/>, document.getElementById("root"));
