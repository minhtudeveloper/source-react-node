import { Table } from "antd";
import { useGetUsers } from "api/user";
import MainContent from "commons/MainContent";
import MainHeader from "commons/MainHeader";
import MainLayout from "components/Layout/MainLayout";
import { FC, ReactElement, useMemo } from "react";

const User: FC = (): ReactElement => {
  const { data, isLoading, error } = useGetUsers();
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

  const dataSource =
    !isLoading &&
    data.map((item: any, key: string) => {
      return { ...item, key };
    });

  return useMemo(
    () => (
      <MainLayout>
        <MainHeader title='User' />
        <MainContent>
          <div className='wrap-content'>
            <Table
              className='on-row'
              columns={column}
              onRow={(record: any) => {
                return {
                  onClick: () => {
                    console.log({ record });
                  },
                };
              }}
              dataSource={dataSource}
            />
          </div>
        </MainContent>
      </MainLayout>
    ),
    [data],
  );
};

export default User;
