import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { Input, Select, Table, Tag, Typography } from 'antd';
import { getCompounds } from '../../redux/thunck/crudCompounds';

const Brookers = () => {
  const { compounds, isLoading } = useSelector((state) => state.compounds);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompounds());
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, { name }) => (
        <Typography>
          <Typography.Title level={5}>{name}</Typography.Title>
        </Typography>
      ),
    },
    {
      title: 'No.Of Compounds',
      dataIndex: 'compounds',
      key: 'compounds',
      render: (_, { compounds }) => (
        <Typography>
          <Typography.Title level={5}>{compounds}</Typography.Title>
        </Typography>
      ),
    },
    {
      title: 'Zone',

      dataIndex: 'zone',
      key: 'zone',
      render: (_, { zone }) => (
        <Typography>
          <Typography.Title level={5}>{zone}</Typography.Title>
        </Typography>
      ),
    },
    {
      title: 'No.Of Units',
      dataIndex: 'units',
      key: 'units',
      render: (_, { units }) => (
        <Typography>
          <Typography.Title level={5}>{units}</Typography.Title>
        </Typography>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => <Tag color='#87d068'>{status}</Tag>,
    },
    {
      title: 'Details',
      dataIndex: 'details',

      render: (_, { id }) => (
        <Tag color='#87d068'>
          <Link to={`/compound/${id}`}>Details</Link>
        </Tag>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={compounds}
        rowKey={(row) => row.id}
        loading={isLoading}
        pagination={{
          position: ['bottomCenter'],
        }}
      />
    </div>
  );
};

export default Brookers;
