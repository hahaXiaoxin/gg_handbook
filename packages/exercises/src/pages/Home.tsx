import { Button, Card, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      <Typography>
        <Title level={2}>首页</Title>
        <Paragraph>
          这是React Router与Ant Design结合的示例首页。这个项目展示了如何使用React
          Router进行路由管理， 并结合Ant Design组件库创建美观的用户界面。
        </Paragraph>
      </Typography>

      <Card title="导航示例" style={{ marginTop: 20 }}>
        <Space>
          <Button type="primary" onClick={() => navigate('/about')}>
            关于我们
          </Button>
          <Button onClick={() => navigate('/contact')}>联系我们</Button>
        </Space>
      </Card>
    </div>
  );
}

export default Home;
