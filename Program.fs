module fndds

open System.IO
open System.Text.RegularExpressions
open System.Net.Http

let baseUrl = "https://fdc.nal.usda.gov/fdc-datasets/"
let datafile = "data.zip"

let mostRecentFile =
    async {
        let! html = (new HttpClient()).GetStringAsync(baseUrl) |> Async.AwaitTask
        let pattern = @"<a href=""FoodData_Central_csv_(\d{4}-\d{2}-\d{2}).zip"">"

        let mostRecentDate =
            seq {
                for m in Regex.Matches(html, pattern) do
                    yield m.Groups[1].Value
            }
            |> Seq.last

        let fileName = sprintf "FoodData_Central_csv_%s.zip" mostRecentDate
        return sprintf "%s%s" baseUrl fileName
    }

let downloadLatestFile =
    async {
        let! fileUrl = mostRecentFile
        let! dataStream = (new HttpClient()).GetStreamAsync(fileUrl) |> Async.AwaitTask

        printfn "Downloading datafile: %s" fileUrl
        using (File.OpenWrite datafile) (fun file -> dataStream.CopyTo(file))
        printfn "Download done"
    }

let ensureDataFile =
    let dataFileExists = File.Exists datafile

    async {
        if not dataFileExists then
            Async.RunSynchronously downloadLatestFile
    }


[<EntryPoint>]
let main argv =
    ensureDataFile |> Async.RunSynchronously
    0
