import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Col, Progress, Row, Space, Statistic, Tag } from 'antd';

interface PlayerItem {
  id: string;
  username: string;
  level: number;
  villageCount: number;
  population: number;
  resources: Record<string, number>;
  buildings: Array<{
    name: string;
    level: number;
  }>;
  technologies: Array<{
    name: string;
    progress: number;
  }>;
  militaryPower: number;
  lastActive: string;
  vipLevel: number;
  experience: number;
  nextLevelExp: number;
}

const PlayersPage: React.FC = () => {
  const loading = false;

  const columns: ProColumns<PlayerItem>[] = [
    {
      title: '玩家名称',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
      render: (_, record) => <Tag color="blue">Lv.{record.level}</Tag>,
    },
    {
      title: '经验值',
      dataIndex: 'experience',
      key: 'experience',
      render: (_, record) => (
        <Progress
          percent={(record.experience / record.nextLevelExp) * 100}
          size="small"
        />
      ),
    },
    {
      title: '村庄数量',
      dataIndex: 'villageCount',
      key: 'villageCount',
      valueType: 'digit',
    },
    {
      title: '人口',
      dataIndex: 'population',
      key: 'population',
      valueType: 'digit',
    },
    {
      title: '军事力量',
      dataIndex: 'militaryPower',
      key: 'militaryPower',
      valueType: 'digit',
    },
    {
      title: '最后活跃',
      dataIndex: 'lastActive',
      key: 'lastActive',
      valueType: 'dateTime',
    },
    {
      title: 'VIP等级',
      dataIndex: 'vipLevel',
      key: 'vipLevel',
      render: (_, record) => (
        <Tag color={record.vipLevel > 0 ? 'gold' : 'default'}>
          VIP {record.vipLevel}
        </Tag>
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

  const mockData: PlayerItem[] = [
    {
      id: '1',
      username: 'Player001',
      level: 25,
      villageCount: 3,
      population: 1500,
      resources: {
        gold: 10000,
        wood: 5000,
        stone: 3000,
        food: 8000,
      },
      buildings: [
        { name: '城堡', level: 5 },
        { name: '兵营', level: 4 },
        { name: '农场', level: 6 },
      ],
      technologies: [
        { name: '高级农业', progress: 100 },
        { name: '军事训练', progress: 60 },
      ],
      militaryPower: 2500,
      lastActive: '2023-12-01T10:00:00',
      vipLevel: 2,
      experience: 10000,
      nextLevelExp: 20000,
    },
    {
      id: '2',
      username: 'Player002',
      level: 18,
      villageCount: 2,
      population: 800,
      resources: {
        gold: 5000,
        wood: 3000,
        stone: 2000,
        food: 4000,
      },
      buildings: [
        { name: '城堡', level: 3 },
        { name: '兵营', level: 2 },
        { name: '农场', level: 4 },
      ],
      technologies: [
        { name: '基础农业', progress: 100 },
        { name: '基础军事', progress: 80 },
      ],
      militaryPower: 1200,
      lastActive: '2023-12-01T09:30:00',
      vipLevel: 0,
      experience: 5000,
      nextLevelExp: 10000,
    },
  ];

  return (
    <PageContainer>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <ProCard>
            <Statistic title="总玩家数" value={10234} />
          </ProCard>
        </Col>
        <Col span={6}>
          <ProCard>
            <Statistic title="今日活跃" value={1234} />
          </ProCard>
        </Col>
        <Col span={6}>
          <ProCard>
            <Statistic title="新增玩家" value={123} />
          </ProCard>
        </Col>
        <Col span={6}>
          <ProCard>
            <Statistic title="付费玩家" value={432} suffix="人" />
          </ProCard>
        </Col>
      </Row>

      <ProTable<PlayerItem>
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        search={{
          filterType: 'light',
        }}
        dateFormatter="string"
        headerTitle="玩家管理"
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <Space direction="vertical" style={{ width: '100%' }}>
              <ProCard title="资源状态" bordered>
                <Row gutter={16}>
                  {Object.entries(record.resources).map(([key, value]) => (
                    <Col span={6} key={key}>
                      <Statistic title={key.toUpperCase()} value={value} />
                    </Col>
                  ))}
                </Row>
              </ProCard>
              <ProCard title="建筑状态" bordered>
                {record.buildings.map((building) => (
                  <Tag key={building.name}>
                    {building.name} Lv.{building.level}
                  </Tag>
                ))}
              </ProCard>
              <ProCard title="科技进度" bordered>
                {record.technologies.map((tech) => (
                  <div key={tech.name} style={{ marginBottom: 8 }}>
                    <div>{tech.name}</div>
                    <Progress percent={tech.progress} size="small" />
                  </div>
                ))}
              </ProCard>
            </Space>
          ),
        }}
        toolBarRender={() => [
          <Button key="export">导出数据</Button>,
          <Button key="batch">批量操作</Button>,
        ]}
      />
    </PageContainer>
  );
};

export default PlayersPage;
