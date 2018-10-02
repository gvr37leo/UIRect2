/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/eventsystemx/EventSystem.ts" />

/// <reference path="node_modules/rect3x/rect.ts" />
/// <reference path="UIRect.ts" />


var crret = createCanvas(500,500)
var canvas = crret.canvas
var ctxt = crret.ctxt

var dragrect = new DragRect(new Rect(new Vector(10,10), new Vector(100,100)))

loop((dt) => {
    ctxt.clearRect(0,0,500,500)

    dragrect.draw(ctxt)
})
