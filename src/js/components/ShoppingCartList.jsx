import React from "react"
import ShoppingCartItem from "./ShoppingCartItem.jsx";

export default class ShoppingCartList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shoppingCartList: this.props.list,
      subtotalInstallments: 10,
      subtotal: this.subTotal(this.props.list)
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      shoppingCartList: nextProps.list,
      subtotal: this.subTotal(nextProps.list)
    })
  }

  subTotal(products){
    // Calculo do subtotal
    let subtotal = products.reduce((total, next) => {
      return total + (next.price * next.quantity)
    }, 0);

    return this.roundNumber(subtotal);
  }

  removeShoppingCartItem(item){
    let filteredItens = this.state.shoppingCartList.filter((itemList, index)=>{
      return itemList.id !== item.id; 
    })

    let subtotal = this.subTotal(filteredItens);

    this.props.removeItemFromShoppingList(filteredItens, item);

    this.setState(()=>{
      return {
        shoppingCartList: filteredItens,
        subtotal: subtotal
      }
    })
  }

  roundNumber(number){
    return Math.round((number) * 100) / 100;
  }

  close(){
    this.props.close();
  }
 
  render(){
    let subtotal;

    if(this.state.subtotal > 0){
      subtotal = (
        <div className="shopping-cart-total">
          <div className="row">
            <span className="col subtotal">Subtotal:</span>
            <span className="col subtotal-price">R${this.state.subtotal}</span>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <div className="subtotal-installments">
                <span>Ou em até {this.state.subtotalInstallments} X de {this.roundNumber(this.state.subtotal / this.state.subtotalInstallments)}</span>
              </div>
            </div>
          </div>
          <button className="btn btn-block btn-dark mt-4">Comprar</button>
        </div>
      )
    }else{
      subtotal = (<p className="without-cart text-center"><span>Ainda não há itens na sua sacola</span></p>)
    }

    return (
      <div className={`${this.state.shoppingCartList.length > 0 ? "":"without-cart"} shopping-cart-list`}>
        <button className="close" onClick={e => this.close(e)}>x</button>
        <h2 className="text-center bag-title"><span className="bag-icon"></span><span className="bag-text">Sacola</span></h2>
        {
          this.state.shoppingCartList.map((item, index) => {
            item.price = this.roundNumber(item.price);
            return <ShoppingCartItem info={item} key={index} removeShoppingCartItem={(item) => this.removeShoppingCartItem(item)}/>
          })
        }
        {
          subtotal
        }
      </div>
    )
  }
}