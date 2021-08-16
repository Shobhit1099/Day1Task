import React from "react";
import { Menu, Drawer, Input, Button } from "antd";
import {
  BookOutlined,
  AppstoreOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { useState } from "react";
import { UserOutlined, SendOutlined } from "@ant-design/icons";
import axios from "axios";

var count = 100;

function Navbar() {
  const { TextArea } = Input;
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState("posts");
  const [userId, setUserId] = useState();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = (e) => {
    setVisible(false);
    setCurrent("posts");
  };
  function handleClick(e) {
    setCurrent(e.key);
  }
  function handlePost() {
    const article = {
      id: count,
      userId: userId,
      title: title,
      body: body,
    };
    count += 1;
    axios
      .post("https://jsonplaceholder.typicode.com/posts", article)
      .then((response) => {
        console.log(response.data);
        setBody("");
        setTitle("");
        setUserId("");
      });
  }
  return (
    <div>
      <Drawer
        title="Add an user"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div style={{ marginBottom: "15px" }}>
          <Input
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            placeholder="User ID"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div style={{ marginBottom: "25px" }}>
          <TextArea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            showCount
            maxLength={200}
            placeholder="Body"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </div>
        <div>
          <Button type="primary" icon={<SendOutlined />} onClick={handlePost}>
            Post
          </Button>
        </div>
      </Drawer>
      <Menu
        onClick={handleClick}
        selectedKeys={current}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="posts" icon={<BookOutlined />}>
          Posts
        </Menu.Item>
        <Menu.Item key="add" icon={<FolderAddOutlined />} onClick={showDrawer}>
          Add
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Coming Soon
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navbar;
