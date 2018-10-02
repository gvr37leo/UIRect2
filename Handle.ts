class Handle{
    selected:boolean = false;

    constructor(public pos:Box<Vector>){

        document.addEventListener('mousedown',e => {
            var mousepos = getMousePos(canvas,e)
            
            if(this.pos.get().to(mousepos).length() < 10){
                this.selected = true
            }
        })

        document.addEventListener('mouseup', e => {
            this.selected = false
        })

        document.addEventListener('mousemove', e => {
            var mousepos = getMousePos(canvas,e)
            if(this.selected){
                this.pos.set(mousepos)
            }
        })
    }

    draw(ctxt:CanvasRenderingContext2D){
        this.pos.get().draw(ctxt)
    }
}