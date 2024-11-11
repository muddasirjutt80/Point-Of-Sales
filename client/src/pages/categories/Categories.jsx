import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LayoutApp from "../../components/Layout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { lHost } from "../../host";
import "./style.css";

const Categories = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const getAllCategories = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axios.get(
        `${lHost}/api/categories/get-categories`
      );
      setCategoryData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handlerDelete = async (record) => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      // await axios.post(`${lHost}/api/categories/delete-categories`, {
      //   categoryId: record._id,
      // });

      await axios.post(`${lHost}/api/categories/delete-categories/`, {
        categoryId: record._id,
      });

      message.success("Category Deleted Successfully!");
      getAllCategories();
      setPopModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Error in deleting category");
      console.log(error);
    }
  };

  const handlerSubmit = async (value) => {
    if (editCategory === null) {
      try {
        dispatch({ type: "SHOW_LOADING" });
        await axios.post(`${lHost}/api/categories/add-categories`, value);
        message.success("Category Added Successfully!");
        getAllCategories();
        setPopModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Error!");
        console.log(error);
      }
    } else {
      try {
        dispatch({ type: "SHOW_LOADING" });
        await axios.put(
          `${lHost}/api/categories/update-categories/${editCategory._id}`,
          value
        );

        message.success("Category Updated Successfully!");
        getAllCategories();
        setPopModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Error!");
        console.log(error);
      }
    }
  };

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
  };

  return (
    <LayoutApp>
      <div style={styles.container}>
        <h2>All Categories</h2>
        <Button
          style={{
            background: "linear-gradient(45deg, #6C5B7B, #C06C84, #F67280)",
          }}
          className="add-new"
          onClick={() => setPopModal(true)}
        >
          Add New
        </Button>
        <div style={{ overflow: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>Category Name</th>
                <th style={styles.tableCell}>Created At</th>
                <th style={styles.tableCell}>Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((category) => (
                <tr key={category._id}>
                  <td style={styles.tableCell}>{category.name}</td>
                  <td style={styles.tableCell}>{category.createdAt}</td>

                  <td style={styles.tableCell}>
                    <DeleteOutlined
                      className="action"
                      onClick={() => handlerDelete(category)}
                    />
                    <EditOutlined
                      className="edit"
                      onClick={() => {
                        setEditCategory(category);
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
            title={editCategory !== null ? "Edit Category" : "Add New Category"}
            visible={popModal}
            onCancel={() => {
              setEditCategory(null);
              setPopModal(false);
            }}
            footer={false}
          >
            <Form
              layout="vertical"
              initialValues={editCategory}
              onFinish={handlerSubmit}
            >
              <FormItem name="name" label="Category Name">
                <Input />
              </FormItem>
              <Button
                style={{
                  background:
                    "linear-gradient(45deg, #6C5B7B, #C06C84, #F67280)",
                }}
                htmlType="submit"
                className="add-new"
              >
                Create
              </Button>
            </Form>
          </Modal>
        )}
      </div>
    </LayoutApp>
  );
};

export default Categories;
