import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { useReactToPrint } from "react-to-print";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import {lHost } from "../../host";

const Bills = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const Lhost = lHost;
  const [billsData, setBillsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(`${Lhost}/api/bills/get-bills`);
      const sortedBills = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBillsData(sortedBills);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(sortedBills);
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const styles = {
    container: {
      padding: "80px 10%",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      background: "#f5f5f5",
      borderBottom: "1px solid #ddd",
    },
    tableCell: {
      padding: "8px",
      border: "1px solid #ddd",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
      '@media (max-width: 600px)': {
        padding: '4px',  // optional, for better mobile readability
      },
    },
  };
  return (
    <Layout>
      <div style={styles.container}>
        <h2>All Bills </h2>
        <div style={{overflow:"auto"}}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>ID</th>
              <th style={styles.tableCell}>Customer Name</th>
              <th style={styles.tableCell}>Contact Number</th>
              <th style={styles.tableCell}>Customer Address</th>
              <th style={styles.tableCell}>Sub Total</th>
              <th style={styles.tableCell}>Tax</th>
              <th style={styles.tableCell}>Total Amount</th>
              <th style={styles.tableCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {billsData.map((bill) => (
              <tr key={bill._id}>
                <td style={styles.tableCell}>{bill._id}</td>
                <td style={styles.tableCell}>{bill.customerName}</td>
                <td style={styles.tableCell}>{bill.customerPhone}</td>
                <td style={styles.tableCell}>{bill.customerAddress}</td>
                <td style={styles.tableCell}>{bill.subTotal}</td>
                <td style={styles.tableCell}>{bill.tax}</td>
                <td style={styles.tableCell}>{bill.totalAmount}</td>
                <td style={styles.tableCell}>
                  <EyeOutlined
                    className="cart-edit eye"
                    onClick={() => {
                      setSelectedBill(bill);
                      setPopModal(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {popModal && (
          <Modal
            title="Point Of Sale"
            width={400}
            pagination={false}
            open={popModal}
            onCancel={() => setPopModal(false)}
            footer={false}
          >
            <div className="card" ref={componentRef}>
              <div
                className="cardHeader"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h1>Point of Sale</h1>
              </div>
              <div className="cardBody">
                <div className="group">
                  <span>Customer Name:</span>
                  <span>
                    <b>{selectedBill.customerName}</b>
                  </span>
                </div>
                <div className="group">
                  <span>Customer Phone:</span>
                  <span>
                    <b>+92{selectedBill.customerPhone}</b>
                  </span>
                </div>
                <div className="group">
                  <span>Customer Address:</span>
                  <span>
                    <b>{selectedBill.customerAddress}</b>
                  </span>
                </div>
                <div className="group">
                  <span>Date Order:</span>
                  <span>
                    <b>{selectedBill.createdAt.toString().substring(0, 10)}</b>
                    <b>
                      ({selectedBill.createdAt.toString().substring(11, 19)})
                    </b>
                  </span>
                </div>
                <div className="group">
                  <span>Total Amount:</span>
                  <span>
                    <b>Rs.{selectedBill.totalAmount}</b>
                  </span>
                </div>
              </div>
              <div className="cardFooter">
                <h4>Order Details</h4>
                {selectedBill.cartItems.map((product) => (
                  <>
                    <div
                      className="footerCard"
                      style={{
                        boxShadow: "none",
                        border: "1px dashed grey",
                      }}
                    >
                      <div className="group">
                        <span>Item:</span>
                        <span>
                          <b>{product.name}</b>
                        </span>
                      </div>
                      <div className="group">
                        <span>Qty:</span>
                        <span>
                          <b>{product.quantity}</b>
                        </span>
                      </div>
                      <div className="group">
                        <span>Price:</span>
                        <span>
                          <b>Rs.{product.price}</b>
                        </span>
                      </div>
                    </div>
                  </>
                ))}
                <div className="footerCardTotal">
                  <div className="group">
                    <h3>
                      {" "}
                      <small>Total:</small>{" "}
                    </h3>
                    <h3>
                      <b> Rs.{selectedBill.totalAmount}</b>
                    </h3>
                  </div>
                </div>
                <div className="footerThanks">
                  <span
                    style={{
                      color: "#D4D4D4",
                    }}
                  >
                    (8% GST included)
                  </span>
                </div>
              </div>
            </div>
            <div className="bills-btn-add">
              <Button
                onClick={handlePrint}
                htmlType="submit"
                className="add-new"
              >
                Print Bill
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default Bills;
