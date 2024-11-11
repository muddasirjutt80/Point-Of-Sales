import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import {lHost } from "../../host";

const Customers = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(`${lHost}/api/bills/get-bills`);
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

  // Styles
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
    },
    tableItem: {
      padding: "8px",
      border: "1px solid #ddd",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
    },
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2>All Customers </h2>
        <div style={{
          overflow:"auto"
        }}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>ID</th>
              <th style={styles.tableCell}>Customer Name</th>
              <th style={styles.tableCell}>Contact Number</th>
              <th style={styles.tableCell}>Customer Address</th>
            </tr>
          </thead>
          <tbody>
            {billsData.map((bill) => (
              <tr key={bill._id}>
                <td style={styles.tableItem}>{bill._id}</td>
                <td style={styles.tableItem}>{bill.customerName}</td>
                <td style={styles.tableItem}>{bill.customerPhone}</td>
                <td style={styles.tableItem}>{bill.customerAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </Layout>
  );
};

export default Customers;
