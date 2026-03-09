import axios from "axios";

export interface User {
    UserName: string;
    UserAge: number;
}

interface IGetUserListArgs {
    keyWord?: string;
}

interface IGetUserListResponse {
    Data: User[];
}

/**
 * 获取用户列表
 * @returns 用户列表
 */
export async function getUserList(options: IGetUserListArgs) {
    const res = await axios.get<IGetUserListResponse>('/api/getUser', { params: options });
    return res.data;
}