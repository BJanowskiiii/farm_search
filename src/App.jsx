import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        const lastQuery = localStorage.getItem('last_query');
        search(lastQuery)
    }, []);

    const search = async (q)=> {
        const response = await fetch('http://localhost:8080?' + new URLSearchParams({q})
        );
        const data = await response.json()
        setAnimals(data)

        localStorage.setItem('lastQuery', q)
    }

    return (
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Animal Farm</h1>
            <input
                type='text'
                placeholder='search'
                onChange={(e)=>search(e.target.value)}
                style={{ textAlign: 'center' }}
            />

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {animals.map((animal)=>(
                    <Animal key={animal.id}  {...animal} />
                ))}
                {animals.length === 0 && 'No animal found, please type another letter to search animal :)'}
            </ul>
        </main>
    );
}

// eslint-disable-next-line react/prop-types
function Animal({type, age, name}){
    return (
        <li style={{ marginBottom: '5px', textAlign: 'center' }}>
            <strong>{type}</strong>{name} ({age} years old)
        </li>
    )
}

export default App;



// <li key={animal.id}>
//   <strong>{animal.type}</strong> {animal.name}
// </li>