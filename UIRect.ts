/// <reference path="Handle.ts" />


class UIRect{

    readonly absRect:Box<Rect>
    anchor:Rect
    offset:Rect




    constructor(){

    }

}

class DragRect{
    topLeft:Handle
    topRight:Handle
    bottomLeft:Handle
    bottomRight:Handle
    handles: Handle[];

    constructor(public rect:Rect){
        this.topLeft = new Handle(new Box(new Vector(0,0)))
        this.topRight = new Handle(new Box(new Vector(0,0)))
        this.bottomRight = new Handle(new Box(new Vector(0,0)))
        this.bottomLeft = new Handle(new Box(new Vector(0,0)))
        this.updateHandles()
        this.handles = [this.topLeft,this.topRight,this.bottomRight,this.bottomLeft]

        this.topLeft.pos.onchange.listen(v => {
            this.rect.min.overwrite(v)
            this.updateHandles()
        })

        this.topRight.pos.onchange.listen(v => {
            this.rect.min.y = v.y
            this.rect.max.x = v.x
            this.updateHandles()
        })

        this.bottomLeft.pos.onchange.listen(v => {
            this.rect.min.x = v.x
            this.rect.max.y = v.y
            this.updateHandles()
        })

        this.bottomRight.pos.onchange.listen(v => {
            this.rect.max.overwrite(v)
            this.updateHandles()
        })
    }

    updateHandles(){
        this.topLeft.pos.value.overwrite(this.rect.getPoint(new Vector(0,0)))
        this.topRight.pos.value.overwrite(this.rect.getPoint(new Vector(1,0)))
        this.bottomRight.pos.value.overwrite(this.rect.getPoint(new Vector(1,1)))
        this.bottomLeft.pos.value.overwrite(this.rect.getPoint(new Vector(0,1)))
    }

    draw(ctxt:CanvasRenderingContext2D){
        this.handles.forEach(h => h.draw(ctxt))
        this.rect.draw(ctxt)
    }
}