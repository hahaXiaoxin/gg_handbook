import { Select } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getUserList, User } from '../api';
import { debounce } from 'lodash';

type IUserSelectBasicProps =
    | {
          value?: User;
          onChange?: (value?: User) => void;
          mode?: undefined;
      }
    | ({
          value?: User[];
          onChange?: (value?: User[]) => void;
          mode: 'multiple';
      } & {
          style?: React.CSSProperties;
      });

export const UserSelect = (props: IUserSelectBasicProps) => {

    const [options, setOptions] = useState<{label: string, value: string}[]>([]);

    const userMap = useRef<Record<string, User>>({});

    const selectValue = props.mode === 'multiple' ? props.value?.map((item) => item.UserName) : props.value?.UserName;

    // 响应表单值
    const handleChange = (value?: string | string[]) => {
        if (!value) {
            props.onChange?.(undefined);
            return;
        }

        if (props.mode === 'multiple') {
            const userList = (value as string[]).map((item) => userMap.current[item]);
            props.onChange?.(userList);
        } else {
            props.onChange?.(userMap.current[value as string]);
        }
    };

    const updateOptions = useCallback(async (searchValue?: string) => {
        const userList = await getUserList({ keyWord: searchValue });

        const newOptions = userList.Data.map(item => {
            userMap.current[item.UserName] = item;

            return {
                label: item.UserName,
                value: item.UserName,
            };
        })

        setOptions(newOptions);
    }, [])

    const debouncedUpdateOptions = useMemo(() => debounce(updateOptions, 300), [updateOptions]);

    const handleSearch = useCallback((value: string) => {
        debouncedUpdateOptions(value);
    }, [debouncedUpdateOptions]);

    // 初始化获取列表
    useEffect(() => {
        updateOptions();
    }, []);

    return (
        <Select
            {...props}
            value={selectValue}
            options={options}
            showSearch
            onChange={handleChange}
            onSearch={handleSearch}
        />
    );
};
