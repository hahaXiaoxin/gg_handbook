import { Button, Typography, Form, Input, Space, Card, Divider } from 'antd';
import { MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

function Contact() {
  const navigate = useNavigate();
  
  const onFinish = (values: any) => {
    console.log('表单提交:', values);
    // 这里可以添加表单提交逻辑
  };

  return (
    <div className="page contact-page">
      <Typography>
        <Title level={2}>联系我们</Title>
        <Paragraph>
          如果您有任何问题或建议，请通过以下方式联系我们或填写表单发送消息。
        </Paragraph>
      </Typography>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <Card style={{ flex: 1, minWidth: '300px' }}>
          <Divider orientation="left">联系方式</Divider>
          <Space direction="vertical" size="middle">
            <div>
              <MailOutlined /> <strong>邮箱：</strong> example@example.com
            </div>
            <div>
              <PhoneOutlined /> <strong>电话：</strong> 123-456-7890
            </div>
            <div>
              <HomeOutlined /> <strong>地址：</strong> 北京市朝阳区某某街道123号
            </div>
          </Space>
        </Card>
        
        <Card style={{ flex: 1, minWidth: '300px' }}>
          <Divider orientation="left">发送消息</Divider>
          <Form
            name="contact"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入您的姓名' }]}
            >
              <Input placeholder="请输入您的姓名" />
            </Form.Item>
            
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: '请输入您的邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input placeholder="请输入您的邮箱" />
            </Form.Item>
            
            <Form.Item
              name="message"
              label="消息"
              rules={[{ required: true, message: '请输入您的消息' }]}
            >
              <TextArea rows={4} placeholder="请输入您的消息" />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      
      <div style={{ marginTop: 20 }}>
        <Button onClick={() => navigate('/')}>
          返回首页
        </Button>
      </div>
    </div>
  );
}

export default Contact; 