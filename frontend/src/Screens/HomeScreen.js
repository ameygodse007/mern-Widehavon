import React, { useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Products } from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/adminProduct";
import { getUserDetails } from "../actions/loginAction";
import Loader from "../components/loader";
import Error from "../components/Error";
export const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Image
        style={{ width: "100%", height: "60%" }}
        src="https://source.unsplash.com/1600x500/?products"
      />
      <Row style={{ padding: "1rem", width: "100%" }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error variant="danger" children={error} />
        ) : (
          products.map((prod) => (
            <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
              <Products product={prod} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
