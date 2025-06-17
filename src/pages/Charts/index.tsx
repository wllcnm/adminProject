import { Card, Col, Row } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import styles from './index.less';

// 模拟数据
const barData = [
  { name: '1月', 销售额: 4000, 利润: 2400 },
  { name: '2月', 销售额: 3000, 利润: 1398 },
  { name: '3月', 销售额: 2000, 利润: 9800 },
  { name: '4月', 销售额: 2780, 利润: 3908 },
  { name: '5月', 销售额: 1890, 利润: 4800 },
  { name: '6月', 销售额: 2390, 利润: 3800 },
];

const lineData = [
  { name: '周一', 访问量: 400, 页面浏览: 240 },
  { name: '周二', 访问量: 300, 页面浏览: 139 },
  { name: '周三', 访问量: 200, 页面浏览: 980 },
  { name: '周四', 访问量: 278, 页面浏览: 390 },
  { name: '周五', 访问量: 189, 页面浏览: 480 },
  { name: '周六', 访问量: 239, 页面浏览: 380 },
  { name: '周日', 访问量: 349, 页面浏览: 430 },
];

const pieData = [
  { name: 'PC端', value: 400, color: '#0088FE' },
  { name: '移动端', value: 300, color: '#00C49F' },
  { name: '平板端', value: 200, color: '#FFBB28' },
  { name: '其他', value: 100, color: '#FF8042' },
];

const areaData = [
  { name: '1月', 用户数: 4000, 新增用户: 2400, 活跃用户: 2000 },
  { name: '2月', 用户数: 3000, 新增用户: 1398, 活跃用户: 2210 },
  { name: '3月', 用户数: 2000, 新增用户: 9800, 活跃用户: 2290 },
  { name: '4月', 用户数: 2780, 新增用户: 3908, 活跃用户: 2000 },
  { name: '5月', 用户数: 1890, 新增用户: 4800, 活跃用户: 2181 },
  { name: '6月', 用户数: 2390, 新增用户: 3800, 活跃用户: 2500 },
];

const ChartsPage: React.FC = () => {
  // 饼图标签渲染函数
  const renderPieLabel = (entry: any) => {
    const { name, percent } = entry;
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <PageContainer
      header={{
        title: '数据图表',
        breadcrumb: {
          items: [
            { title: '首页', path: '/' },
            { title: '数据图表' },
          ],
        },
      }}
    >
      <div className={styles.container}>
        <Row gutter={[16, 16]}>
          {/* 柱状图 */}
          <Col xs={24} lg={12}>
            <Card title="销售数据统计" bordered={false}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="销售额" fill="#8884d8" />
                  <Bar dataKey="利润" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* 折线图 */}
          <Col xs={24} lg={12}>
            <Card title="网站访问统计" bordered={false}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="访问量" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="页面浏览" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* 饼图 */}
          <Col xs={24} lg={12}>
            <Card title="设备访问占比" bordered={false}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderPieLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* 面积图 */}
          <Col xs={24} lg={12}>
            <Card title="用户增长趋势" bordered={false}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={areaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="用户数" 
                    stackId="1" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="新增用户" 
                    stackId="1" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="活跃用户" 
                    stackId="1" 
                    stroke="#ffc658" 
                    fill="#ffc658" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default ChartsPage; 