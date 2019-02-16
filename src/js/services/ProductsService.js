import Request from "./requests";

class ProductsService {
  static getProductList(successCb) {
    let _this = this;
    
    Request.getData(`http://localhost:9001/products`).then((res) => {
      let productList = res.data.products;
      console.log(res)
      successCb(productList);
    })
  }
}

export default ProductsService;