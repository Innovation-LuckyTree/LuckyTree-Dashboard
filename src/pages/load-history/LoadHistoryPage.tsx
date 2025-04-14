import { FC, useState } from "react";
import { mockLoadHistory } from "../../utils/mock";
import { useColumnSearch } from "../../hooks/useColumnSearch";
import dayjs from "dayjs";
import { Dropdown, MenuProps, Table, TableColumnsType, TableProps } from "antd";
import { DateFilterBar } from "../../components/filters/DateFilterBar";
import { DollarCircleOutlined, ReloadOutlined } from "@ant-design/icons";

export interface LoadHistory{
  accountName: string;
  amount: number;
  transactionDate: Date;
  transactedBy: string;
}

export const LoadHistoryPage: FC = () => {
  const { getColumnSearchProps } = useColumnSearch<LoadHistory>();
  const [filteredData, setFilteredData] = useState<LoadHistory[]>(mockLoadHistory);
  
  
  const handleFilter = (filters: {
    type: string;
    dateRange?: [string, string];
  }) => {
    if (filters.type === 'Date Range' && filters.dateRange) {
      const [start, end] = filters.dateRange;
      const result = mockLoadHistory.filter((item) => {
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

  const columns: TableColumnsType<LoadHistory> = [
    {
      title: 'Account Name',
      width:120,
      dataIndex: 'accountName',
      fixed: 'left',
      ...getColumnSearchProps('accountName'),
      sorter: (a, b) => a.accountName.localeCompare(b.accountName)
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

  const onChange: TableProps<LoadHistory>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const refresh: MenuProps['items'] = [
    {
      label: 'Send Credit',
      key: '1',
      icon: <DollarCircleOutlined/>
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
            <Table<LoadHistory> 
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