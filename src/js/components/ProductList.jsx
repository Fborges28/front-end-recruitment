import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ShoppingCart from "./ShoppingCartList.jsx";
import Product from "./Product.jsx";

//LOAD IMAGES
const images = require.context('../../assets/img', true)
const imagePath = (name) => images(name, true);

export default class ProductList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      renderShoppingCart: false,
      shoppingCartList: [],
      itemToAdd: {}
    }
  }
  componentDidMount(){
    this.getRequest((data)=>{
      let products = data.products;
      let productsWithThumbs = products.map((item, index) => {
        try{
          item.thumb = imagePath(`./sku_${item.sku}.png`);
        }catch(err){
          item.thumb = "";
        }
        return item;
      })

      //SETA A QUANTIDADE INICIAL DE ITENS NO CARRINHO
      productsWithThumbs.forEach((item, index) => {
        item.quantity = 0;
      })

      this.setState(() => {  
        return {
          products: productsWithThumbs
        }
      })
    });
  }
  
  getRequest(cb){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/public/data/products.json");
    xhr.onload = function(event){
      cb(JSON.parse(xhr.responseText))
    }.bind(this);
    xhr.send();
  }

  handleShoppingListClick(e){
    // CLICK ON PURCHASE BUTTON
    if(e.target.nodeName.toLowerCase() === "button"){
      let currentSKU = parseInt(e.target.parentElement.dataset.sku);
      //console.log(this.state.shoppingCartList.find(item => item.sku === currentSKU) == undefined)

      let currentProduct = this.state.products.filter((element)=>{
        if(element.sku === currentSKU){
          element.quantity++;
        }
        return element.sku == currentSKU;
      })[0];

      let filteredList = [];
      let result;

      if(this.state.shoppingCartList.find(item => item.sku === currentSKU) !== undefined){
        filteredList = this.state.shoppingCartList.filter(item => {
          return item.sku !== currentSKU;
        })

        filteredList.push(currentProduct);
  
        result = filteredList
      }else{
        result = this.state.shoppingCartList.concat(currentProduct);
      }

      this.setState(()=>{
        return {
          shoppingCartList: result,
          renderShoppingCart: true,
          itemToAdd: currentProduct
        }
      })
      
      //Remove os duplicados e adiciona a propriedade size para indicar quantos itens existem
    }else{
      this.setState(() => {
        return {
          renderShoppingCart: false
        }
      })
    } 
  }

  updateShoppingList(itens){
    this.setState({
      shoppingCartList: itens
    })
  }

  render(){
    console.log("render")
    return (
      <div>
        <Container onClick={e => this.handleShoppingListClick(e)}>
          <Row>
            {
              this.state.products.map((element, index) => {
                return (
                  <Col xs={12} sm={6} lg={4} key={index}>
                    <Product info={element} key={`product-${index}`}/>
                  </Col>
                )
              })
            }
          </Row>
        </Container>
        {
          this.state.renderShoppingCart ? <ShoppingCart updateShoppingList={itens => this.updateShoppingList(itens)} toAdd={this.state.itemToAdd} list={this.state.shoppingCartList}/> : null
        }
      </div>
    )
  }
}