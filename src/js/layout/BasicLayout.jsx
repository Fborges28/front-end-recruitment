import React from "react"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

export default class BasicLayout extends React.Component {
  render(){
    return (
      <div className="basic-layout">
        <Header/>
        <main>
          {this.props.content}
        </main>
        <Footer/>
      </div>
    )
  }
}