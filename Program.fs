open FNDDS

[<EntryPoint>]
let main argv =
    Datafile.ensureExists |> Async.RunSynchronously
    0
