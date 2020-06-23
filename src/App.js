import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Recipe from './Recipe'
import './App.css';


const App = () => {
  const APP_ID = "e1ad548e";
  const APP_KEY = "3e5d7077c2380fc81f82a9fc0fc3a11b";
  
 const [recipes, setRecipes] = useState([]);
 const [search, setSearch] = useState('');
 const [query, setQuery] = useState('chicken');
  useEffect(()=> {
    getRecepie();
  }, [query])
  
  const getRecepie = async ()=> {
    const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
  
    const response = await fetch(exampleReq);
    const data = await response.json();
    setRecipes(data.hits)
    console.log(data.hits)
  }

  const updateSearch = ((e)=> {
    setSearch(e.target.value)
    console.log(search)
  })

  const getSearch = ((e)=> {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  })
  return (
     <div className="App">
         <form onSubmit={getSearch} action="" className="search-form">
            <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
            <button className="search-button" type= "submit">
            Search
            </button>
         
         </form>
         <div className="recipes">
            {recipes.map(recipe => (
            <Recipe  
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            />
        ))}
        </div>
     </div>
  );
}

export default App;
