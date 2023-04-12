namespace FNDDS

module Nutrient =

    [<CLIMutable>]
    type Nutrient =
        { Id: int
          Name: string
          UnitName: string
          NutrientNumber: float option
          Rank: int option }

// let read () =
//     let data = Csv.read "nutrient.csv"
//     |> Seq.map ()




// let convert = read "nutrient.csv"



(*
stream csv file line by line
map each line to type (steam or iteration)
*)