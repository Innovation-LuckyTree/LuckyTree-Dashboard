import { FC, useState } from "react";
import { mockTransferHistory } from "../../utils/mock";
import { useColumnSearch } from "../../hooks/useColumnSearch";
import dayjs from "dayjs";
import { Table, TableColumnsType, TableProps } from "antd";
import { DateFilterBar } from "../../components/filters/DateFilterBar";

export interface TransferHistory{
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  transactionDate: Date;
  transactedBy: string;
}

export const TransferHistoryPage: FC = () => {
  const { getColumnSearchProps } = useColumnSearch<TransferHistory>();
  const [filteredData, setFilteredData] = useState<TransferHistory[]>(mockTransferHistory);
  
  
  const handleFilter = (filters: {
    type: string;
    dateRange?: [string, string];
  }) => {
    if (filters.type === 'Date Range' && filters.dateRange) {
      const [start, end] = filters.dateRange;
      const result = mockTransferHistory.filter((item) => {
        const drawDate = dayjs(item.transactionDate).startOf('day');
        console.log(start, end, drawDate.isSame(dayjs(start)), drawDate.isSame(dayjs(end)));
        return (
          (drawDate.isAfter(dayjs(start)) || drawDate.isSame(dayjs(start))) &&
          drawDate.isBefore(dayjs(end)) || drawDate.isSame(dayjs(end))
        );
      });
      setFilteredData(result);
    }
  };

  const columns: TableColumnsType<TransferHistory> = [
    {
      title: 'Source Account',
      width:120,
      dataIndex: 'sourceAccount',
      fixed: 'left',
      ...getColumnSearchProps('sourceAccount'),
      sorter: (a, b) => a.sourceAccount.localeCompare(b.sourceAccount)
    },
    {
      title: 'Destination Account',
      width:120,
      dataIndex: 'destinationAccount',
      fixed: 'left',
      ...getColumnSearchProps('destinationAccount'),
      sorter: (a, b) => a.destinationAccount.localeCompare(b.destinationAccount)
    },
    {
      title: 'Amount Sent',
      width:120,
      dataIndex: 'amount',
      ...getColumnSearchProps('amount'),
      sorter: (a, b) =>  a.amount - b.amount
    },
    {
      title: 'Transaction Date',
      width:120,
      dataIndex: 'transactionDate',
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime()
    },
    {
      title: 'Transacted By',
      width:140,
      dataIndex: 'transactedBy'
    },
  ];

  const onChange: TableProps<TransferHistory>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="bg-white p-4 overflow-x-auto">
      <DateFilterBar onFilter={handleFilter}/>
      <Table<TransferHistory> 
        size="small"
        pagination={{ position: ['bottomLeft'] }}
        columns={columns}
        dataSource={filteredData}
        onChange={onChange}
        scroll={{ x: 800 }}
      />
    </div>
  )
}