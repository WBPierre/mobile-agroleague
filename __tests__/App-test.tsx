import * as React from "react";
import renderer from "react-test-renderer"
import App from "../App";


it('Renders correctly', () => {
    console.log('Rendering');
    renderer.create(<App/>);
})
