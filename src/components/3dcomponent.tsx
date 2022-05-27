import React from 'react';
import SceneManager from '../three/main';

export default class Scene extends React.Component {
	canvasRef: React.RefObject<HTMLCanvasElement>
	viewGL: SceneManager
	onResize: () => void
	
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
		
		this.onResize = () => this.viewGL.resizeCanvas()
    }

    // ******************* COMPONENT LIFECYCLE ******************* //
    componentDidMount() {
        // Get canvas, pass to custom class
        const canvas = this.canvasRef.current;
        this.viewGL = new SceneManager(canvas);

        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        // Remove any event listeners
        window.removeEventListener('resize', this.onResize);
    }

    render() {
        return (
            <div className="canvasContainer">
                <canvas ref={this.canvasRef} />
            </div>
        );
    }
}
