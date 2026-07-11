from .grid import Check_State_Of_Board, Place_Queen, Cell_Datapacket, Position, Board_Cells, Parse_Grid
from copy import deepcopy

def Recursive_Solve_Queens(Cell_Data: Cell_Datapacket) -> tuple[bool, list[Position]]:
    (No_More_Moves, Valid_Solution) = Check_State_Of_Board(Cell_Data)
    # Valid solution and No more moves
    if (Valid_Solution):
        return (True, [])
    # Invalid, but no more moves
    elif (No_More_Moves):
        return (False, [])
    else:
        Cell_Data.Sort_Colors()
        for (Colour, Cells) in Cell_Data.Colours.items():
            if (not Cells):
                continue

            for Remaining_Cell in Cells:
                Board_After_Queen_Placed = Place_Queen(deepcopy(Cell_Data), Remaining_Cell)
                (Results, Queen_Positions) = Recursive_Solve_Queens(Board_After_Queen_Placed)
                if (Results):
                    Queen_Positions.append(Remaining_Cell)
                    return (True, Queen_Positions)
                
            return (False, [])

    # this is a failsafe
    return (False, [])

def Solve_Queens_Now(Board_Data: Board_Cells) -> dict[str, any]:
    Parsed_Data = Parse_Grid(Board_Data)
    Board_Solution = Recursive_Solve_Queens(Parsed_Data)
    return {
        "Solved": Board_Solution[0],
        "Solution": Board_Solution[1],
        "Board_Input": Board_Data
    }