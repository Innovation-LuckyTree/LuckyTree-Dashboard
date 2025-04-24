import { FC, useState } from "react"
import { Table, TableColumnsType, TableProps } from "antd";
import { mockWinningHistoryData } from "../../../utils/mock";
import { useColumnSearch } from "../../../shared/hooks/useColumnSearch";
import dayjs from "dayjs";
import { GameScheduleFilterBar } from "../../../shared/components/filters/GameScheduleFilterBar";
import { WinningHistory } from "../models/WinningHistory";

export const WinningHistoryTable: FC =() => {
  const { getColumnSearchProps } = useColumnSearch<WinningHistory>();
  const [filteredData, setFilteredData] = useState<WinningHistory[]>(mockWinningHistoryData);
  
  const columns: TableColumnsType<WinningHistory> = [
    {
      title: 'Game Type',
      width:120,
      dataIndex: 'gameType',
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
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime()
    },
    {
      title: 'DrawSchedule',
      width:150,
      dataIndex: 'drawSchedule',
      sorter: (a, b) => a.drawSchedule.localeCompare(b.drawSchedule)
    },
    {
      title: 'Account ID',
      width:170,
      dataIndex: 'accountId',
      ...getColumnSearchProps('accountId'),
      sorter: (a, b) => a.accountId - b.accountId,
    },
    {
      title: 'Account Name',
      width:180,
      dataIndex: 'accountName',
      ...getColumnSearchProps('accountName'),
      sorter: (a, b) => a.accountName.localeCompare(b.accountName),
    },
    {
      title: 'Transaction Number',
      width:200,
      dataIndex: 'transactionNumber',
      ...getColumnSearchProps('transactionNumber'),
    },
    {
      title: 'Combination',
      width:150,
      dataIndex: 'combination',
      ...getColumnSearchProps('combination'),
    },
    {
      title: 'Result',
      width:150,
      dataIndex: 'result',
      ...getColumnSearchProps('result'),
    },
    {
      title: 'Bet Straight',
      width:150,
      dataIndex: 'betStraight',
      ...getColumnSearchProps('betStraight'),
      sorter: (a, b) => a.betStraight - b.betStraight,
    },
    {
      title: 'Bet Shuffle',
      width:150,
      dataIndex: 'betShuffle',
      ...getColumnSearchProps('betShuffle'),
      sorter: (a, b) => a.betShuffle - b.betShuffle,
    },
    {
      title: 'Total Bet',
      width:150,
      dataIndex: 'totalBet',
      ...getColumnSearchProps('totalBet'),
      sorter: (a, b) => a.totalBet - b.totalBet,
    },
    {
      title: 'Win Straight',
      width:150,
      dataIndex: 'winStraight',
      ...getColumnSearchProps('winStraight'),
      sorter: (a, b) => a.winStraight - b.winStraight,
    },
    {
      title: 'Win Shuffle',
      width:150,
      dataIndex: 'winShuffle',
      ...getColumnSearchProps('winShuffle'),
      sorter: (a, b) => a.winShuffle - b.winShuffle,
    },
    {
      title: 'Date Posted',
      width:150,
      dataIndex: 'datePosted',
      ...getColumnSearchProps('datePosted'),
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
    },
    {
      title: 'General Coordinator',
      width:200,
      dataIndex: 'generalCoordinator',
      ...getColumnSearchProps('generalCoordinator'),
      sorter: (a, b) => a.generalCoordinator.localeCompare(b.generalCoordinator),
    },
    {
      title: 'Coordinator',
      width:150,
      dataIndex: 'coordinator',
      ...getColumnSearchProps('coordinator'),
      sorter: (a, b) => a.coordinator.localeCompare(b.coordinator),
    }
  ];

  const handleFilter = (filters: {
    dateRange?: [string, string];
    gameType?: string;
    drawSchedule?: string;
  }) => {
    if (filters.dateRange) {
      const [start, end] = filters.dateRange;
      const result = mockWinningHistoryData.filter((item) => {
        const drawDate = dayjs(item.drawDate).startOf('day');
        console.log(start, end, drawDate.isSame(dayjs(start)), drawDate.isSame(dayjs(end)));
        return (
          (drawDate.isAfter(dayjs(start)) || drawDate.isSame(dayjs(start))) &&
          drawDate.isBefore(dayjs(end)) || drawDate.isSame(dayjs(end))
        );
      });
      setFilteredData(result);
    }
  };
  

  const onChange: TableProps<WinningHistory>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="bg-white p-4 overflow-x-auto">
      <GameScheduleFilterBar onFilter={handleFilter}/>
      <Table<WinningHistory> 
        size="small"
        pagination={{ position: ['bottomLeft'] }}
        columns={columns}
        dataSource={filteredData}
        onChange={onChange}
        scroll={{ x: 2600 }}
      />
    </div>
  )
}