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

    constructor(public rect:Rect){
        this.topLeft = new Handle(new Box(this.rect.getPoint(new Vector(0,0))))
        this.topRight = new Handle(new Box(this.rect.getPoint(new Vector(1,0))))
        this.bottomLeft = new Handle(new Box(this.rect.getPoint(new Vector(0,1))))
        this.bottomRight = new Handle(new Box(this.rect.getPoint(new Vector(1,1))))

        this.topLeft.pos.onchange.listen(v => {
            this.rect.min.overwrite(v)
        })

        this.topRight.pos.onchange.listen(v => {
            this.rect.min.y = v.y
            this.rect.max.x = v.x
        })

        this.bottomLeft.pos.onchange.listen(v => {
            this.rect.max.overwrite(v)
        })

        this.bottomRight.pos.onchange.listen(v => {
            this.rect.min.x = v.x
            this.rect.max.y = v.y
        })
    }
}