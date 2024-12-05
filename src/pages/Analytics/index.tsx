import { Column, Line, Pie } from '@ant-design/plots';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, DatePicker, Row, Select } from 'antd';

const { RangePicker } = DatePicker;

const AnalyticsPage: React.FC = () => {
  // 玩家活跃度数据
  const activeUserData = [
    { date: '2023-11-25', count: 1200, type: 'DAU' },
    { date: '2023-11-26', count: 1300, type: 'DAU' },
    { date: '2023-11-27', count: 1100, type: 'DAU' },
    { date: '2023-11-28', count: 1400, type: 'DAU' },
    { date: '2023-11-29', count: 1600, type: 'DAU' },
    { date: '2023-11-30', count: 1500, type: 'DAU' },
    { date: '2023-12-01', count: 1800, type: 'DAU' },
    { date: '2023-11-25', count: 8000, type: 'MAU' },
    { date: '2023-11-26', count: 8200, type: 'MAU' },
    { date: '2023-11-27', count: 8400, type: 'MAU' },
    { date: '2023-11-28', count: 8600, type: 'MAU' },
    { date: '2023-11-29', count: 8800, type: 'MAU' },
    { date: '2023-11-30', count: 9000, type: 'MAU' },
    { date: '2023-12-01', count: 9200, type: 'MAU' },
  ];

  // 资源消耗分布
  const resourceConsumptionData = [
    { type: '木材', value: 27.5 },
    { type: '石材', value: 25.3 },
    { type: '粮食', value: 20.1 },
    { type: '铁矿', value: 15.6 },
    { type: '黄金', value: 11.5 },
  ];

  // 玩家等级分布
  const playerLevelData = [
    { level: '1-10', count: 3500 },
    { level: '11-20', count: 2800 },
    { level: '21-30', count: 2000 },
    { level: '31-40', count: 1500 },
    { level: '41-50', count: 800 },
    { level: '50+', count: 400 },
  ];

  // 活跃用户图表配置
  const activeUserConfig = {
    data: activeUserData,
    xField: 'date',
    yField: 'count',
    seriesField: 'type',
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };

  // 资源消耗图表配置
  const resourceConsumptionConfig = {
    data: resourceConsumptionData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
  };

  // 玩家等级分布图表配置
  const playerLevelConfig = {
    data: playerLevelData,
    xField: 'level',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      level: {
        alias: '等级区间',
      },
      count: {
        alias: '玩家数量',
      },
    },
  };

  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProCard title="数据筛选" bordered>
            <Row gutter={16}>
              <Col span={6}>
                <RangePicker style={{ width: '100%' }} />
              </Col>
              <Col span={6}>
                <Select
                  placeholder="选择服务器"
                  style={{ width: '100%' }}
                  options={[
                    { value: 'all', label: '全部服务器' },
                    { value: 'server1', label: '服务器1区' },
                    { value: 'server2', label: '服务器2区' },
                  ]}
                />
              </Col>
              <Col span={6}>
                <Select
                  placeholder="玩家等级"
                  style={{ width: '100%' }}
                  options={[
                    { value: 'all', label: '全部等级' },
                    { value: '1-10', label: '1-10级' },
                    { value: '11-20', label: '11-20级' },
                    { value: '21+', label: '21级以上' },
                  ]}
                />
              </Col>
            </Row>
          </ProCard>
        </Col>

        <Col span={24}>
          <ProCard title="活跃用户趋势" bordered>
            <Line {...activeUserConfig} />
          </ProCard>
        </Col>

        <Col span={12}>
          <ProCard title="资源消耗分布" bordered>
            <Pie {...resourceConsumptionConfig} />
          </ProCard>
        </Col>

        <Col span={12}>
          <ProCard title="玩家等级分布" bordered>
            <Column {...playerLevelConfig} />
          </ProCard>
        </Col>

        <Col span={24}>
          <ProCard title="游戏平衡性分析" bordered>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <ProCard title="资源产出比" bordered>
                  {/* 这里可以添加更详细的资源产出分析图表 */}
                </ProCard>
              </Col>
              <Col span={8}>
                <ProCard title="建筑升级趋势" bordered>
                  {/* 这里可以添加建筑升级分析图表 */}
                </ProCard>
              </Col>
              <Col span={8}>
                <ProCard title="科技研发分布" bordered>
                  {/* 这里可以添加科技研发分析图表 */}
                </ProCard>
              </Col>
            </Row>
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default AnalyticsPage;
