import {
  PageContainer,
  ProCard,
  StatisticCard,
} from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import styles from './index.less';

const HomePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ProCard title="游戏概览" headerBordered>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <StatisticCard
                    statistic={{
                      title: '活跃玩家',
                      value: 2864,
                      description: '今日活跃玩家数量',
                    }}
                  />
                </Col>
                <Col span={6}>
                  <StatisticCard
                    statistic={{
                      title: '新增村庄',
                      value: 123,
                      description: '过去24小时',
                    }}
                  />
                </Col>
                <Col span={6}>
                  <StatisticCard
                    statistic={{
                      title: '资源交易量',
                      value: '1,234,567',
                      description: '今日总交易量',
                    }}
                  />
                </Col>
                <Col span={6}>
                  <StatisticCard
                    statistic={{
                      title: '系统事件',
                      value: 56,
                      description: '待处理事件',
                    }}
                  />
                </Col>
              </Row>
            </ProCard>
          </Col>

          <Col span={12}>
            <ProCard title="资源分布" headerBordered>
              {/* 这里可以添加资源分布图表 */}
            </ProCard>
          </Col>

          <Col span={12}>
            <ProCard title="玩家进度分布" headerBordered>
              {/* 这里可以添加玩家进度分布图表 */}
            </ProCard>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default HomePage;
