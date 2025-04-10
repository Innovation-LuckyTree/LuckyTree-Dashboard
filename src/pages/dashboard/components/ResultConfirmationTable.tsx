import { FC } from "react"
import {  Table, TableColumnsType, TableProps } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { mockResultConfirmationData } from "../../../utils/mock";
import { useColumnSearch } from "../../../hooks/useColumnSearch";

export interface ResultConfirmation {
  key: React.Key;
  gameType: string;
  drawDate: Date;
  drawSchedule: string;
  cutoffStart: string;
  cutoffEnd: string;
  allowAdvanced: boolean;
  statusId: number;
  statusName: string;
  grossStraight: number;
  grossShuffle: number;
  totalGross: number;
  winningsStraight: number;
  winningsShuffle: number;
  totalWinnings: number;
  postedBy: string;
  datePosted: Date;
}

export const ResultConfirmationTable: FC =() => {
  
  const { getColumnSearchProps } = useColumnSearch<ResultConfirmation>();

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

  return (
    <div className="bg-white p-4 overflow-x-auto">
      <Table<ResultConfirmation> 
        pagination={{ position: ['bottomLeft'] }}
        columns={columns}
        dataSource={mockResultConfirmationData}
        onChange={onChange}
        scroll={{ x: 1200 }}
      />
    </div>
  )
}