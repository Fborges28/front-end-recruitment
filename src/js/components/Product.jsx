import React from "react"


const Product = (props) => {
  let imageContent;
  let installments;
  if(props.info.thumb) {
    // a path we KNOW is totally bogus and not a module
    imageContent = (<img src={props.info.thumb} alt=""/>)
  } else {
    imageContent = (<div className="no-image"><p>No image</p></div>)
  }

  if(props.info.installments && props.info.installments > 0){
    installments = (<h5><small>Ou {props.info.installments} x </small><small>{props.info.currencyFormat}</small><span>{Math.ceil(props.info.price / props.info.installments)}</span></h5>)
  }

  return(
    <div id={`cart-item-${props.info.id}`} data-sku={props.info.sku} className="product-item text-center">
      <div className="shopping-cart-item-info">
        {
          imageContent
        }
        <h5>{props.info.title}</h5>
        <p>{props.info.style}</p>
        <h5><small>{props.info.currencyFormat}</small>{props.info.price}</h5>
        {
          installments
        }
      </div>
      <div className="checkout">
        <button className="btn btn-dark">Adicionar ao carrinho</button>
      </div>
    </div>
  )
}

export default Product;