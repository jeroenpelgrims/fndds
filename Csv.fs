namespace FNDDS

open System.IO
open System.IO.Compression
open CsvHelper
open System.Globalization


module Csv =

    [<CLIMutable>]
    type Nutrient =
        { Id: int
          Name: string
          UnitName: string
          NutrientNumber: float option
          Rank: int option }

    let read (csvFile: string) =
        seq {
            use zipFile = ZipFile.OpenRead "data.zip"
            let entry = zipFile.GetEntry(csvFile)
            use sr = new StreamReader(entry.Open())

            while not sr.EndOfStream do
                yield sr.ReadLine()
        }
        |> Seq.skip 1

    let read2 (csvFile: string) =
        use zipFile = ZipFile.OpenRead "data.zip"
        let entry = zipFile.GetEntry(csvFile)
        use sr = new StreamReader(entry.Open())
        use csv = new CsvReader(sr, CultureInfo.InvariantCulture)
        csv.GetRecords<Nutrient>()