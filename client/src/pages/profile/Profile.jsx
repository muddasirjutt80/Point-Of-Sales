import React, { useState, useEffect } from "react";
import axios from "axios";
import { lHost } from "../../host";
import { message, Modal, Button, Form, Input } from "antd";
import Layout from "../../components/Layout";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get(`${lHost}/api/user/get-profile`, {
        // withCredentials: true,
      });
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditSubmit = async (values) => {
    try {
      await axios.post(`${lHost}/api/user/update-profile`, values, {
        withCredentials: true,
      });

      message.success("Profile Updated Successfully!");
      setIsEditing(false);

      fetchUserProfile();
    } catch (error) {
      console.error("Error updating user profile:", error);
      message.error("Error updating profile!");
    }
  };

  return (
    <Layout>
      <div style={styles.profile}>
        <div style={styles.container}>
          <h1>Profile</h1>
          <div style={styles.leftCard}>
            <h2>Profile Details</h2>
            <p>
              <strong>Name:</strong> {userData.firstName} {userData.lastName}
            </p>
            <p>
              <strong>Username:</strong> @{userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Company Name:</strong>{" "}
              {userData.companyName
                ? userData.companyName
                : "Edit Your Company Name"}
            </p>
            <Button
              style={{
                color: "#fff",
                background: "linear-gradient(45deg, #6C5B7B, #C06C84, #F67280)",
                borderRadius: "5px",
                border: "none",
              }}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          </div>

          <div style={styles.rightCard}>
            <p>
              <strong>Products Created:</strong> {userData.productsCount}
            </p>
            <p>
              <strong>Categories Created:</strong> {userData.categoriesCount}
            </p>
            <p>
              <strong>Bills Generated:</strong> {userData.billsCount}
            </p>
          </div>

          {isEditing && (
            <Modal
              title="Edit Profile"
              visible={isEditing}
              onCancel={() => setIsEditing(false)}
              footer={null}
            >
              <Form
                layout="vertical"
                initialValues={{
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  companyName: userData.companyName,
                }}
                onFinish={handleEditSubmit}
              >
                <Form.Item name="firstName" label="First Name">
                  <Input />
                </Form.Item>

                <Form.Item name="lastName" label="Last Name">
                  <Input />
                </Form.Item>

                <Form.Item name="companyName" label="Company Name">
                  <Input />
                </Form.Item>

                <Button
                  style={{
                    color: "#fff",
                    background:
                      "linear-gradient(45deg, #6C5B7B, #C06C84, #F67280)",
                    borderRadius: "5px",
                    border: "none",
                  }}
                  htmlType="submit"
                >
                  Update
                </Button>
              </Form>
            </Modal>
          )}
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  profile: {
    marginTop: "5%",
    "@media(max-width: 768px)": {
      marginTop: "10%",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "2rem",
    maxWidth: "900px",
    margin: "auto",
    marginTop: "1%",
    "@media(min-width: 768px)": {
      flexDirection: "row",
    },
  },
  leftCard: {
    flex: 1,
    border: "1px solid #e1e1e1",
    padding: "1rem",
    marginBottom: "1rem",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    "@media(min-width: 768px)": {
      marginRight: "1rem",
      marginBottom: "0",
    },
  },
  rightCard: {
    flex: 1,
    border: "1px solid #e1e1e1",
    padding: "1rem",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
};

export default Profile;
