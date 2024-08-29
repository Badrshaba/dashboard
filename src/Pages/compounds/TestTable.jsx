import { Avatar, Button, Image, Space, Table } from 'antd';
import { Edit, Trash } from 'lucide-react';
const TestTable = ({ compounds }) => {
      //,"price max"]
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, user) => <Image src={user.image} alt='logo' width={150}  />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Area min',
      dataIndex: 'area_min',
      key: 'area_min',
    },
    {
      title: 'Area max',
      dataIndex: 'area_max',
      key: 'area_max',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Zone',
      dataIndex: 'zone_id',
      key: 'zone_id',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Price min',
      dataIndex: 'price_min',
      key: 'price_min',
      sorter: (a, b) => a.price_min - b.price_min,
    },
    {
      title: 'price max',
      dataIndex: 'price_max',
      key: 'price_max',
      sorter: (a, b) => a.price_max - b.price_max,
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

  return (
    <Table
      dataSource={compounds}
      columns={columns}
      rowKey={(compound) => compound.id}
      className=' pt-8'
      pagination={{
        position: ['bottomCenter'],
      }}
    />
  );
};

export default TestTable;

