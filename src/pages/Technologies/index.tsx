import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Progress, Tag } from 'antd';

interface TechnologyItem {
  id: string;
  name: string;
  category: string;
  level: number;
  researchTime: number;
  requirements: {
    resources: Record<string, number>;
    prerequisites: string[];
  };
  effects: {
    resourceBonus: Record<string, number>;
    buildingBonus: Record<string, number>;
    specialEffects: string[];
  };
  description: string;
  adoptionRate: number;
}

const TechnologiesPage: React.FC = () => {
  const loading = false;

  const columns: ProColumns<TechnologyItem>[] = [
    {
      title: '科技名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      render: (_, record) => <Tag color="blue">{record.category}</Tag>,
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
      valueType: 'digit',
    },
    {
      title: '研究时间(小时)',
      dataIndex: 'researchTime',
      key: 'researchTime',
      valueType: 'digit',
    },
    {
      title: '采用率',
      dataIndex: 'adoptionRate',
      key: 'adoptionRate',
      render: (_, record) => (
        <Progress
          percent={record.adoptionRate}
          size="small"
          status={record.adoptionRate < 30 ? 'exception' : 'normal'}
        />
      ),
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

  const mockData: TechnologyItem[] = [
    {
      id: '1',
      name: '高级农业',
      category: 'resource',
      level: 1,
      researchTime: 24,
      requirements: {
        resources: { gold: 1000, food: 500 },
        prerequisites: ['basic_farming'],
      },
      effects: {
        resourceBonus: { food: 20 },
        buildingBonus: { farm: 15 },
        specialEffects: ['减少农田工人需求10%', '提高粮食产量20%'],
      },
      description: '提高农业生产效率，减少人力需求',
      adoptionRate: 75,
    },
    {
      id: '2',
      name: '军事训练',
      category: 'military',
      level: 2,
      researchTime: 48,
      requirements: {
        resources: { gold: 2000, iron: 1000 },
        prerequisites: ['basic_combat', 'advanced_weapons'],
      },
      effects: {
        resourceBonus: {},
        buildingBonus: { barracks: 25 },
        specialEffects: ['提升部队训练速度25%', '增加部队战斗力10%'],
      },
      description: '提升军队训练效率和战斗能力',
      adoptionRate: 45,
    },
  ];

  return (
    <PageContainer>
      <ProTable<TechnologyItem>
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        search={{
          filterType: 'light',
        }}
        dateFormatter="string"
        headerTitle="科技树管理"
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ width: '100%' }}>
              <ProCard title="研究要求" bordered>
                <div>
                  资源需求：
                  {Object.entries(record.requirements.resources).map(
                    ([key, value]) => (
                      <Tag key={key}>{`${key}: ${value}`}</Tag>
                    ),
                  )}
                </div>
                <div>
                  前置科技：
                  {record.requirements.prerequisites.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </ProCard>
              <ProCard title="科技效果" bordered>
                <div>
                  资源加成：
                  {Object.entries(record.effects.resourceBonus).map(
                    ([key, value]) => (
                      <Tag key={key}>{`${key}: +${value}%`}</Tag>
                    ),
                  )}
                </div>
                <div>
                  建筑加成：
                  {Object.entries(record.effects.buildingBonus).map(
                    ([key, value]) => (
                      <Tag key={key}>{`${key}: +${value}%`}</Tag>
                    ),
                  )}
                </div>
                <div>
                  特殊效果：
                  {record.effects.specialEffects.map((effect) => (
                    <Tag key={effect}>{effect}</Tag>
                  ))}
                </div>
              </ProCard>
              <ProCard title="描述" bordered>
                {record.description}
              </ProCard>
            </div>
          ),
        }}
        toolBarRender={() => [
          <Button key="add" type="primary">
            添加科技
          </Button>,
          <Button key="tree">查看科技树</Button>,
          <Button key="export">导出配置</Button>,
        ]}
      />
    </PageContainer>
  );
};

export default TechnologiesPage;
