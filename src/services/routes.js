

const baseUrl = `http://localhost:3005/notes`;


// get data db

const get = () => {
    const response = fetch(baseUrl)
                    .then(res => res.json());
    const data = response.then(res => res);
    return data;
};

// CREATE NUMBER AND NAME IN DB

const create = (option) =>{ 
    const response = fetch(baseUrl, option)
                    .then(res => res.json())
                    .catch(err => err);
        const data = response.then(res => res)
        return data;
    };

// UPDATE NUMBER 

const updateNumber = async (id, options) => {
    const response = await fetch(`${baseUrl}/${id}`, options)
    .then(res => {
        if(res.status === 404){
            const Error = `${res.status}`;
            return Error;
        }else {
            return res.json();
        }
    })
    .catch(err => err);
    return response;
    
};

// DELETING NUMBER IN DB

const deleteNber = (id) => {
    const option = {method: 'DELETE'}
    const response = fetch(`${baseUrl}/${id}`, option)
                    .then(res => res);
    return response;
}




export default { create, get, deleteNber, updateNumber }