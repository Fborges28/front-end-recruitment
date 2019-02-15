import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home.jsx";
import "../sass/main.scss";

let documentRoot = document.getElementById("appRoot");

class App extends React.Component {
  render(){
    return (
      <Home/>
    )
  }
}

// Renderiza a aplicação
ReactDOM.render(<App/>, documentRoot);