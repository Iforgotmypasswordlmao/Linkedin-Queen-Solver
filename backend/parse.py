
def Parse_Canvas_Board(Board_Data: list[list[int]]) -> dict[str, any]:
    Success_Code = {
        "Success": False,
        "Message": "Debug"
    }
    Colour_List = set()
    Board_Length = len(Board_Data)
    for rows in Board_Data:
        if (100 in rows):
            Success_Code['Message'] = 'There is empty squares in the board'
            return Success_Code

        Board_Row_Length = len(rows)
        if (Board_Row_Length != Board_Length):
            #This should be impossible to do btw
            Success_Code['Message'] = 'Board Dimensions is not a square'
            return Success_Code
        
        for cells in rows:
            Colour_List.add(cells)
    
    if (len(Colour_List) != Board_Length):
        Success_Code['Message'] = 'Number of Colours should match the dimensions of the board'
        return Success_Code

    """TODO: DFS of board to make sure colours connect"""

    Success_Code['Success'] = True
    return Success_Code