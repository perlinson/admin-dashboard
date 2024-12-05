import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Progress, Space, Switch, Tag } from 'antd';

interface EventItem {
  id: string;
  name: string;
  type: string;
  probability: number;
  duration: number;
  conditions: {
    playerLevel: number;
    requiredBuildings: string[];
    requiredTechnologies: string[];
    timeRestriction?: {
      start: string;
      end: string;
    };
  };
  effects: {
    resourceModifiers: Record<string, number>;
    buildingModifiers: Record<string, number>;
    specialEffects: string[];
  };
  isActive: boolean;
  description: string;
}

const EventsPage: React.FC = () => {
  const loading = false;

  const columns: ProColumns<EventItem>[] = [
    {
      title: '事件名称',
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
      title: '触发概率',
      dataIndex: 'probability',
      key: 'probability',
      render: (_, record) => (
        <Progress percent={record.probability * 100} size="small" />
      ),
    },
    {
      title: '持续时间(小时)',
      dataIndex: 'duration',
      key: 'duration',
      valueType: 'digit',
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (_, record) => <Switch checked={record.isActive} />,
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

  const mockData: EventItem[] = [
    {
      id: '1',
      name: '丰收季节',
      type: 'natural',
      probability: 0.15,
      duration: 48,
      conditions: {
        playerLevel: 5,
        requiredBuildings: ['农场'],
        requiredTechnologies: ['基础农业'],
        timeRestriction: {
          start: '2023-06-01',
          end: '2023-08-31',
        },
      },
      effects: {
        resourceModifiers: {
          food: 50,
          gold: 20,
        },
        buildingModifiers: {
          farm: 30,
        },
        specialEffects: ['农场产量提升50%', '市场交易量提升20%'],
      },
      isActive: true,
      description: '夏季丰收活动，提升农业相关产出',
    },
    {
      id: '2',
      name: '蛮族入侵',
      type: 'military',
      probability: 0.1,
      duration: 24,
      conditions: {
        playerLevel: 10,
        requiredBuildings: ['城墙', '兵营'],
        requiredTechnologies: ['基础防御'],
      },
      effects: {
        resourceModifiers: {
          food: -20,
          gold: -10,
        },
        buildingModifiers: {
          barracks: 50,
        },
        specialEffects: ['防御建筑效果提升50%', '军队训练速度提升100%'],
      },
      isActive: true,
      description: '蛮族入侵事件，考验玩家防御能力',
    },
  ];

  return (
    <PageContainer>
      <ProTable<EventItem>
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        search={{
          filterType: 'light',
        }}
        dateFormatter="string"
        headerTitle="事件系统管理"
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <Space direction="vertical" style={{ width: '100%' }}>
              <ProCard title="触发条件" bordered>
                <div>
                  <div>玩家等级要求: {record.conditions.playerLevel}</div>
                  <div>
                    需要建筑:
                    {record.conditions.requiredBuildings.map((building) => (
                      <Tag key={building}>{building}</Tag>
                    ))}
                  </div>
                  <div>
                    需要科技:
                    {record.conditions.requiredTechnologies.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                  {record.conditions.timeRestriction && (
                    <div>
                      时间限制: {record.conditions.timeRestriction.start} 至{' '}
                      {record.conditions.timeRestriction.end}
                    </div>
                  )}
                </div>
              </ProCard>
              <ProCard title="事件效果" bordered>
                <div>
                  资源修正:
                  {Object.entries(record.effects.resourceModifiers).map(
                    ([key, value]) => (
                      <Tag key={key} color={value > 0 ? 'green' : 'red'}>
                        {key}: {value > 0 ? '+' : ''}
                        {value}%
                      </Tag>
                    ),
                  )}
                </div>
                <div>
                  建筑修正:
                  {Object.entries(record.effects.buildingModifiers).map(
                    ([key, value]) => (
                      <Tag key={key} color={value > 0 ? 'green' : 'red'}>
                        {key}: {value > 0 ? '+' : ''}
                        {value}%
                      </Tag>
                    ),
                  )}
                </div>
                <div>
                  特殊效果:
                  {record.effects.specialEffects.map((effect) => (
                    <Tag key={effect}>{effect}</Tag>
                  ))}
                </div>
              </ProCard>
              <ProCard title="描述" bordered>
                {record.description}
              </ProCard>
            </Space>
          ),
        }}
        toolBarRender={() => [
          <Button key="add" type="primary">
            创建事件
          </Button>,
          <Button key="schedule">事件排程</Button>,
          <Button key="history">历史记录</Button>,
        ]}
      />
    </PageContainer>
  );
};

export default EventsPage;
