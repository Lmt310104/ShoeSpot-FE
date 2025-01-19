import { useEffect, useState } from "react";
import "./Product.scss";
// import ProductItem from "./ProductItem";
import ProductSearch from "./ProductSearch";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/product");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.metadata);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log(products);
  return (
    <>
      <ProductSearch />
      {/* <div className="product">
        {products.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </div> */}
      <div className="product__trans">
        <button className="product__prev">Prev</button>
        <div className="product__page"></div>
        <button className="product__next">Next</button>
      </div>
    </>
  );
}

export default ProductList;
