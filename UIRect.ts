/// <reference path="Handle.ts" />


class UIRect{

    readonly absRect:Box<Rect>
    anchorDragRect:DragRect
    offsetDragRect:DragRect

    constructor(public anchor:Rect, public offset:Rect, public parent:Box<Rect>){

        // this.anchorDragRect = new DragRect(new Box())

        this.parent.onchange.listen(rect => {

        })

        this.anchorDragRect.rect.onchange.listen(rect => {

        })

        this.offsetDragRect.rect.onchange.listen(rect => {

        })
    }

    readinhandles(){
        this.anchor = UIRect.Abs2Rel(this.parent.value,this.anchorDragRect.rect.value)
        this.offset = UIRect.Abs2LocalOffset(this.anchorDragRect.rect.value,this.offsetDragRect.rect.value)
    }

    write2handles(){
        this.anchorDragRect.rect.set(UIRect.Rel2Abs(this.parent.value,this.anchor))
        this.offsetDragRect.rect.set(UIRect.LocalOffset2Abs(this.anchorDragRect.rect.value,this.offset))
    }

    //returns abschild as a percentage of absparent
    static Abs2Rel(absparent:Rect,abschild:Rect):Rect{
        var size = absparent.size()
        var min = absparent.min.to(abschild.min)
        var max = absparent.min.to(abschild.max)
        return new Rect(min.div(size), max.div(size))//what if size is 0?
    }

    // converts a child expressed in percentages to absolute values
    static Rel2Abs(absparent:Rect,relchild:Rect):Rect{
        var size = absparent.size()
        var min = size.c().mul(relchild.min).add(absparent.min);
        var max = size.c().mul(relchild.max).add(absparent.min);
        return new Rect(min, max)
    }

    static Abs2LocalOffset(absparent:Rect,abschild:Rect):Rect{
        var min = absparent.min.to(abschild.min)
        var max = absparent.max.to(abschild.max)
        return new Rect(min,max)
    }

    static LocalOffset2Abs(absparent:Rect,localchild:Rect):Rect{
        var min = absparent.min.c().add(localchild.min)
        var max = absparent.max.c().add(localchild.max)
        return new Rect(min,max)
    }

}

class DragRect{
    topLeft:Handle
    topRight:Handle
    bottomLeft:Handle
    bottomRight:Handle
    handles: Handle[];
    center: Handle;

    constructor(public rect:Box<Rect>){
        this.topLeft = new Handle(new Box(new Vector(0,0)))
        this.topRight = new Handle(new Box(new Vector(0,0)))
        this.bottomRight = new Handle(new Box(new Vector(0,0)))
        this.bottomLeft = new Handle(new Box(new Vector(0,0)))
        this.center = new Handle(new Box(new Vector(0,0)))
        this.handles = [this.topLeft,this.topRight,this.bottomRight,this.bottomLeft,this.center]
        this.updateHandles()
        this.rect.onchange.listen(rect => {
            this.updateHandles()
        })

        this.center.pos.onchange.listen(v => {
            var change = this.rect.value.getPoint(new Vector(0.5,0.5)).to(v)
            this.rect.value.move(this.rect.value.min.c().add(change))
            this.rect.onchange.trigger(this.rect.value)
        })

        this.topLeft.pos.onchange.listen(v => {
            this.rect.value.min.overwrite(v)
            this.rect.onchange.trigger(this.rect.value)
        })

        this.topRight.pos.onchange.listen(v => {
            this.rect.value.min.y = v.y
            this.rect.value.max.x = v.x
            this.rect.onchange.trigger(this.rect.value)
        })

        this.bottomLeft.pos.onchange.listen(v => {
            this.rect.value.min.x = v.x
            this.rect.value.max.y = v.y
            this.rect.onchange.trigger(this.rect.value)
        })

        this.bottomRight.pos.onchange.listen(v => {
            this.rect.value.max.overwrite(v)
            this.rect.onchange.trigger(this.rect.value)
        })
    }

    updateHandles(){
        this.topLeft.pos.value.overwrite(this.rect.value.getPoint(new Vector(0,0)))
        this.topRight.pos.value.overwrite(this.rect.value.getPoint(new Vector(1,0)))
        this.bottomRight.pos.value.overwrite(this.rect.value.getPoint(new Vector(1,1)))
        this.bottomLeft.pos.value.overwrite(this.rect.value.getPoint(new Vector(0,1)))
        this.center.pos.value.overwrite(this.rect.value.getPoint(new Vector(0.5,0.5)))
    }

    draw(ctxt:CanvasRenderingContext2D){
        this.handles.forEach(h => h.draw(ctxt))
        var size = this.rect.value.size()
        ctxt.strokeRect(this.rect.value.min.x,this.rect.value.min.y,size.x,size.y)
    }
}