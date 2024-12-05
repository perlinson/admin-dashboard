import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';

interface BuildingItem {
  id: string;
  name: string;
  type: string;
  level: number;
  requirements: {
    resources: Record<string, number>;
    technology: string[];
  };
  effects: {
    production: Record<string, number>;
    storage: Record<string, number>;
    other: string[];
  };
  buildTime: number;
  population: number;
}

const BuildingsPage: React.FC = () => {
  const loading = false;

  const columns: ProColumns<BuildingItem>[] = [
    {
      title: '建筑名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (_, record) => <Tag color="blue">{record.type}</Tag>,
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
      valueType: 'digit',
    },
    {
      title: '建造时间(分钟)',
      dataIndex: 'buildTime',
      key: 'buildTime',
      valueType: 'digit',
    },
    {
      title: '人口需求',
      dataIndex: 'population',
      key: 'population',
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
        <Button key="balance" type="link">
          平衡参数
        </Button>,
      ],
    },
  ];

  const mockData: BuildingItem[] = [
    {
      id: '1',
      name: '伐木场',
      type: 'resource',
      level: 1,
      requirements: {
        resources: { wood: 100, stone: 50 },
        technology: ['basic_construction'],
      },
      effects: {
        production: { wood: 10 },
        storage: { wood: 1000 },
        other: ['增加木材产量10%'],
      },
      buildTime: 30,
      population: 5,
    },
    {
      id: '2',
      name: '兵营',
      type: 'military',
      level: 1,
      requirements: {
        resources: { wood: 200, stone: 150, iron: 100 },
        technology: ['military_training'],
      },
      effects: {
        production: { soldiers: 1 },
        storage: { soldiers: 20 },
        other: ['提升军队训练速度5%'],
      },
      buildTime: 60,
      population: 20,
    },
  ];

  return (
    <PageContainer>
      <ProTable<BuildingItem>
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        search={{
          filterType: 'light',
        }}
        dateFormatter="string"
        headerTitle="建筑管理"
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ width: '100%' }}>
              <ProCard title="建造要求" bordered>
                <div>
                  资源需求：
                  {Object.entries(record.requirements.resources).map(
                    ([key, value]) => (
                      <Tag key={key}>{`${key}: ${value}`}</Tag>
                    ),
                  )}
                </div>
                <div>
                  科技需求：
                  {record.requirements.technology.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </ProCard>
              <ProCard title="建筑效果" bordered>
                <div>
                  产出效果：
                  {Object.entries(record.effects.production).map(
                    ([key, value]) => (
                      <Tag key={key}>{`${key}: +${value}/小时`}</Tag>
                    ),
                  )}
                </div>
                <div>
                  存储容量：
                  {Object.entries(record.effects.storage).map(
                    ([key, value]) => (
                      <Tag key={key}>{`${key}: ${value}`}</Tag>
                    ),
                  )}
                </div>
                <div>
                  其他效果：
                  {record.effects.other.map((effect) => (
                    <Tag key={effect}>{effect}</Tag>
                  ))}
                </div>
              </ProCard>
            </div>
          ),
        }}
        toolBarRender={() => [
          <Button key="add" type="primary">
            添加建筑
          </Button>,
          <Button key="import">导入配置</Button>,
          <Button key="export">导出配置</Button>,
        ]}
      />
    </PageContainer>
  );
};

export default BuildingsPage;
