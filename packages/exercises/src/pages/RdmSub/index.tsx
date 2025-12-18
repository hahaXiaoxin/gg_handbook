import React from 'react';
import { UserSelect } from './components/UserSelect';

/** 请花3分钟阅读题目，与面试官确认需求理解一致
    背景：在企业场景中，经常会遇到需要一个下拉选择器选择用户，比如审核流程需要选择一个或多个用户进行流程审核
    1：使用任何你熟悉的脚手架包含（react, typescript,mock, ui库，请求库），写一个用户选择器组件，工程整体使用git初始化，并完成一个commit的提交；
    2：写一个demo引入你写的用户选择器组件
    3：请考虑组件单独使用、表单中使用等场景
    说明以及条件
    时长：30分钟, 可使用搜索引擎以及AI助手协助
    模板说明：任何你熟悉的脚手架包含（react, typescript,mock, ui（如antd）库，请求库(如ahooks,axios等)）如umi或者npx create-react-app my-app --template typescript 创建模板，安装熟悉的组件库+请求库
    假设【模糊查询用户】的接口为：https://mock.com/getUser（实际工作情况中，后端只提供接口协议，接口还未实现需要并行开发）
    参数：keyWord为查询关键词
    http状态码200返回结果分2种情况如下：请注意Response是返回的数据的一部分
    正常返回的JSON数据体形式为：{
    Response:{
    Data:[{UserName:"xiaoli";UserAge:20},{UserName:"laoniu";UserAge:50}]
    }
    }， UserName具有唯一性
    异常返回JSON数据体形式为：{
    Response:{
    Error:{
    Code:'错误码',
    Message: '错误信息'
    }
    }
    }
请按照实际工作情况编写 **/

const RdmSub: React.FC = () => {
    return (
        <div>
            <UserSelect
                style={{ width: 200 }}
                mode="multiple"
            />
        </div>
    );
};

export default RdmSub;
