import "./App.css";

import CanvasContainer from "./CanvasContainer";
import * as THREE from "three";
import React, { useState } from 'react';
import { useControls } from 'leva'

function App() {
    const d = 10;
const alpha = Math.PI / 13;
const vectorsList = [];
const n = 100;

const { nodeDistance, bendAngle,sequenceLimit } = useControls({ nodeDistance: d, bendAngle: alpha, sequenceLimit : n })

    return (
        <div className="App">
        <CanvasContainer
        nodeDistance={nodeDistance}
            bendAngle={bendAngle}
            sequenceLimit={sequenceLimit}
        ></CanvasContainer>
        </div>
    );
}

export default App;
