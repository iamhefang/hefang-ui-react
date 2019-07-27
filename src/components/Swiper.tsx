import * as React from "react";
import {CSSProperties, ReactNode, RefObject} from "react";

export interface SwiperProps {
	showDot?: boolean
	autoPlay?: boolean
	timer?: number
	current?: number
	children: Array<ReactNode>
	easing: string
}

interface State {
	current: number
	boxSize: number
	animation: boolean
}

export default class Swiper extends React.Component<SwiperProps, State> {
	private autoPlayTimer = null;
	static readonly defaultProps: SwiperProps = {
		showDot: true,
		autoPlay: true,
		timer: 5000,
		children: [],
		current: 0,
		easing: "ease",
	};
	private refContainer: RefObject<HTMLDivElement> = React.createRef();

	constructor(props: SwiperProps) {
		super(props);
		this.state = {
			current: props.current,
			boxSize: 100,
			animation: true
		};
	}

	private calcBoxSize = () => {
		const width = document.defaultView.getComputedStyle(this.refContainer.current).width;
		this.setState({boxSize: parseInt(width)});
	};

	public goto = (index: number, animation: boolean = true) => {
		const {length} = this.props.children;
		if (index >= length) {
			index = 0;
			animation = false
		}
		if (index < 0) {
			index = length - 1;
			animation = false
		}
		this.setState({current: index, animation}, animation ? undefined : () => this.setState({animation: true}))
	};

	public next = (animation: boolean = true) => {
		this.goto(this.state.current + 1, animation)
	};

	public pre = (animation: boolean = true) => {
		this.goto(this.state.current - 1, animation)
	};

	componentDidMount(): void {
		this.calcBoxSize();
		this.autoPlayTimer = setInterval(this.next, this.props.timer);
		window.addEventListener("resize", this.calcBoxSize)
	}

	componentWillUnmount(): void {
		window.removeEventListener("resize", this.calcBoxSize)
	}

	render() {
		const style: CSSProperties = {
			width: this.state.boxSize * this.props.children.length,
			transform: `translateX(-${this.state.current * this.state.boxSize}px)`
		};
		if (this.state.animation) {
			style.transition = `all .35s ${this.props.easing}`
		}
		return <div className="hui-swiper-container" ref={this.refContainer}>
			<div className="hui-swiper-box" style={style}>
				{this.props.children.map(
					(item, index) => <div
						data-index={index}
						className="hui-swiper-item"
						style={{width: this.state.boxSize}}>
						{item}
					</div>)}
			</div>
		</div>;
	}
}
