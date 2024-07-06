import { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

// click on the login to generate token
// next menu will be populated with the menu data fetched from menu-tree api endpoint

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const login = async () => {
    const res = await fetch("http://appnox-tm.it/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: "AdminPro", password: "Mnop@1234" }),
    });
    const data = await res.json();
    localStorage.setItem("token", data.result.key);
    alert("Login Successfully");
  };

  const getData = async () => {
    const res = await fetch("http://appnox-tm.it/api/v1/menu/tree", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setData(data.result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const items = data.map((menuItem) => ({
    key: menuItem.menuId,
    label: menuItem.item,
    icon: <AppstoreOutlined />,
    children:
      menuItem.children &&
      menuItem.children.map((child) => ({
        key: child.menId,
        label: child.item,
      })),
  }));
  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Button style={{ marginRight: "10px" }} onClick={login}>
        Login
      </Button>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default App;
