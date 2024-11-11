import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handlerToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 },
    });
  };

  const { Meta } = Card;

  return (
    <Card
      hoverable
      style={{
        width: 270,
        marginBottom: 30,
        textAlign: "center",
        fontSize: "large",
        fontWeight: 600,
      }}
      cover={
        <img alt={product.name} src={product.image} style={{ height: 250 }} />
      }
    >
      <Meta title={product.name} description={`Rs.${product.price}`} />
      <div className="product-btn">
        <Button
          style={{
            background: "linear-gradient(45deg, #6C5B7B, #C06C84, #F67280)",
          }}
          onClick={() => handlerToCart()}
        >
          Add To Cart
        </Button>
      </div>
    </Card>
  );
};

export default Product;
