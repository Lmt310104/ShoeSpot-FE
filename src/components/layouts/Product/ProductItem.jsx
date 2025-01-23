import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Product.scss";
function ProductItem(props) {
  const navigate = useNavigate();
  const { item, key } = props;
  console.log(item);
  const handleDetail = () => {
    navigate(`/detail/${item._id}`);
  };
  console.log(item.product_thumbnails);
  return (
    <>
      <div key={key} className="product__item" onClick={handleDetail}>
        <div className="product__image">
          <img src={item.product_thumbnails} alt={item.product_name} />
        </div>
        <div className="product__content">
          <div className="product__title">{item.product_name}</div>
          <div className="product__price">{item.product_price}đ</div>
        </div>
      </div>
    </>
  );
}
ProductItem.propTypes = {
  key: PropTypes.string.isRequired,
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    product_thumbnails: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    product_price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
