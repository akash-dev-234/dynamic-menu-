import { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
const items = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Option 1",
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "Option 2",
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: "Option 3",
  },
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
      },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "9",
        label: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
      },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          {
            key: "11",
            label: "Option 11",
          },
          {
            key: "12",
            label: "Option 12",
          },
        ],
      },
    ],
  },
];
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
