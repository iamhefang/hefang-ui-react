import * as React from "react";
import * as ReactDOM from "react-dom";
import {ColorType} from "./src/types/ColorType";
import {Icon} from "./src/components/Icon";
import Loading from "./src/components/Loading";
import {Empty} from "./src/components/Empty";
import Swiper from "./src/components/Swiper";
import {div} from "./src/functions/dom";
import {MenuView} from "./src/components/MenuView";
import {Progress} from "./src/components/Progress";

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
	showMenuLabel: boolean
	progress: number
}

class Example extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {menuOpen: true, showMenuLabel: true, progress: 0}
	}

	componentDidMount(): void {
		setInterval(() => {
			let progress = this.state.progress;
			progress += 10;
			if (progress > 100) progress = 0;
			this.setState({progress})
		}, 2000)
	}

	render() {
		return <div data-open={this.state.menuOpen} data-size={"large"}>
			<nav id="navbar" className="display-flex-row">
				<div className="flex-1">
					<a href="#" className="navbar-brand">啊中职啊</a>
					<a href="#" className="navbar-item">功能1</a>
					<a href="#" className="navbar-item active">功能2</a>
					<a href="#" className="navbar-item">功能3</a>
				</div>

				<div className="flex-1 text-right">
					<a href="#" className="navbar-item">功能4</a>
					<a href="#" className="navbar-item active">功能55</a>
					<a href="#" className="navbar-item">功能6</a>
					<div className="navbar-dropdown">
						<a href="#" className="navbar-item">sjdflsjkdf <Icon name="user"/></a>
						<div className="navbar-dropdown-container">
							<div className="navbar-dropdown-content">
								<MenuView
									items={[
										{
											icon: <Icon name="info"/>,
											label: "关于"
										},
										{
											icon: <Icon name="table"/>,
											label: "表格",
										},
										{
											icon: <Icon name="qrcode"/>,
											label: "二维码",
										}
									]} size={"default"}/>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<div id="side">
				<MenuView
					onLabelVisibleChange={showMenuLabel => this.setState({showMenuLabel})}
					open={this.state.menuOpen}
					items={[
						{
							icon: <Icon name="info"/>,
							label: "关于"
						},
						{
							icon: <Icon name="table"/>,
							label: "表格",
							children: [
								{label: "普通表格"},
								{label: "带分页"},
							]
						},
						{
							icon: <Icon name="qrcode"/>,
							label: "二维码",
							children: [
								{label: "普通"},
								{label: "带图标"}
							]
						}
					]} size={"large"}/>
				<button
					className="toggle-btn no-border no-background"
					onClick={e => this.setState({menuOpen: !this.state.menuOpen})}>
					{this.state.showMenuLabel ?
						<Icon name="angle-double-left"> 收起菜单</Icon> :
						<Icon name="angle-double-right"/>}
				</button>
			</div>
			<div id="main">
				<Progress value={this.state.progress} size={"small"}/>
				<Progress value={this.state.progress}/>
				<Progress value={this.state.progress} size={"large"}/>
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
