import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutApp from "../../components/Layout";
import { Row, Col, Select } from "antd";
import Product from "../../components/Product";
import { useDispatch } from "react-redux";
import { lHost } from "../../host";
import "./home.css";

const { Option } = Select;

const Home = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${lHost}/api/categories/get-categories`
        );
        setCategories(data);
        if (data.length > 0) setSelectedCategory(data[0].name);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const getAllProducts = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get(`${lHost}/api/products/get-products`);
        setProductData(data);
        dispatch({
          type: "HIDE_LOADING",
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    getAllProducts();
  }, [dispatch]);

  return (
    <LayoutApp>
      <div
        style={{
          paddingTop: "100px",
          paddingBottom: "20px",
          textAlign: "center",
        }}
      >
        <h1>Select Category</h1>
        <Select
          value={selectedCategory}
          style={{ width: 200 }}
          onChange={(value) => setSelectedCategory(value)}
        >
          {categories.map((category) => (
            <Option key={category._id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
      </div>
      <Row justify="center" style={{ width: "80%", margin: "0 auto" }}>
        {productData
          .filter((i) => i.category === selectedCategory)
          .map((product) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              className="product-col"
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <Product key={product.id} product={product} />
            </Col>
          ))}
      </Row>
    </LayoutApp>
  );
};

export default Home;
