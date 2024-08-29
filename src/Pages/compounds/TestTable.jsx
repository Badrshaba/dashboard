import { Button, Space, Table } from 'antd';
import { CircleEllipsis, Edit, Trash } from 'lucide-react';
import { deleteCompounds } from '../../redux/thunck/crudCompounds';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const TestTable = ({ compounds }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const deleteUser = (compoundID) => {
    dispatch(deleteCompounds(compoundID));
    onCloseDialog();
    };
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
      title: 'Zone',
      dataIndex: 'zone_id',
      key: 'zone_id',
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
          <Button color='blue' onClick={()=>navigate(`${rec.id}`)}   icon={<CircleEllipsis color='blue' />} />
          <Button
          onClick={()=>deleteUser(rec.id)}
            danger={true}
            icon={<Trash />}
          />
          <Button  icon={<Edit />} />
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

