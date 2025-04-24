import { FC, useState } from "react"
import {  Dropdown, MenuProps, Table, TableColumnsType, TableProps } from "antd";
import { CheckCircleFilled, CheckOutlined, CloseCircleFilled, CloseOutlined, ReloadOutlined } from "@ant-design/icons";
import { mockResultConfirmationData } from "../../../utils/mock";
import { useColumnSearch } from "../../../shared/hooks/useColumnSearch";
import { ResultConfirmation } from "../models/ResultConfirmation";


export const ResultConfirmationTable: FC =() => {
  
  const { getColumnSearchProps } = useColumnSearch<ResultConfirmation>();
  const [rowContextMenu, setRowContextMenu] = useState< ResultConfirmation>();

  const columns: TableColumnsType<ResultConfirmation> = [
    {
      title: 'Game Type',
      width:120,
      dataIndex: 'gameType',
      fixed: 'left',
      filters: [
        {
          text: '2D',
          value: '2D',
        },
        {
          text: '3D',
          value: '3D',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.gameType.includes(value as string),
    },
    {
      title: 'DrawDate',
      width:120,
      dataIndex: 'drawDate',
      fixed: 'left',
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime()
    },
    {
      title: 'DrawSchedule',
      width:140,
      dataIndex: 'drawSchedule',
      fixed: 'left',
      sorter: (a, b) => a.drawSchedule.localeCompare(b.drawSchedule)
    },
    {
      title: 'Cut-off Start',
      width:150,
      dataIndex: 'cutoffStart',
    },
    {
      title: 'Cut-off End',
      width:150,
      dataIndex: 'cutoffEnd',
    },
    {
      title: 'Status',
      width:150,
      dataIndex: 'statusName',
    },
    {
      title: 'Advance Bet',
      width:150,
      dataIndex: 'allowAdvanced',
      render: (text) => text ? <CheckOutlined className="color-red"/> : <CloseOutlined/>,
    },
    {
      title: 'Gross Straight',
      width:170,
      dataIndex: 'grossStraight',
      sorter: (a, b) => a.grossStraight - b.grossStraight,
      ...getColumnSearchProps('grossStraight'),
    },
    {
      title: 'Gross Shuffle',
      width:170,
      dataIndex: 'grossShuffle',
      sorter: (a, b) => a.grossShuffle - b.grossShuffle,
      ...getColumnSearchProps('grossShuffle'),
    },
    {
      title: 'Total Gross',
      width:170,
      dataIndex: 'totalGross',
      sorter: (a, b) => a.totalGross - b.totalGross,
      ...getColumnSearchProps('totalGross'),
    },
    {
      title: 'Winnings Straight',
      width:190,
      dataIndex: 'winningsStraight',
      sorter: (a, b) => a.winningsStraight - b.winningsStraight,
      ...getColumnSearchProps('winningsStraight'),
    },
    {
      title: 'Winnings Shuffle',
      width:190,
      dataIndex: 'winningsShuffle',
      sorter: (a, b) => a.winningsShuffle - b.winningsShuffle,
      ...getColumnSearchProps('winningsShuffle'),
    },
    {
      title: 'Total Winnings',
      width:170,
      dataIndex: 'totalWinnings',
      sorter: (a, b) => a.totalWinnings - b.totalWinnings,
      ...getColumnSearchProps('totalWinnings'),
    },
    {
      title: 'Posted By',
      width:170,
      dataIndex: 'postedBy',
      sorter: (a, b) => a.postedBy.localeCompare(b.postedBy),
      ...getColumnSearchProps('postedBy'),
    },
    {
      title: 'Date Posted',
      width:170,
      dataIndex: 'datePosted',
      sorter: (a, b) => new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime(),
      ...getColumnSearchProps('datePosted'),
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  const onChange: TableProps<ResultConfirmation>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleRowContextMenu = (record: ResultConfirmation) => (event: React.MouseEvent) => {
    event.preventDefault();
    setRowContextMenu(record);
    console.log(record);
  };

  const closeRowContextMenu = () => setRowContextMenu(undefined);
  
  const refresh: MenuProps['items'] = [
    {
      label: 'Confirm Result',
      key:'1',
      icon:  <CheckCircleFilled style={{ color: 'green' }} />
    },
    {
      label: 'Decline Result',
      key: 'decline',
      icon: <CloseCircleFilled style={{ color: 'red' }} />,
    },
    {
      label: 'Refresh',
      key: '2',
      icon: <ReloadOutlined/>
    },
  ];

  return (
    <Dropdown menu={{items: rowContextMenu?.statusId == 2? refresh : refresh.slice(2)}} trigger={['contextMenu']}>
      <div className="bg-white p-4 overflow-x-auto" 
        onContextMenu={(e) => {
          if (!(e.target as HTMLElement).closest('.ant-table-row')) {
            e.preventDefault();
            setRowContextMenu(undefined);
          }
        }}
        onClick={closeRowContextMenu}
      >
        <Table<ResultConfirmation> 
          size="small"
          pagination={{ position: ['bottomLeft'] }}
          columns={columns}
          dataSource={mockResultConfirmationData}
          onChange={onChange}
          scroll={{ x: 1200 }}
          onRow={(record) => ({
            onContextMenu: handleRowContextMenu(record),
          })}
        />
      </div>
    </Dropdown>
  )
}