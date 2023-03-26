
export const Filter = ({nameSearch ,setSearch , persons}) => { 
    const sinResults = nameSearch === ''
    return <div>
                <p>filter shown with {' '}
                <input value={nameSearch} onChange={(e) => setSearch(e.target.value)}/></p> 
                <div>
                        {sinResults ? 'filtering...' : persons.filter(
                        person => person.name.toLowerCase().includes(nameSearch))
                        .map(
                        persons => <div key={persons.name}>
                        {persons.name} {persons.number}</div>)}
                </div>
            </div>
}
