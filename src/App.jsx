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
        <main>
            <h1>Animal Farm</h1>
            <input
                type='text'
                placeholder='search'
                onChange={(e)=>search(e.target.value)}
            />

            <ul>
                {animals.map((animal)=>(
                    <Animal key={animal.id}  {...animal} />
                ))}
                {animals.length === 0 && 'no animal found'}
            </ul>
        </main>
    );
}

function Animal({type, age, name}){
    return (
        <li style={{ marginBottom: '5px' }}>
            <strong>{type}</strong>{name} ({age} years old)
        </li>
    )
}

export default App;




// <li key={animal.id}>
//   <strong>{animal.type}</strong> {animal.name}
// </li>