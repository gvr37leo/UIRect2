/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/eventsystemx/EventSystem.ts" />

/// <reference path="node_modules/rect3x/rect.ts" />
/// <reference path="UIRect.ts" />
/// <reference path="flexbox.ts" />



var crret = createCanvas(500,500)
var canvas = crret.canvas
var ctxt = crret.ctxt

var virtualscreen = new DragRect(new Box(new Rect(new Vector(10,10), new Vector(490,490))))
var uirect = new UIRect(
    new Rect(new Vector(0,0), new Vector(0,0)),
    new Rect(new Vector(0,0), new Vector(50,50)),
    virtualscreen.rect
)

var uirect2 = new UIRect(
    new Rect(new Vector(0,0), new Vector(0,0)),
    new Rect(new Vector(0,0), new Vector(50,50)),
    virtualscreen.rect
)

var flexbox = new Flexbox(virtualscreen.rect,[uirect,uirect2])

loop((dt) => {
    ctxt.clearRect(0,0,500,500)

    virtualscreen.draw(ctxt)
    uirect.draw(ctxt)
    uirect2.draw(ctxt)
})
