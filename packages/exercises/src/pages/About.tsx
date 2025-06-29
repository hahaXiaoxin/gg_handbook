import { Button, Card, Typography, Divider, List } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

function About() {
  const navigate = useNavigate();
  
  const features = [
    'React 18 - 最新的React版本',
    'TypeScript - 类型安全的JavaScript',
    'React Router - 客户端路由管理',
    'Ant Design - 企业级UI组件库',
    'Vite - 现代前端构建工具'
  ];

  return (
    <div className="page about-page">
      <Typography>
        <Title level={2}>关于我们</Title>
        <Paragraph>
          这是一个使用React Router的示例项目，展示了如何在React应用中实现路由功能。
          通过React Router可以轻松实现单页应用的路由管理，提供更好的用户体验。
        </Paragraph>
      </Typography>
      
      <Divider orientation="left">项目技术栈</Divider>
      
      <Card>
        <List
          bordered
          dataSource={features}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </Card>
      
      <div style={{ marginTop: 20 }}>
        <Button type="primary" onClick={() => navigate('/')}>
          返回首页
        </Button>
      </div>
    </div>
  );
}

export default About; 