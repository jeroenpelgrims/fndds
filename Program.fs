open FNDDS

open Csv

[<EntryPoint>]
let main argv =
    Datafile.ensureExists |> Async.RunSynchronously
    let data = Csv.read2 ("nutrient.csv")
    let l = Seq.toList data
    let fs = l[0]
    printf "%s" fs.Name
    // let data = Nutrient.read
    // printfn data
    0