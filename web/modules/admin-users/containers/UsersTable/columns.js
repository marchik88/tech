export default ({ Actions }) => [
  {
    dataIndex: 'firstName',
    key: 'firstName',
    ellipsis: true,
  },
  {
    dataIndex: 'lastName',
    key: 'lastName',
    ellipsis: true,
  },
  {
    dataIndex: 'email',
    key: 'email',
    ellipsis: true,
  },
  {
    dataIndex: 'currentCourse',
    key: 'currentCourse',
    sorter: true,
    ellipsis: true,
    width: 260,
  },
  {
    dataIndex: 'progressCurrent',
    key: 'progressCurrent',
    ellipsis: true,
    width: 130,
    render: data => (data ? data + '%' : 0),
  },
  {
    dataIndex: 'social',
    key: 'social',
    sorter: true,
    ellipsis: true,
  },
  {
    dataIndex: 'role',
    key: 'role',
    sorter: true,
    ellipsis: true,
    width: 70,
  },
  {
    dataIndex: 'online',
    key: 'online',
    ellipsis: true,
    sorter: true,
    width: 70,
    render: data => <input type="checkbox" readOnly="true" checked={data} />,
  },
  {
    dataIndex: 'createDate',
    key: 'createDate',
    sorter: true,
    ellipsis: true,
    render: date => date,
  },
  {
    key: 'actions',
    width: 190,
    render: (data, record) => <Actions record={record} />,
  },
];
