import React, { useCallback } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { routerList, IRouteObject, findRouteByPath, navItems } from "../router";

const { Header, Content, Footer, Sider } = Layout;



const AppLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();
    const navigate = useNavigate();

    // 获取当前路径
    const currentPath = location.pathname;

    // 生成面包屑项
    const generateBreadcrumbItems = useCallback(() => {
      const pathSnippets = currentPath.split("/").filter((i) => i);

      // 首页面包屑
      const homeRoute = routerList[0].children?.find((route) => route.index) as IRouteObject;
      const breadcrumbItems = [
          {
              title: (
                  <a onClick={() => navigate("/")}>
                      {homeRoute?.icon} {homeRoute?.label || "首页"}
                  </a>
              ),
          },
      ];

      // 如果是首页，只返回首页面包屑
      if (pathSnippets.length === 0) {
          return breadcrumbItems;
      }

      // 构建路径并查找对应路由
      let url = "";
      pathSnippets.forEach((snippet) => {
          url += `/${snippet}`;

          const matchedRoute = findRouteByPath(url);
          if (matchedRoute) {
              breadcrumbItems.push({
                  title: (
                      <a onClick={() => navigate(url)}>
                          {matchedRoute.icon} {matchedRoute.label}
                      </a>
                  ),
              });
          } else if (snippet === "*") {
              // 处理404页面
              const notFoundRoute = routerList[0].children?.find((route) => route.path === "*") as IRouteObject;
              breadcrumbItems.push({
                  title: <span>{notFoundRoute?.label || "页面不存在"}</span>,
              });
          }
      });

      return breadcrumbItems;
  }, [currentPath, navigate]);

    // 处理导航菜单点击
    const handleNavMenuClick = (info: { key: string }) => {
        navigate(info.key);
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Header style={{ display: "flex", alignItems: "center" }}>
                <div className="demo-logo" style={{ color: "white", fontSize: "18px", fontWeight: "bold", marginRight: "20px" }}>
                    React Router Demo
                </div>
            </Header>
            <div style={{ padding: "0 48px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Breadcrumb style={{ margin: "16px 0" }} items={generateBreadcrumbItems()} />
                <Layout style={{ padding: "24px 0", background: colorBgContainer, borderRadius: borderRadiusLG, flexGrow: 1 }}>
                    <Sider style={{ background: colorBgContainer }} width={200}>
                        <Menu
                            mode="inline"
                            selectedKeys={[currentPath === "/" ? "/" : `/${currentPath.split("/")[1]}`]}
                            items={navItems}
                            onClick={handleNavMenuClick}
                            style={{ flex: 1, minWidth: 0 }}
                        />
                    </Sider>
                    <Content style={{ padding: "0 24px", minHeight: 280, height: "100%" }}>
                        <Outlet />
                    </Content>
                </Layout>
            </div>
            <Footer style={{ textAlign: "center" }}>React Router Demo ©{new Date().getFullYear()}</Footer>
        </Layout>
    );
};

export default AppLayout;
