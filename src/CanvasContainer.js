import { Canvas, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

const CanvasContainer = ({ meshObjects, vectorsList, drawDebugLine }) => {
    const Foo = () => {
        const group = new THREE.Group();

        const {
            scene,
            camera,
            gl: { domElement },
        } = useThree();
        meshObjects.forEach((mesh) => {
            group.add(mesh);
        });
        if (drawDebugLine) {
            vectorsList.forEach((vectors) => {
                //create a blue LineBasicMaterial
                const material = new THREE.LineBasicMaterial({
                    color: 0x0000ff,
                });
                const geometry = new THREE.BufferGeometry().setFromPoints(
                    vectors
                );
                const line = new THREE.Line(geometry, material);
                group.add(line);
            });
        }

        group.position.set(0, 0, 0);
        group.scale.set(0.01, 0.01, 0.01);

        // adds x,y,z axes
        // const axesHelper = new THREE.AxesHelper(5);
        // scene.add(axesHelper);

        scene.add(group);
        return <mesh></mesh>;
    };
    return (
        <Canvas>
            <OrbitControls enableDamping enablePan enableRotate enableZoom />
            <Foo></Foo>
        </Canvas>
    );
};

export default CanvasContainer;
