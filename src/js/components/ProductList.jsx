import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ShoppingCart from "./ShoppingCartList.jsx";
import Product from "./Product.jsx";
import ProductsService from "../services/ProductsService";

//LOAD IMAGES
const images = require.context('../../assets/img', true)
const imagePath = (name) => images(name, true);

export default class ProductList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      renderShoppingCart: this.recoverLocalShoppingCart().length > 0,
      shoppingCartList: this.recoverLocalShoppingCart(),
      itemToAdd: {}
    }
  }
  
  componentDidMount(){
    ProductsService.getProductList((data)=>{
      let products = data;
      let productsWithThumbs = products.map((item, index) => {
        try{
          item.thumb = imagePath(`./sku_${item.sku}.png`);
        }catch(err){
          item.thumb = "";
        }
        return item;
      })

      //SETA A QUANTIDADE INICIAL DE ITENS
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

  //Remove os duplicados e adiciona a propriedade size para indicar quantos itens existem
  handleShoppingListClick(e){
    // CLICK ON PURCHASE BUTTON
    if(e.target.nodeName.toLowerCase() === "button"){
      let currentSKU = parseInt(e.target.closest(".product-item").dataset.sku);
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
      }, function(){
        this.saveLocalShoppingCart();
      })
    }else{
      this.setState(() => {
        return {
          renderShoppingCart: false
        }
      })
    } 
  }

  //Salva os dados no localStorage
  saveLocalShoppingCart(){
    let localData = JSON.stringify(this.state.shoppingCartList);
    localStorage.setItem("netshoes-shopping-cart", localData);
  }

  //Recupera os dados do localStorage
  recoverLocalShoppingCart(){
    let local = localStorage.getItem("netshoes-shopping-cart");
    if(local !== null){
      return JSON.parse(local);
    }else{
      return [];
    }
  }
  
  removeItemFromShoppingList(list, item){
    item.quantity = 0;
    this.setState({
      shoppingCartList: list
    }, function(){
      this.saveLocalShoppingCart();
    })
  }

  toggleShoppingCart(e){
    this.setState({renderShoppingCart: !this.state.renderShoppingCart});
  }

  render(){
    console.log("render")
    return (
      <div>
        <button className="btn btn-dark mb-30 toggle-shopping-cart" onClick={e => this.toggleShoppingCart(e)}>
          <p className="text-center bag-title"><span className="bag-icon"></span></p>
        </button>
        <Container onClick={e => this.handleShoppingListClick(e)}>
          <Row className="product-list-row">
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
          this.state.renderShoppingCart ? <ShoppingCart close={(e) => this.toggleShoppingCart(e)} removeItemFromShoppingList={(list, item) => this.removeItemFromShoppingList(list, item)} toAdd={this.state.itemToAdd} list={this.state.shoppingCartList}/> : null
        }
      </div>
    )
  }
}