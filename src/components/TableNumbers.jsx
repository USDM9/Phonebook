


export const TableNumbers = ({persons, deleteNumber}) => {
    return <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Number</td>
                    </tr>
                </thead>
                <Tbody person={persons} deleteNumber={deleteNumber}/>
            </table>
}


const Tbody = ({person, deleteNumber}) => {
    return  <tbody>
                {person.map(
                        item => <tr key={item.name}>
                                    <td> {item.name}</td>
                                    <td>{item.number}</td>
                                    <td>
                                        <button onClick={() => deleteNumber(item.id)}>
                                            delete this number
                                        </button>
                                    </td>
                                </tr>)}
            </tbody>
}
