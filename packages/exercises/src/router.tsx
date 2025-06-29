import { createBrowserRouter, matchPath, RouteObject } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import React from 'react';
import { MenuProps } from 'antd';
import Schedule from './pages/Schedule';

/**
 * 自定义接口类型
 */
export type IRouteObject = RouteObject & {
    label?: string;
    icon?: React.ReactNode;
    children?: IRouteObject[];
    menu?: boolean;
};

export const routerList: IRouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
                label: '首页',
                icon: <HomeOutlined />,
                menu: true,
            },
            {
                path: 'schedule',
                element: <Schedule />,
                label: '日历',
                icon: <CalendarOutlined />,
                menu: true,
            },
            {
                path: '*',
                element: <NotFound />,
                menu: true,
            },
        ],
        menu: true,
    },
];

// 导航菜单项
export const navItems: MenuProps['items'] =
    (routerList[0].children as IRouteObject[])
        ?.filter(route => route.menu && route.path !== '*')
        .map(route => ({
            key: route.path ? `/${route.path}` : '/',
            label: route.label,
            icon: route.icon,
        })) || [];

// 根据路径查找路由配置
export const findRouteByPath = (path: string): IRouteObject | null => {
    // 处理根路径
    if (path === '/') {
        const homeRoute = routerList[0].children?.find(route => route.index);
        return homeRoute || null;
    }

    // 处理其他路径
    return (
        routerList[0].children?.find(route => {
            if (!route.path) return false;
            return matchPath(`/${route.path}`, path);
        }) || null
    );
};

// 路由配置
const router = createBrowserRouter(routerList);

export default router;
