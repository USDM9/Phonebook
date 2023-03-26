

export const Form = ({persons, newName, setNewName, numberPhone,setNumber,addNewName}) => {

  return <div>
  <form onSubmit={(e) => {
    e.preventDefault()
    addNewName()
  }}>     
                <h2>Add name on the Phonebook</h2>
                  <label>Name:{' '}
                      <input value={newName} onChange={
                      (e) => setNewName(
                      newName => e.target.value)}/>
                    </label><br/>
                  <label>Number:{' '}
                      <input value={numberPhone} onChange={(e) => setNumber(numberPhone => e.target.value)}/>
                  </label>
                <button type="submit">add</button>
            </form>
            </div>
}


