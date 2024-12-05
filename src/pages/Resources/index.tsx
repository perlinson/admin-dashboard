import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';

interface ResourceItem {
  id: string;
  name: string;
  baseProductionRate: number;
  maxStorage: number;
  currentMarketPrice: number;
  totalAvailable: number;
}

const ResourcesPage: React.FC = () => {
  const loading = false;

  const columns: ProColumns<ResourceItem>[] = [
    {
      title: '资源名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '基础产出率',
      dataIndex: 'baseProductionRate',
      key: 'baseProductionRate',
      valueType: 'digit',
    },
    {
      title: '最大存储量',
      dataIndex: 'maxStorage',
      key: 'maxStorage',
      valueType: 'digit',
    },
    {
      title: '当前市场价格',
      dataIndex: 'currentMarketPrice',
      key: 'currentMarketPrice',
      valueType: 'money',
    },
    {
      title: '系统总量',
      dataIndex: 'totalAvailable',
      key: 'totalAvailable',
      valueType: 'digit',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: () => [
        <Button key="edit" type="link">
          编辑
        </Button>,
        <Button key="view" type="link">
          查看详情
        </Button>,
      ],
    },
  ];

  const mockData: ResourceItem[] = [
    {
      id: '1',
      name: '木材',
      baseProductionRate: 10,
      maxStorage: 1000,
      currentMarketPrice: 100,
      totalAvailable: 50000,
    },
    {
      id: '2',
      name: '石材',
      baseProductionRate: 8,
      maxStorage: 1000,
      currentMarketPrice: 150,
      totalAvailable: 40000,
    },
    {
      id: '3',
      name: '粮食',
      baseProductionRate: 15,
      maxStorage: 2000,
      currentMarketPrice: 80,
      totalAvailable: 100000,
    },
  ];

  return (
    <PageContainer>
      <ProTable<ResourceItem>
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        search={false}
        dateFormatter="string"
        headerTitle="资源管理"
        loading={loading}
        toolBarRender={() => [
          <Button key="add" type="primary">
            添加资源
          </Button>,
          <Button key="refresh">刷新数据</Button>,
        ]}
      />
    </PageContainer>
  );
};

export default ResourcesPage;
