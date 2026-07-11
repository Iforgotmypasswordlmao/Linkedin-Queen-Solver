import { COLOURS } from "./colours.js"

export class Colour_Select
{
    constructor(Canvas_Element)
    {
        this.Canvas_Element = Canvas_Element
        this.Context = Canvas_Element.getContext("2d")
        this.Cell_Length_Px = 50

        this.Colour_List = Object.keys(COLOURS).filter((number) => number < 50).map(num => Number(num))
        console.log(this.Colour_List)
    }

    Canvas_To_Board(Canvas_Y)
    {
        const Board_Row = Math.floor(Canvas_Y/this.Cell_Length_Px)
        return Board_Row
    }

    Get_Colour_Value(Board_Row)
    {
        return this.Colour_List[Board_Row]
    }
    
    Draw_Selection()
    {
        for (let Big_N = 0; Big_N < this.Colour_List.length; Big_N++)
        {
            const Colour_Value = this.Colour_List[Big_N]
            const Fill_Value = COLOURS[Colour_Value]
            this.Context.fillStyle = Fill_Value
            this.Context.fillRect(0, Big_N*this.Cell_Length_Px, this.Cell_Length_Px, this.Cell_Length_Px)
        }
    }

    Clear_Canvas()
    {
        this.Context.clearRect(0, 0, this.Cell_Length_Px, this.Canvas_Element.height)
    }

    Draw_Active(Board_Row)
    {
        this.Context.strokeStyle = "rgb(0, 0, 0)"
        this.Context.lineWidth = 2
        this.Context.strokeRect(0, Board_Row*this.Cell_Length_Px, this.Cell_Length_Px, this.Cell_Length_Px)
        this.Context.stroke()
    }
}