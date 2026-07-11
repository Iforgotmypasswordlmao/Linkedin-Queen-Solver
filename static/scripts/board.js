import { COLOURS } from "./colours.js"

export class Board_Canvas
{
    constructor(Canvas_Element)
    {
        this.Canvas_Element = Canvas_Element
        this.Context = Canvas_Element.getContext("2d")
        this.Cell_Length_Px = 50
        this.Canvas_Dimensions = this.Canvas_Element.width
        // Placeholder values 
        this.Board_Dimensions = 3
        // Since its a square we only need 1 number
        this.Boundary_Start = 0 
        this.Boundary_End = 100000 
        this.Queen_Image = new Image()
    }

    Set_Board_Dimension_To(Dimension)
    {
        this.Board_Dimensions = Dimension

        this.Boundary_Start = this.Convert_Board_To_Canvas_Coords(0, 0)[0]
        this.Boundary_End = this.Convert_Board_To_Canvas_Coords(Dimension, Dimension)[0]
    }

    Convert_Board_To_Canvas_Coords(Board_Row, Board_Col)
    {
        const Starting = 0.5*((this.Canvas_Dimensions) - (this.Board_Dimensions*this.Cell_Length_Px))
        return [(Board_Col*this.Cell_Length_Px + Starting), (Board_Row*this.Cell_Length_Px + Starting)]
    }

    Convert_Canvas_To_Board_Coords(Canvas_X, Canvas_Y)
    {
        const Board_Row = Math.floor((Canvas_Y - this.Boundary_Start)/this.Cell_Length_Px)
        const Board_Col = Math.floor((Canvas_X - this.Boundary_Start)/this.Cell_Length_Px)
        return [Board_Row, Board_Col]
    }

    Grid_Hitbox_Detect(Canvas_X, Canvas_Y)
    {
        if (this.Boundary_Start <= Canvas_X && Canvas_X <= this.Boundary_End)
        {
            if (this.Boundary_Start <= Canvas_Y && Canvas_Y <= this.Boundary_End)
            {
                return true
            }
        }
        return false
    }

    Draw_Cell(Colour, Board_Row, Board_Col)
    {
        const [Canvas_X, Canvas_Y] = this.Convert_Board_To_Canvas_Coords(Board_Row, Board_Col)
        const Colour_Hex = COLOURS[Colour]
        this.Context.fillStyle = Colour_Hex
        this.Context.fillRect(Canvas_X, Canvas_Y, this.Cell_Length_Px, this.Cell_Length_Px)
    }
    
    Draw_Grid(Board_Data)
    {
        for (let rows = 0; rows < Board_Data.length; rows++)
        {
            for (let cols = 0; cols < Board_Data.length; cols++)
            {
                const Cell_Colour = Board_Data[rows][cols]
                this.Draw_Cell(Cell_Colour, rows, cols)
            }
        }
    }

    Draw_Borders()
    {
        for (let Stroke_count = 0; Stroke_count < this.Board_Dimensions+1; Stroke_count++)
        {
            const Position = this.Boundary_Start + Stroke_count*this.Cell_Length_Px
            this.Context.strokeStyle = "rgb(0, 0, 0)"
            this.Context.moveTo(Position, this.Boundary_Start)
            this.Context.lineTo(Position, this.Boundary_End)
            this.Context.moveTo(this.Boundary_Start, Position)
            this.Context.lineTo(this.Boundary_End, Position)
            this.Context.stroke()
        }
    }

    Clear_Board()
    {
        this.Context.clearRect(0, 0, this.Canvas_Dimensions, this.Canvas_Dimensions)
        this.Context.beginPath()
    }

    Draw_Queens(Position_Of_Queens)
    {
        this.Queen_Image.onload = () => {
            Position_Of_Queens.map((Location) => {
                const [QC_X, QC_Y] = this.Convert_Board_To_Canvas_Coords(Location[0], Location[1])
                this.Context.drawImage(this.Queen_Image, QC_X, QC_Y, this.Cell_Length_Px, this.Cell_Length_Px)
            })
        }
        this.Queen_Image.src = "static/assets/queen.png"
    }

    Draw_Text(Text)
    {
        this.Context.font = "50px Arial"
        this.Context.fillText(Text, 0, 0)
    }


}