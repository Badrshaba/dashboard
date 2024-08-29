import { Button, Space, Table } from 'antd';
import { Edit, Trash } from 'lucide-react';
const TestTable = ({ users }) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',

      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      filters: [
        {
          text: 'Admin',
          value: 'Admin',
        },
        {
          text: 'User',
          value: 'User',
        },
        {
          text: 'Developer',
          value: 'Developer',
        },
        {
          text: 'Brooker',
          value: 'Brooker',
        },
      ],
      onFilter: (value, record) => record.role.startsWith(value.toLowerCase()),
      filterSearch: true,
      width: '40%',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, rec) => (
        <Space>
          <Button
            danger={true}
            icon={<Trash />}
          />
          <Button icon={<Edit />} />
        </Space>
      ),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <Table
      dataSource={users}
      columns={columns}
      onChange={onChange}
      rowKey={(user) => user.id}
      style={{ marginTop: '2rem', textAlign: 'center' }}
    />
  );
};

export default TestTable;
