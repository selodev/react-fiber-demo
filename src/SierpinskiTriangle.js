import React from "react";
import Dot from "./Dot";

var targetSize = 25;

export default class SierpinskiTriangle extends React.Component {
    shouldComponentUpdate(nextProps) {
        var o = this.props;
        var n = nextProps;
        return !(
            o.x === n.x &&
            o.y === n.y &&
            o.s === n.s &&
            o.children === n.children
        );
    }
    render() {
        let { x, y, s, children } = this.props;
        if (s <= targetSize) {
            return (
                <Dot
                    x={x - (targetSize / 2)}
                    y={y - (targetSize / 2)}
                    size={targetSize}
                    text={children}
                />
            );
        }
        var newSize = s / 2;
        var slowDown = true;
        if (slowDown) {
            var e = performance.now() + 0.8;
            while (performance.now() < e) {
                // Artificially long execution time.
            }
        }

        s /= 2;

        return [
            <SierpinskiTriangle x={x} y={y - (s / 2)} s={s}>
                {children}
            </SierpinskiTriangle>,
            <SierpinskiTriangle x={x - s} y={y + (s / 2)} s={s}>
                {children}
            </SierpinskiTriangle>,
            <SierpinskiTriangle x={x + s} y={y + (s / 2)} s={s}>
                {children}
            </SierpinskiTriangle>,
        ];
    }
}