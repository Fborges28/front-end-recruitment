import React from "react"
import BasicLayout from "../layout/BasicLayout.jsx"
import ProductList from "../components/ProductList.jsx"

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  componentDidMount(){

  }
 
  render(){
    console.log(this.state.products)

    let homeContent = (
      <ProductList/>
    )
    
    return (
      <BasicLayout content={homeContent}/>
    )
  }
}