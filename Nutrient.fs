namespace FNDDS

open DotNetZip

[<CLIMutable>]
type Nutrient =
    { Id: int
      Name: string
      UnitName: string
      NutrientNumber: float option
      Rank: int option }

(*
stream csv file line by line
map each line to type (steam or iteration)
*)
