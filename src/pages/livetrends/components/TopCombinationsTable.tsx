import { FC, useState } from "react";
import { Card, Table, TableColumnsType } from "antd";
import { fetchMockTop10Combinations } from "../../../utils/mock";
import { TopCombinations } from "../models/TopCombination";

export const TopCombinationsTable: FC = () => {
  const [data, setData] = useState<TopCombinations[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useState(()=> {
    fetchMockTop10Combinations().then((res)=>{
      setData(res);
      setIsLoading(false);
    })
  })

  const columns: TableColumnsType<TopCombinations> = [
    {
      title: 'Combination',
      width:120,
      dataIndex: 'combination',
      align:'center'
    },
    {
      title: 'Count Bets',
      width:120,
      dataIndex: 'countBets',
      align:'center'
    },
    {
      title: 'Total Straight',
      width:120,
      dataIndex: 'totalStraight',
      align:'center'
    },
    {
      title: 'Total Rumble',
      width:140,
      dataIndex: 'totalRumble',
      align:'center'
    },
    {
      title: 'Total Bets',
      width:140,
      dataIndex: 'totalBets',
      align:'center'
    },
  ];

  return (
    <Card size="small" className="w-[calc(75%_-_8px)]">
      <Table<TopCombinations> 
        size="small"
        pagination={{ position: ['bottomLeft'] }}
        columns={columns}
        dataSource={data}
        loading={isLoading}
      />
    </Card>
  )
}