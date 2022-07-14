var sketch = require("sketch");
var document = sketch.getSelectedDocument();
var selectedItems = document.selectedLayers.layers;

export default function () {
    let colors = [];
    if (selectedItems.length === 2) {
        selectedItems.forEach((layer) => {
            if (layer.type === "Shape" || layer.type === "ShapePath") {
                colors.push(layer.style.fills[0].color);
            } else if (layer.type === "Text") {
                colors.push(layer.style.textColor);
            }
        });
        console.log(colors);
        let counter = 1;
        selectedItems.forEach((layer) => {
            if (layer.type === "Shape" || layer.type === "ShapePath") {
                layer.style.fills[0].color = colors[counter];
            } else if (layer.type === "Text") {
                layer.style.textColor = colors[counter];
            }
            counter--;
        });
    }
}
