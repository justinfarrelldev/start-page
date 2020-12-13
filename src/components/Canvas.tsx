import { PureComponent } from "react";

interface CanvasProps {
  id: string;
  onCanvasDraw: (canvasInstance: HTMLCanvasElement) => void;
}
interface CanvasState {}

export class Canvas extends PureComponent<CanvasProps, CanvasState> {
  canvasInstance: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  width: number = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  height: number = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  constructor(props: CanvasProps) {
    super(props);

    // to get typescript to be patient with me
    this.canvasInstance = document.getElementById(
      this.props.id
    ) as HTMLCanvasElement;
    this.ctx = null;
  }

  componentDidMount() {
    this.canvasInstance = document.getElementById(
      this.props.id
    ) as HTMLCanvasElement;

    this.ctx = this.canvasInstance.getContext("2d");

    setInterval(this.update, 13.33);
  }

  update = () => {};

  render() {
    return (
      <canvas
        id={this.props.id}
        width={this.width}
        height={this.height}
        style={{
          display: "none",
          margin: 0,
          padding: 0,
        }}
      >
        Your browser does not support canvas.
      </canvas>
    );
  }
}
