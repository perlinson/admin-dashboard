export default [
  {
    path: '/user',
    layout: false,
    routes: [{ path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/home',
    name: '首页概览',
    icon: 'HomeOutlined',
    component: './Home',
  },
  {
    path: '/resources',
    name: '资源管理',
    icon: 'GoldOutlined',
    component: './Resources',
  },
  {
    path: '/buildings',
    name: '建筑管理',
    icon: 'BankOutlined',
    component: './Buildings',
  },
  {
    path: '/technologies',
    name: '科技树',
    icon: 'ExperimentOutlined',
    component: './Technologies',
  },
  {
    path: '/players',
    name: '玩家管理',
    icon: 'TeamOutlined',
    component: './Players',
  },
  {
    path: '/events',
    name: '事件系统',
    icon: 'ThunderboltOutlined',
    component: './Events',
  },
  {
    path: '/analytics',
    name: '数据分析',
    icon: 'LineChartOutlined',
    component: './Analytics',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
