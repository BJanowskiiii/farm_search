import { useEffect, useState } from 'react';

function App() {
    const { search, animals } = useAnimalSearch();

    return (
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Animal Farm</h1>

            <input
                type="text"
                placeholder="Search"
                onChange={(e) => search(e.target.value)}
                style={{ textAlign: 'center' }}
            />

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {animals.map((animal) => (
                    <Animal key={animal.id} {...animal} />
                ))}

                {animals.length === 0 && 'No animals found'}
            </ul>
        </main>
    );
}

// Dumb UI component
// eslint-disable-next-line react/prop-types
function Animal({ type, name, age }) {
    return (
        <li style={{ marginBottom: '5px', textAlign: 'center' }}>
            <strong>{type}</strong> {name} ({age} years old)
        </li>
    );
}

// Custom Hook
function useAnimalSearch() {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        const lastQuery = localStorage.getItem('lastQuery');
        search(lastQuery);
    }, []);

    const search = async (q) => {
        const response = await fetch(
            'http://localhost:8080?' + new URLSearchParams({ q })
        );
        const data = await response.json();
        setAnimals(data);

        localStorage.setItem('lastQuery', q);
    };

    return { search, animals };
}

export default App;


// <li key={animal.id}>
//   <strong>{animal.type}</strong> {animal.name}
// </li>