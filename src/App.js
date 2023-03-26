import React, { useEffect, useState } from 'react';
import { Form } from './components/FormAddName';
import { Filter } from './components/filterName';
import { TableNumbers } from './components/TableNumbers';
import routesPhone from './services/routes'
import { getId }from './services/generatorID';
import { Notification } from './components/Notification';
import { ErrorMessage } from './components/ErrorMessage';


const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ numberPhone , setNumber] = useState('');
  const [ nameSearch, setSearch] = useState( '' );
  const [ message, setMessage] = useState(null);
  const [myError, setMyError ] = useState([]);

// getting data in db

  useEffect(() => {
    routesPhone.get()
    .then(data => {
      setPersons(persons => data)
    })
  }, [])

// creating number in the db

  const addNewName = (e) => {
      if (persons.find(person => person.name === newName)){
        const confirm = window.confirm(`the ${newName} is alredy added, you want remplace the old number with a new one`);

        // if user exist en db we'll update the number

        if(confirm){
          const nPerson = persons.find(persons => persons.name === newName);
          
          const newObject = {
            ...nPerson,
            number: numberPhone
          }

          const options = {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(newObject)
          };

          routesPhone.updateNumber(nPerson.id, options)
            .then(res => {
              if(res.id){
                const numberUpdate = persons.map(person =>  person.id !== res.id ? person : { ...res });

                setMessage(`you've changed the number associated with the name: "${newName}"`);

                setTimeout(() => {
                setMessage(null);
                }, 5000);

                setPersons(numberUpdate);
                setNewName('');
                setNumber('');
              }else{
                const filterPerson = persons.filter(person => person.id !== nPerson.id );

                const template = [`Information of "${nPerson.name}" has already been removed from server.`, `Status Code: ${res}`];

                setMyError(template);
                setPersons(filterPerson);
                setNewName('');
                setNumber('');
                setTimeout(() => {
                  setMyError([]);
                }, 5000);
              }
            })

        }

      } else {
        const newPerson = 
        {
          id: getId(),
          name: newName,
          number: numberPhone
        }

        const options = {
          method: 'POST',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(newPerson)
        }

        routesPhone.create(options)
          .then(data => {
            setMessage(`you've added a new number with the name: "${data.name}" to the list`);
            
            setTimeout(() => {
              setMessage(null);
            }, 5000);

            setPersons(persons => persons.concat(data));
            setNewName('');
            setNumber('');
          });
      };
  };

  // deleting number in db

  const deleteNumber = (id) => {
    if (window.confirm("Do you really want to delete this number?")) {
        routesPhone.deleteNber(id)
        .then(res => {
        if(res.status === 200){

          const messageName = persons.find(person => person.id === id);
          
          const infoUpdate = persons.filter(person => person.id !== id)
          
          setMessage(`you've erased the number associated with name: "${messageName.name}"`);

          setTimeout(()=>{
            setMessage(null);
          }, 5000);

          setPersons(infoUpdate)
        }});
    };
  };
  
  const confirmError = myError.length > 0;

  return (
    <div className='App'>
      <h2>Phonebook</h2>
          {confirmError && <ErrorMessage   error={myError}/>}
          <Notification message={message}/>
          <Filter nameSearch={nameSearch} persons={persons} setSearch={setSearch}/>
          <Form  addNewName={addNewName} newName={newName} setNewName={setNewName} numberPhone={numberPhone}   setNumber={setNumber} persons={persons}/>
          <h2>Numbers</h2>
          <TableNumbers  persons={persons} deleteNumber={deleteNumber}/>
    </div>
  );
};

export default App