import { FC, ReactElement, useCallback, useMemo, useState } from 'react';
import MainLayout from 'components/Layout/MainLayout';
import { Table } from 'antd';
import MainHeader from 'commons/MainHeader';
import MainContent from 'commons/MainContent';
import { useGetUsers } from 'api/user';

const User: FC = (): ReactElement => {
  const { data, isLoading, error } = useGetUsers();
  const [a, setA] = useState('a');
  const column = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }
  ];

  const dataSource =
    !isLoading &&
    data.map((item: any, key: string) => {
      return { ...item, key };
    });

  return useMemo(
    () => (
      <MainLayout>
        <MainHeader title="User" />
        {a}
        <MainContent>
          <div className="wrap-content">
            <Table
              className="on-row"
              columns={column}
              onRow={(record: any) => {
                return {
                  onClick: () => {
                    setA(record.full_name);
                    console.log({ record });
                  }
                };
              }}
              dataSource={dataSource}
            />
          </div>
        </MainContent>
      </MainLayout>
    ),
    [data,a]
  );
};

export default User;
