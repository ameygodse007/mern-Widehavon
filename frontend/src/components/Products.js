import React from "react";
import { Card } from "react-bootstrap";
import { Rating } from "./Rating";
import { Link } from "react-router-dom";
export const Products = ({ product }) => {
  const price = parseInt(product.price * 79.8);
  return (
    <Card className="my-3 p-3 rounded" style={{ backgroundColor: "white" }}>
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Card.Title as="div">
          <Link
            style={{ textDecoration: "none" }}
            to={`/products/${product._id}`}
          >
            <strong>{product.name}</strong>
          </Link>
        </Card.Title>
        <Card.Text as="div" className="py-3">
          <div className="my-1">
            <Rating
              key={product._id}
              value={product.rating}
              text={` ${product.numReviews} rating`}
            />
          </div>
        </Card.Text>
        <Card.Text as="h6">Rs. {price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
