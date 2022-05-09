import { Table } from "antd";
import { useGetUsers } from "api/user";
import MainContent from "Layout/MainContent";
import MainHeader from "commons/MainHeader";
import { FC, ReactElement, useMemo } from "react";
import MainLayout from "Layout/MainLayout";

const User: FC = (): ReactElement => {
  const { data } = useGetUsers();

  const column = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return useMemo(
    () => (
      <MainLayout>
        <MainHeader title='User' />
        <MainContent>
          <div className='wrap-content'>
            <Table
              rowKey='id'
              className='on-row'
              columns={column}
              onRow={(record: any) => {
                return {
                  onClick: () => {
                    console.log({ record });
                  },
                };
              }}
              dataSource={data}
            />
          </div>
        </MainContent>
      </MainLayout>
    ),
    [data],
  );
};

export default User;
