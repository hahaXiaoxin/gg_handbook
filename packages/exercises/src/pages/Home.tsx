import { Typography } from "antd";

const { Title, Paragraph } = Typography;

function Home() {
    return (
        <div className="page home-page">
            <Typography>
                <Title level={2}>首页</Title>
                <Paragraph>这是基于React + antd搭建的页面，用于实现各种浏览器案例</Paragraph>
            </Typography>
        </div>
    );
}

export default Home;
