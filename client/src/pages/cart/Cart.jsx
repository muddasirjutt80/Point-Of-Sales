import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { lHost } from "../../host";
import "./cart.css";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopUp, setBillPopUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.rootReducer);

  const handlerIncrement = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const handlerDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const handlerDelete = (record) => {
    dispatch({
      type: "DELETE_FROM_CART",
      payload: record,
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height={60} width={60} />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <MinusCircleOutlined
            className="cart-minus"
            onClick={() => handlerDecrement(record)}
          />
          <strong className="cart-quantity">{record.quantity}</strong>
          <PlusCircleOutlined
            className="cart-plus"
            onClick={() => handlerIncrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          className="cart-action"
          onClick={() => handlerDelete(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach(
      (product) => (temp = temp + product.price * product.quantity)
    );
    setSubTotal(temp);
  }, [cartItems]);

  // const handlerSubmit = async (value) => {
  //   //console.log(value);
  //   try {
  //     const newObject = {
  //       ...value,
  //       cartItems,
  //       subTotal,
  //       tax: Number(((subTotal / 100) * 8).toFixed(2)),
  //       totalAmount: Number(
  //         (
  //           Number(subTotal) + Number(((subTotal / 100) * 8).toFixed(2))
  //         ).toFixed(2)
  //       ),
  //       userId: JSON.parse(localStorage.getItem("auth"))._id,
  //     };
  //     await axios.post(`${lHost}/api/bills/add-bills`, newObject, {
  //       withCredentials: true,
  //     });
  //     message.success("Bill Generated!");
  //     dispatch({
  //       type: "CLEAR_CART",
  //     });
  //     navigate("/bills");
  //   } catch (error) {
  //     message.error(
  //       `Error: ${error.response?.data?.error || "Unable to generate bill."}`
  //     );
  //     console.log(error);
  //   }
  // };
  const handlerSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: Number(((subTotal / 100) * 8).toFixed(2)),
        totalAmount: Number(
          (
            Number(subTotal) + Number(((subTotal / 100) * 8).toFixed(2))
          ).toFixed(2)
        ),
      };
      await axios.post(`${lHost}/api/bills/add-bills`, newObject, {
        withCredentials: true,
      });

      message.success("Bill Generated!");
      dispatch({
        type: "CLEAR_CART",
      });
      navigate("/bills");
    } catch (error) {
      message.error(
        `${
          error.response?.data?.error ||
          "Unable to generate bill, try again later"
        }`
      );
      console.log(error);
    }
  };

  return (
    <Layout>
      <div style={{ margin: "0 5%", paddingTop: "2rem" }}>
        <h2>Cart</h2>
        <table
          style={{
            width: "100%",
            marginBottom: "2rem",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.title}
                  style={{ borderBottom: "2px solid #000" }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.title}>
                    {column.render
                      ? column.render(item[column.dataIndex], item)
                      : item[column.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="subTotal">
          <h2>
            Sub Total: <span>Rs.{subTotal.toFixed(2)}</span>
          </h2>
          <Button
            onClick={() => setBillPopUp(true)}
            style={{
              color: "#fff",
              background: "linear-gradient(45deg, #6C5B7B, #C06C84, #F67280)",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Generate Bill
          </Button>
        </div>
        <Modal
          title="Create Invoice"
          visible={billPopUp}
          onCancel={() => setBillPopUp(false)}
          footer={false}
        >
          <Form layout="vertical" onFinish={handlerSubmit}>
            <FormItem name="customerName" label="Customer Name">
              <Input />
            </FormItem>
            <FormItem name="customerPhone" label="Customer Phone">
              <Input />
            </FormItem>
            <FormItem name="customerAddress" label="Customer Address">
              <Input />
            </FormItem>
            <Form.Item name="paymentMethod" label="Payment Method">
              <Select>
                <Select.Option value="cash">Cash</Select.Option>
                <Select.Option value="paypal">Easypaisa</Select.Option>
                <Select.Option value="paypal">Jazzcash</Select.Option>
                <Select.Option value="Card">Card</Select.Option>
              </Select>
            </Form.Item>
            <div className="total">
              <span>SubTotal: Rs.{subTotal.toFixed(2)}</span>
              <br />
              <span>GST: Rs.{((subTotal / 100) * 8).toFixed(2)}</span>
              <h3>
                Total: Rs.
                {(
                  Number(subTotal) + Number(((subTotal / 100) * 8).toFixed(2))
                ).toFixed(2)}
              </h3>
            </div>
            <div className="form-btn-add">
              <Button
                htmlType="submit"
                style={{
                  color: "#fff",
                  background:
                    "linear-gradient(45deg, #6C5B7B, #C06C84, #F67280)",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                Generate Bill
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default Cart;
