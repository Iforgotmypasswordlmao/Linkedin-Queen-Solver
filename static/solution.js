import { Board_Canvas} from './scripts/board.js'

const Canvas = document.getElementById('canvas')
const Queen_Display = new Board_Canvas(Canvas)

function main()
{
    // defunct code here 
    const Parsed_Solution = Solution
    
    const Status = Parsed_Solution['Solved']
    const Board_Data = Parsed_Solution['Board_Input']

    Queen_Display.Set_Board_Dimension_To(Board_Data.length)
    Queen_Display.Draw_Grid(Board_Data)
    
    if (Status)
    {
        const Queen_Location = Parsed_Solution['Solution']
        Queen_Display.Draw_Queens(Queen_Location)
        Queen_Display.Draw_Borders()
    }
    else
    {
        Queen_Display.Draw_Text("This program could not find the solution to the give board")
    }
}

window.onload = () => {
    main()
}