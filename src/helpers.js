
import {
    Shape,
    ExtrudeGeometry,
    WireframeGeometry,
    LineSegments,
    DepthFormat,
    MeshBasicMaterial,
    Mesh,
} from "three";


function collatz(sequence, n) {
    sequence.push(n);
    if (n === 1) {
      return;
    }
    if (n % 2 === 0) {
      collatz(sequence, n / 2);
    } else {
      collatz(sequence, (3 * n + 1) / 2);
    }
  }


export const getCollatzSequence = (n) => {
    const sequence = [];
    collatz(sequence, n)
    return sequence;
}

