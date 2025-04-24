import { FC, useState } from "react";
import { mockTransferHistory } from "../../utils/mock";
import { useColumnSearch } from "../../shared/hooks/useColumnSearch";
import dayjs from "dayjs";
import { Dropdown, MenuProps, Table, TableColumnsType, TableProps } from "antd";
import { ReloadOutlined, SwapRightOutlined } from "@ant-design/icons";
import { DateFilterBar } from "../../shared/components/filters/DateFilterBar";
import { TransferHistory } from "./models/TransferHistory";

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

  const refresh: MenuProps['items'] = [
    {
      label: 'Transfer Credit',
      key: '1',
      icon: <SwapRightOutlined/>
    },
    {
      label: 'Refresh',
      key: '2',
      icon: <ReloadOutlined/>
    },
  ];
  
  return (
    <div className="bg-white p-4 overflow-x-auto">
      <DateFilterBar onFilter={handleFilter}/>
      <Dropdown menu={{items:refresh}} trigger={['contextMenu']}>
        <div>
          <Table<TransferHistory> 
            size="small"
            pagination={{ position: ['bottomLeft'] }}
            columns={columns}
            dataSource={filteredData}
            onChange={onChange}
            scroll={{ x: 800 }}
          />
        </div>
      </Dropdown>
    </div>
  )
}