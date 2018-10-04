/// <reference path="UIRect.ts" />

enum Justification{
    start,
    end,
    center,
    spacebetween,
    spacearound,
    spaceevenly,
}

enum Alignment{
    start,
    end,
    center,
    stretch,
}

class Flexbox{

    public justifyContent:Justification
    public AlignItems:Alignment

    constructor(public rect:Rect, public rects:Rect[]){

    }

    positionStart(){
        return this.spaceBlocks(new Vector(0,0),new Vector(0,0))
    }

    positionEnd(){
        var freespace = this.freespace(this.widthOfBlocks())
        return this.spaceBlocks(new Vector(freespace, 0), new Vector(0, 0))
    }

    positionCenter(){
        var width = this.widthOfBlocks()
        var center = this.rect.getPoint(new Vector(0.5,0.5))
        return this.spaceBlocks(new Vector(center.x - width / 2,0), new Vector(0,0))
    }

    positionBetween(){
        var freespacePerBlock = this.freespacePerBlock()
        return this.spaceBlocks(new Vector(0,0), new Vector(freespacePerBlock,0))
    }

    positionAround(){
        var freespacePerBlock = this.freespacePerBlock()
        return this.spaceBlocks(new Vector(freespacePerBlock / 2,0), new Vector(freespacePerBlock,0))
    }

    positionEvenly(){
        var gaps = this.rects.length + 1;
        var freespace = this.freespace(this.widthOfBlocks());
        var freespacePerGap = freespace / gaps;
        return this.spaceBlocks(new Vector(freespacePerGap,0), new Vector(freespacePerGap,0));
    }

    spaceBlocks(begin:Vector,skip:Vector){
        var result:Rect[] = []
        var current = begin.c()
        for(var rect of this.rects){
            var start = current.c()
            var end = start.c().add(rect.size)
            result.push(new Rect(start,end))
            current.x += rect.size.x + skip.x
        }
        return result
    }

    calcTopBottom(alignment:Alignment, rect:Rect){
        var bot = 0;
        var top = this.rect.size.y
        switch(alignment){
            case Alignment.start:{
                return [bot,rect.size.y];
            }
            case Alignment.end:{
                return [top - rect.size.y, top];
            }
            case Alignment.center:{
                var center = top / 2
                var halfsize = rect.size.y / 2
                return [center - halfsize, center + halfsize];
            }
            case Alignment.stretch:{
                return [bot,top];
            }
        }
    }

    widthOfBlocks(){
        return this.rects.reduce((p,c) => p += c.size.x, 0)
    }

    freespace(widthOfBlocks:number){
        return this.rect.size.x - widthOfBlocks
    }

    freespacePerBlock(){
        return this.freespace(this.widthOfBlocks()) / this.rects.length
    }
}