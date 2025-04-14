import { FC, useState } from "react";
import { mockSubscribersList } from "../../utils/mock";
import { useColumnSearch } from "../../hooks/useColumnSearch";
import { Dropdown, MenuProps, Table, TableColumnsType, TableProps } from "antd";
import { formatGender, intlMobileFormat } from "../../utils/helpers";
import { CheckOutlined, CloseOutlined, DollarCircleOutlined, EditOutlined, LockOutlined, ReloadOutlined, UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";

export interface Subscriber{
  accountName: string;
  mobileNumber: string;
  upline: string;
  accountType: string;
  creditBalance: number;
  gender: number | undefined;
  birthDate: Date;
  region: string;
  province: string;
  municipality: string;
  barangay: string;
  completeAddress: string;
  dateRegistered: Date;
  isBlocked: boolean;
}

export const SubscribersPage: FC = () => {
  const { getColumnSearchProps } = useColumnSearch<Subscriber>();
  const [filteredData, setFilteredData] = useState<Subscriber[]>(mockSubscribersList);
  const [rowContextMenu, setRowContextMenu] = useState< Subscriber>();

  const handleRowContextMenu = (record: Subscriber) => (event: React.MouseEvent) => {
    event.preventDefault();
    setRowContextMenu(record);
  };

  const closeRowContextMenu = () => setRowContextMenu(undefined);
  
  

  const columns: TableColumnsType<Subscriber> = [
    {
      title: 'Account Name',
      width:200,
      dataIndex: 'accountName',
      fixed: 'left',
      ...getColumnSearchProps('accountName'),
      sorter: (a, b) => a.accountName.localeCompare(b.accountName)
    },
    {
      title: 'MobileNumber',
      width:160,
      dataIndex: 'mobileNumber',
      ...getColumnSearchProps('mobileNumber'),
      render: (value)=> intlMobileFormat(value)
    },
    {
      title: 'Upline',
      width:160,
      dataIndex: 'upline'
    },
    {
      title: 'Account Type',
      width:160,
      dataIndex: 'accountType'
    },
    {
      title: 'Credit Balance',
      width:160,
      dataIndex: 'creditBalance',
      sorter: (a,b) => a.creditBalance - b.creditBalance
    },
    {
      title: 'Gender',
      width:160,
      dataIndex: 'gender',
      render: (value)=> formatGender(value)
    },
    {
      title: 'Birthdate',
      width:160,
      dataIndex: 'birthDate',
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime()
    },
    {
      title: 'Region',
      width:160,
      dataIndex: 'region',
      sorter: (a, b) => a.region.localeCompare(b.region)
    },
    {
      title: 'Province',
      width:160,
      dataIndex: 'province',
      sorter: (a, b) => a.province.localeCompare(b.province)
    },
    {
      title: 'Municipality',
      width:160,
      dataIndex: 'municipality',
      sorter: (a, b) => a.municipality.localeCompare(b.municipality)
    },
    {
      title: 'Barangay',
      width:160,
      dataIndex: 'barangay',
      sorter: (a, b) => a.barangay.localeCompare(b.barangay)
    },
    {
      title: 'CompleteAddress',
      width:270,
      dataIndex: 'completeAddress',
      sorter: (a, b) => a.completeAddress.localeCompare(b.completeAddress)
    },
    {
      title: 'Date Registered',
      width:160,
      dataIndex: 'dateRegistered',
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.dateRegistered).getTime() - new Date(b.dateRegistered).getTime()
    },
    {
      title: 'Blocked?',
      width:140,
      dataIndex: 'isBlocked',
      render: (text) => text ? <CheckOutlined className="color-red"/> : <CloseOutlined/>,
    },
  ];

  const onChange: TableProps<Subscriber>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const rowMenu: MenuProps['items'] = [
    {
      label: 'Add Subscriber',
      key: '1',
      icon: <UserAddOutlined />,
      onClick: ()=>{setRowContextMenu(undefined)}
    },
    {
      label: 'Modify Subscriber',
      key: '2',
      icon: <EditOutlined />
    },
    {
      label: 'Send Credit',
      key: '3',
      icon: <DollarCircleOutlined/>
    },
    {
      label: 'Change Password',
      key: '4',
      icon: <LockOutlined/>
    },
    {
      label: 'Block Subscriber',
      key: '5',
      icon: <UserDeleteOutlined />
    },
    {
      label: 'Refresh',
      key: '6',
      icon: <ReloadOutlined/>
    },
  ];

  return (
    <>
      <Dropdown menu={{items:rowContextMenu ? rowMenu :[rowMenu[0], rowMenu[5]]}} trigger={['contextMenu']}>
        <div className="bg-white p-4 overflow-x-auto"
          onContextMenu={(e) => {
            if (!(e.target as HTMLElement).closest('.ant-table-row')) {
              e.preventDefault();
              setRowContextMenu(undefined);
            }
          }}
          onClick={closeRowContextMenu}
        >
          <Table<Subscriber> 
            size="small"
            pagination={{ position: ['bottomLeft'] }}
            columns={columns}
            dataSource={filteredData}
            onChange={onChange}
            scroll={{ x: 800 }}
            onRow={(record) => ({
              onContextMenu: handleRowContextMenu(record),
            })}
          />
        </div>
      </Dropdown>
    </>
  )
}