var sketch = require("sketch");
var document = sketch.getSelectedDocument();
var selectedItems = document.selectedLayers.layers;

export default function () {
    let colors = [];
    let fills = [];
    let multiFills = [];
    if (selectedItems.length === 2) {
        selectedItems.forEach((layer) => {
            if (layer.type === "Shape" || layer.type === "ShapePath") {
                fills.push(layer.style.fills);
                if (layer.style.fills[0].fillType === "Gradient") {
                    colors.push(layer.style.fills[0].gradient.stops[0].color);
                } else {
                    colors.push(layer.style.fills[0].color);
                }
                if (layer.style.fills.length > 1) {
                    multiFills.push(layer.style.fills);
                }
            } else if (layer.type === "Text") {
                console.log(layer.style.textColor);
                colors.push(layer.style.textColor);
            }
        });
        console.log(colors);
        let counter = 1;
        selectedItems.forEach((layer) => {
            if (layer.type === "Shape" || layer.type === "ShapePath") {
                if (multiFills[counter] !== undefined) {
                    layer.style.fills = multiFills[counter];
                } else if (fills[counter] !== undefined) {
                    layer.style.fills = fills[counter];
                } else {
                    console.log("Apply here:" + colors[counter]);
                    layer.style.fills = [];
                    console.log(layer.style.fills);
                    layer.style.fills = [
                        {
                            fillType: "Color",
                            color: colors[counter],
                        },
                    ];

                    console.log(layer.style.fills);
                }
            } else if (layer.type === "Text") {
                layer.style.textColor = colors[counter];
            }
            counter--;
        });
        fills = [];
        colors = [];
    }
}
