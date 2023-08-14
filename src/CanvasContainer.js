import { Canvas, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { getCollatzSequence } from "./helpers";


const tubeGeometryParams = {
    extrusionSegments: 100,
    radiusSegments: 12,
    radius: 1
};

function createSplinePathFromCollatz(sequence, nodeDistance, bendAngle) {
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
            // const vector = new THREE.Vector3(prevPoint[0], prevPoint[1] + nodeDistance, 0)
            // console.log(vector)
            relativeAngle = relativeAngle + (seq[i] % 2 === 0 ? bendAngle : -bendAngle);
            // const axis = new THREE.Vector3(0,0,-1); // rotate around z axis
            // vector.applyAxisAngle(axis, relativeAngle);
            // pointX = vector.x;

            // pointY = vector.y;
            pointX = prevPoint[0] + nodeDistance * Math.sin(relativeAngle);
            pointY = prevPoint[1] + nodeDistance * Math.cos(relativeAngle);
        }
        points.push([pointX, pointY]);
        prevPoint = [pointX, pointY];
    }

    const vectors = points.map((point) => {
        return new THREE.Vector3(point[0], point[1], 0);
    });
    return vectors;
}

const getNodeVectorsList = (n, nodeDistance, bendAngle) => {
    const vectorsList = [];
    for (let i = 2; i <= n; i++) {
        const seq = getCollatzSequence(i);
        const vectors = createSplinePathFromCollatz(seq, nodeDistance, bendAngle);
        vectorsList.push(vectors);
    }
    return vectorsList;
};

const CanvasContainer = ({ nodeDistance, bendAngle, sequenceLimit }) => {

    const vectorsList = getNodeVectorsList(sequenceLimit, nodeDistance, bendAngle);

    return (
        <Canvas>
            <OrbitControls enableDamping enablePan enableRotate enableZoom />
            <group position={[0, 0, 0]} scale={[0.01, 0.01, 0.01]}>
                {vectorsList.map((vectors, index) => {
                    // create a spline from all the vector points
                    const spline = new THREE.CatmullRomCurve3(vectors);
                    spline.curveType = "catmullrom";
                    spline.closed = false;
                    const randRotX = Math.random()/2;
                    const randRotY = Math.random()/2;
                    const randRotZ = Math.random()/2;
                    return <mesh key={index} rotation-x={randRotX} rotation-y={randRotY} rotation-z={randRotZ}>
                        <tubeGeometry args={[spline,
                            tubeGeometryParams.extrusionSegments,
                            tubeGeometryParams.radius,
                            tubeGeometryParams.radiusSegments]} />
                        <meshNormalMaterial side={THREE.DoubleSide} />
                    </mesh>

                })}
            </group>
        </Canvas>
    );
};

export default CanvasContainer;
