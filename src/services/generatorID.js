export const getId = (persons) => {
    const ids = persons.map(person => person.id)
    const maxId = ids === 0 ? ids : Math.max(...ids)
    return maxId;
};