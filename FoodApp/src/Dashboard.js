import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { auth, logout,getRecipes } from "./firebase";

function App() {
  let arr = new Array(0);
  	
  const recipes = getRecipes();
  recipes.then(function(result) {
    {result.map(data => {
          arr.push(data)    
     })
    
 arr.forEach(element => console.log(element));
}
 })
 
 arr.forEach(element => console.log(element));
 const listItems = arr.map((data) =>
 <div>
 <h1>{1}</h1>
 <h2>{1}</h2>
</div>
 );
  return (
    <div className="app">
    <button className="sign-out" onClick={logout}>
        Logout 
      </button>
      <ul>{listItems}</ul>
    </div>
    
  );
}

export default App;