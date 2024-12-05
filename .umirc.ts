import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '游戏管理后台',
    locale: false,
  },
  esbuildMinifyIIFE: true,
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [{ path: '/user/login', component: './User/Login' }],
    },
    {
      name: '首页概览',
      path: '/home',
      icon: 'HomeOutlined',
      component: './Home',
    },
    {
      name: '资源管理',
      path: '/resources',
      icon: 'GoldOutlined',
      component: './Resources',
    },
    {
      name: '建筑管理',
      path: '/buildings',
      icon: 'BankOutlined',
      component: './Buildings',
    },
    {
      name: '科技树',
      path: '/technologies',
      icon: 'ExperimentOutlined',
      component: './Technologies',
    },
    {
      name: '玩家管理',
      path: '/players',
      icon: 'TeamOutlined',
      component: './Players',
    },
    {
      name: '事件系统',
      path: '/events',
      icon: 'ThunderboltOutlined',
      component: './Events',
    },
    {
      name: '数据分析',
      path: '/analytics',
      icon: 'LineChartOutlined',
      component: './Analytics',
    },
    { path: '/', redirect: '/home' },
    // { path: '*', layout: false, component: './404' },
  ],
  npmClient: 'yarn',
});
