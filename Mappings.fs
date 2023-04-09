[<CLIMutable>]
type Person =
    { PersonId: int
      FirstName: string
      LastName: string
      Address: string
      City: string }

type PersonDataContext() =
    inherit DbContext()

    [<DefaultValue>]
    val mutable persons: DbSet<Person>

    member this.Persons
        with public get () = this.persons
        and public set p = this.persons <- p

    override __.OnConfiguring(optionsBuilder: DbContextOptionsBuilder) =
        optionsBuilder.UseSqlServer("YOUR CONNECTION STRING") |> ignore
