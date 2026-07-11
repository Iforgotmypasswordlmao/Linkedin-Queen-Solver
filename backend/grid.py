type Position = tuple[int, int]
type Colour_Cells = dict[int, list[Position]]
type Queen_Check = dict[int, bool]
type Board_Cells = list[list[int]]

class Cell_Datapacket:
    def __init__(self, Colours: Colour_Cells, Queens: Queen_Check, Dimension: int):
        self.Colours = Colours
        self.Queens = Queens
        self.Dimension = Dimension
    
    def Sort_Colors(self):
        Sorted_Colour_Cells: Colour_Cells = {Colour: Cells for Colour, Cells in sorted(self.Colours.items(), key=lambda item: len(item[1]))}
        self.Colours = Sorted_Colour_Cells

def Parse_Grid(Board_Data: Board_Cells) -> Cell_Datapacket:
    
    Sorted_Cells: Colour_Cells = {}
    Colour_Queen_Check: Queen_Check = {}
    Board_Dimensions: int = len(Board_Data)

    for rows in range(Board_Dimensions):
        for cols in range(Board_Dimensions):

            Current_Cell_Colour: int = Board_Data[rows][cols]
            if (not Current_Cell_Colour in Sorted_Cells):
                Sorted_Cells[Current_Cell_Colour] = []
                Colour_Queen_Check[Current_Cell_Colour] = False

            Sorted_Cells[Current_Cell_Colour].append((rows, cols))

    return Cell_Datapacket(Sorted_Cells, Colour_Queen_Check, Board_Dimensions)

def Check_State_Of_Board(Cell_Data: Cell_Datapacket) -> tuple[bool, bool]:
    
    No_More_Moves = False
    Valid_Solution = False

    for (Colour, Valid_Cells) in Cell_Data.Colours.items():
        Is_There_Queen_In_Colour = Cell_Data.Queens[Colour]
        No_More_Moves = (len(Valid_Cells) == 0)
        Valid_Solution = (Is_There_Queen_In_Colour == No_More_Moves == True)
        if (Is_There_Queen_In_Colour != No_More_Moves):
            return (No_More_Moves, Valid_Solution)

    return (No_More_Moves, Valid_Solution)
    
def Place_Queen(Cell_Data: Cell_Datapacket, Location: Position, ) -> Cell_Datapacket:
    Queen_Row, Queen_Col = Location
    Remove_These_Cells: set[Position] = set()

    Dummy_Queen = Cell_Data.Queens
    Dummy_Colours = Cell_Data.Colours

    for Fixed_Position in range(Cell_Data.Dimension):
        Remove_These_Cells.add((Queen_Row, Fixed_Position))
        Remove_These_Cells.add((Fixed_Position, Queen_Col))
    Remove_These_Cells.add((Queen_Row + 1, Queen_Col + 1))
    Remove_These_Cells.add((Queen_Row - 1, Queen_Col + 1))
    Remove_These_Cells.add((Queen_Row + 1, Queen_Col - 1))
    Remove_These_Cells.add((Queen_Row - 1, Queen_Col - 1))

    for (Colour, Cells_List) in Cell_Data.Colours.items():
        Leftover_Cells = []
        if (Location in Cells_List):
            Dummy_Queen[Colour] = True
        else:
            for Squares in Cells_List:
                if not Squares in Remove_These_Cells:
                    Leftover_Cells.append(Squares)
        Dummy_Colours[Colour] = Leftover_Cells

    return Cell_Datapacket(Dummy_Colours, Dummy_Queen, Cell_Data.Dimension)