// import { useNavigate } from "react-router-dom";
// import { useDispatch} from "react-redux";

// function ProductItem(props) {
//   const { item } = props;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleDetail = () => {
//     dispatch(ProductDetail(item.id));
//     navigate(`/detail/${item.id}`);
//   };

//   return (
//     <>
//       <div className="product__item" onClick={handleDetail}>
//         <div className="product__image">
//           <img src={item.product_thumbnails} alt={item.product_name} />
//         </div>
//         <div className="product__title">{item.product_name}</div>
//         <div className="product__price">{item.price}đ</div>
//       </div>
//     </>
//   );
// }

// export default ProductItem;
