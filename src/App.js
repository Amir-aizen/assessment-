/* TODO: implement code in this file */
import "./App.css";
import {useState, useEffect} from "react";
// using useState to store variables
function App() {
    const [pokmons,
        setPokemons] = useState([]);
    const [newItem,
        setNewItem] = useState('');
    const [loading,
        setLoading] = useState(false);
    const [err,
        setErr] = useState(null);
    // using useEffect hook for get request 
    // using async/await for a better maintainability and a better practice
    useEffect(() => {
        const pokomList = async() => {
            setLoading(true);
            setErr(false);
            const res = await fetch('/pokemon')
            setLoading(false);
            const data = await res.json()
            setPokemons(data);
        }
        // error handling
        pokomList().catch((err) => {
            setErr(true);
        })

    }, []);
    /*you will notice that i didn't use error handling for the below requests and that's because it's not required for this assessment.
    in a real world project i would use error handling for any API request*/
    const addPokmon = async(e) => {
        e.preventDefault();

        const res = await fetch('/pokemon', {
            method: "POST",
            body: JSON.stringify({name: newItem}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })
        const data = await res.json()
        setPokemons(data);
        setNewItem('');

    }
    // i used .then here once. i generally would use async/await most of the time.
    
    const deletePokemon = async(pokoId) => {
        const res = await fetch(`/pokemon/${pokoId}`, {method: 'DELETE'}).then(() => {
            setPokemons((values) => values.filter((poko) => poko.id !== pokoId));
        })

    };
    return (
        <div >
            <form className="add-new-pokemon">
                <input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    type="text"/>
                <button disabled={!newItem} onClick={addPokmon} type="button">add</button>
            </form>

            <div className="error-pokemon">
                {err && <div style={{
                    color: `red`
                }}>error: 500</div>}
                {loading
                    ? (
                        <h3>loading....</h3>
                    )
                    : (
                        <ul className="original-pokemons">
                            {pokmons.map((pokemon) => (
                                <li key={pokemon.id} className="pokemon-list">
                                    {pokemon.name}
                                    <button
                                        id="myInput"
                                        value="x"
                                        type="button"
                                        onClick={() => deletePokemon(pokemon.id)}>x</button>
                                </li>
                            ))}
                        </ul>
                    )}
            </div>
        </div>

    );
}

export default App;
