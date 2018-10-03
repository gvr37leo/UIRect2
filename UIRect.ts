/// <reference path="Handle.ts" />


class UIRect{

    readonly absRect:Box<Rect>
    anchorDragRect:DragRect
    offsetDragRect:DragRect

    constructor(public anchor:Rect, public offset:Rect, public parent:Box<Rect>){

        this.parent.onchange.listen(rect => {
            
        })

        this.anchorDragRect.rect.onchange.listen(rect => {

        })

        this.offsetDragRect.rect.onchange.listen(rect => {

        })
    }

    readinhandles(){
        this.anchor = UIRect.Abs2Rel(this.parent.value,this.anchorDragRect.rect.value)
        this.offset = null
    }

    readtowardshandles(){
        this.anchorDragRect.rect.set(UIRect.Rel2Abs(this.parent.value,this.anchor))
        this.offsetDragRect.rect.set(null)
    }

    //converts abschild to relchild
    static Abs2Rel(absparent:Rect,abschild:Rect):Rect{
        var size = absparent.size()
        var min = absparent.min.to(abschild.min)
        var max = absparent.min.to(abschild.max)
        return new Rect(min.div(size), max.div(size))//what if size is 0?
    }

    //converts relchild 2 abschild
    static Rel2Abs(absparent:Rect,relchild:Rect):Rect{
        var size = absparent.size()
        var min = size.c().mul(relchild.min).add(absparent.min);
        var max = size.c().mul(relchild.max).add(absparent.min);
        return new Rect(min, max)
    }

}

class DragRect{
    topLeft:Handle
    topRight:Handle
    bottomLeft:Handle
    bottomRight:Handle
    handles: Handle[];

    constructor(public rect:Box<Rect>){
        this.topLeft = new Handle(new Box(new Vector(0,0)))
        this.topRight = new Handle(new Box(new Vector(0,0)))
        this.bottomRight = new Handle(new Box(new Vector(0,0)))
        this.bottomLeft = new Handle(new Box(new Vector(0,0)))
        this.handles = [this.topLeft,this.topRight,this.bottomRight,this.bottomLeft]
        this.updateHandles()
        this.rect.onchange.listen(rect => {
            this.updateHandles()
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
    }

    draw(ctxt:CanvasRenderingContext2D){
        this.handles.forEach(h => h.draw(ctxt))
        var size = this.rect.value.size()
        ctxt.strokeRect(this.rect.value.min.x,this.rect.value.min.y,size.x,size.y)
    }
}