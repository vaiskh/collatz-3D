import "./App.css";

import CanvasContainer from "./CanvasContainer";
import Layout, { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { getCollatzSequence } from "./helpers";
import * as THREE from "three";
import React, { useState } from 'react';
import { useControls } from 'leva'





const d = 10;
const alpha = Math.PI / 13;
const vectorsList = [];

function createSplinePathFromCollatz(sequence) {
    const points = [];
    let prevPoint;
    let relativeAngle = 0;
    const seq = sequence.reverse();

    for (let i = 0; i < seq.length; i++) {
        let pointX;
        let pointY;
        if (i === 0) {
            pointX = 0;
            pointY = 0;
        } else {
            // const vector = new THREE.Vector3(prevPoint[0], prevPoint[1] + d, 0)
            // console.log(vector)
            relativeAngle = relativeAngle + (seq[i] % 2 === 0 ? alpha : -alpha);
            // const axis = new THREE.Vector3(0,0,-1); // rotate around z axis
            // vector.applyAxisAngle(axis, relativeAngle);
            // pointX = vector.x;

            // pointY = vector.y;
            pointX = prevPoint[0] + d * Math.sin(relativeAngle);
            pointY = prevPoint[1] + d * Math.cos(relativeAngle);
        }
        points.push([pointX, pointY]);
        prevPoint = [pointX, pointY];
    }

    const vectors = points.map((point) => {
        return new THREE.Vector3(point[0], point[1], 0);
    });
    return vectors;
}

const getMeshObjects = () => {
    const meshObjects = [];
    const params = {
        extrusionSegments: 100,
        radiusSegments: 12,
    };
    const n = 100;
    for (let i = 2; i <= n; i++) {
        const seq = getCollatzSequence(i);
        const vectors = createSplinePathFromCollatz(seq);
        vectorsList.push(vectors);

        // create a spline from all the vector points
        const spline = new THREE.CatmullRomCurve3(vectors);
        spline.curveType = "catmullrom";
        spline.closed = false;

        // create tube geometry based on spline
        const geometry = new THREE.TubeGeometry(
            spline,
            params.extrusionSegments,
            2,
            params.radiusSegmentsl
        );
        const material = new THREE.MeshNormalMaterial();
        material.side = THREE.DoubleSide;
        const mesh = new THREE.Mesh(geometry, material);

        meshObjects.push(mesh);
    }
    return meshObjects;
};

let meshes = getMeshObjects();
function recalculateMeshes() {
    meshes = getMeshObjects();
}


function App() {

    return (
        <div className="App">
            {meshes.length > 0 && (
                <CanvasContainer
                    meshObjects={meshes}
                    vectorsList={vectorsList}
                    drawDebugLine={false}
                ></CanvasContainer>
            )}
        </div>
    );
}

export default App;
