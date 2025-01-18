import { useEffect, useState } from "react";
import { getProductList } from "../../services/productsServices";
import "./Product.scss";
import ProductItem from "./ProductItem";
import ProductSearch from "./ProductSearch";

function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getProductList();
      setProducts(result);
    };
    fetchApi();
  }, []);
  return (
    <>
      <ProductSearch />
      <div className="product">
        {products.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </div>
      <div className="product__trans">
        <button className="product__prev">
          Prev
        </button>
        <div className="product__page"></div>
        <button className="product__next">
          Next
        </button>
      </div>
    </>
  );
}

export default ProductList;
