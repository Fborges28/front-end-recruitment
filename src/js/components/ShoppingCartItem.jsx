import React from "react"

export default class ShoppingCartItem extends React.Component {
  removeItem(){
    let item = this.props.info;
    this.props.removeShoppingCartItem(item);
  }

  render(){
    let imageContent;
    if(this.props.info.thumb) {
      // a path we KNOW is totally bogus and not a module
      imageContent = (<img src={this.props.info.thumb} alt=""/>)
    } else {
      imageContent = (<div className="no-image"><p>No image</p></div>)
    }

    return(
      <div className="shopping-cart-item">
        <button className="close" onClick={e => this.removeItem(e)}>x</button>
        <div className="shopping-cart-item-thumb">{imageContent}</div>
        <div className="shopping-cart-item-info">
          <div className="shopping-cart-item-description">
            <h5 className="shopping-cart-item-title">{this.props.info.title}</h5>
            <p>
              <span>{this.props.info.availableSizes.join(",")}</span>
              <span className="separator"> | </span>
              <span>{this.props.info.style}</span>
            </p>
          </div>
          <div className="shopping-cart-quantity">
            <span className="item-size">Quantidade: {this.props.info.quantity}</span>
            <span className="item-price">{this.props.info.currencyFormat}{Math.round((this.props.info.price * this.props.info.quantity) * 100) / 100}</span>
          </div>
        </div>
      </div>
    )
  }
}