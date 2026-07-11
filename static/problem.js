import { Board_Canvas } from "./scripts/board.js"
import { Colour_Select } from "./scripts/select.js"

const Canvas = document.getElementById("canvas")
const Board_Display = new Board_Canvas(Canvas)
const Select = document.getElementById("select")
const Colour_Select_Display = new Colour_Select(Select)

let Current_Colour_Selected = 100
let Current_Board_Size;
let Current_Board_Data;

function Generate_Default_Board(Board_Size)
{
    const Dummy_Row = []
    const Dummy_Board = []
    for (let cols = 0; cols < Board_Size; cols++)
    {
        Dummy_Row.push(100)
    }
    for (let rows = 0; rows < Board_Size; rows++)
    {
        Dummy_Board.push([...Dummy_Row])
    }
    return Dummy_Board
}

function Update_Board_Size(New_Size)
{
    Current_Board_Size = New_Size
    Current_Board_Data = Generate_Default_Board(New_Size)
    Board_Display.Set_Board_Dimension_To(New_Size)
    Draw_New_Board()
}

function Draw_New_Board()
{
    Board_Display.Clear_Board()
    Board_Display.Draw_Grid(Current_Board_Data)
    Board_Display.Draw_Borders()
}

function Click_On_Cell(Canvas_X, Canvas_Y)
{
    if (!Board_Display.Grid_Hitbox_Detect(Canvas_X, Canvas_Y))
    {
        return
    }
    const [Board_Row, Board_Col] = Board_Display.Convert_Canvas_To_Board_Coords(Canvas_X, Canvas_Y)
    Current_Board_Data[Board_Row][Board_Col] = Current_Colour_Selected
    Draw_New_Board()
}

function Click_On_Colour(Select_Y)
{
    Colour_Select_Display.Clear_Canvas()
    const Board_Man = Colour_Select_Display.Canvas_To_Board(Select_Y)
    const Fun_Value = Colour_Select_Display.Get_Colour_Value(Board_Man)
    Current_Colour_Selected = Fun_Value
    Colour_Select_Display.Draw_Selection()
    Colour_Select_Display.Draw_Active(Board_Man)
}

function main()
{
    Update_Board_Size(5)
    Colour_Select_Display.Draw_Selection()
    console.log("Hello World")

    Canvas.addEventListener("click", (event) => {
        const [Canvas_X, Canvas_Y] = [event.offsetX, event.offsetY]
        Click_On_Cell(Canvas_X, Canvas_Y)
    })

    Select.addEventListener("click", (event) => {
        const Select_Y = event.offsetY
        Click_On_Colour(Select_Y)
    })

    const Size_Select = document.getElementById("size-input")
    Size_Select.addEventListener("change", (event) => {
        const The_Big_Size = Number(Size_Select.value)
        Update_Board_Size(The_Big_Size)
    })

    const Submit_Button =document.getElementById("submit")
    Submit_Button.addEventListener("click", (event) => {
        console.log(Current_Board_Data)
        fetch('/process', 
            {
                'method': 'POST',
                'body': JSON.stringify(Current_Board_Data),
                'headers': {'Content-Type': 'application/json' }
            })
        .then(response => 
            {
                if (response.redirected) 
                {
                    window.location.href = response.url;
                }
            }
        )
    })
}

window.onload = () => {
    main()
}