import * as React from "react";
import {CSSProperties} from "react";
import {QRCodeToDataURLOptions, toCanvas, toDataURL} from "qrcode";
import {type} from "hefang-js";

export interface QrCodeState {
	url: string
}

export interface QrCodeProps {
	content: string
	option?: QRCodeToDataURLOptions
	style?: CSSProperties
	className?: string
	id?: string
	logo?: HTMLImageElement | string
	alt?: string
}

export class QrCode extends React.Component<QrCodeProps, QrCodeState> {
	static readonly defaultProps: QrCodeProps = {
		content: "",
		option: {
			type: "image/png",
			rendererOpts: {
				quality: 1
			}
		}
	};

	constructor(props: QrCodeProps) {
		super(props);
		this.state = {
			url: ''
		};
	}

	componentDidMount() {
		if (this.props.logo) {
			toCanvas(this.props.content, this.props.option, (error, canvas: HTMLCanvasElement) => {
				const size = canvas.width / 5
					, ctx = canvas.getContext("2d");
				if (type(this.props.logo) === "String") {
					const logo = new Image(size, size);
					logo.onload = () => {
						ctx.drawImage(logo, canvas.width, canvas.height)
					};
					logo.src = this.props.logo as string;
				} else {
					ctx.drawImage(this.props.logo as HTMLImageElement, canvas.width, canvas.height)
				}
				const opt = this.props.option || QrCode.defaultProps.option;
				this.setState({url: canvas.toDataURL(opt.type, opt.rendererOpts.quality)})
			})
		} else {
			toDataURL(this.props.content, this.props.option, (error, url) => this.setState({url}))
		}
	}

	render() {
		const {content, logo, option, ...props} = this.props;
		return <img {...props} src={this.state.url}/>
	}
}
