import React, { useState } from 'react';
import { DatePicker, Select, Button, Space, Typography } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { formatLabel } from '../../../utils/helpers';
import { drawOptions } from '../../../utils/mock';

const { RangePicker } = DatePicker;
const { Text } = Typography;

interface FilterBarProps {
  onFilter: (filters: {
    dateRange?: [string, string];
    gameType?: string;
    drawSchedule?: string;
  }) => void;
}

export const GameScheduleFilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs(),
    dayjs(),
  ]);
  const [gameType, setGameType] = useState<| undefined>(undefined);
  const [drawSchedule, setDrawSchedule] = useState<| undefined>(undefined);

  const handleSearch = () => {
      onFilter({
        dateRange: [
          dateRange[0].format('YYYY-MM-DD'),
          dateRange[1].format('YYYY-MM-DD'),
        ],
      });
    
  };

  return (
    <Space style={{ marginBottom: 16 }} align='start'>
      <Text>Filter(s):</Text>
      <Space direction='vertical'>
        <Space>
          <Space.Compact>     
            <Select
              showSearch
              allowClear
              placeholder="Search Game Type"
              style={{ width: 160 }}
              onChange={setGameType}
              value={gameType}
              options={[
                { value: '2D', label: '2D' },
                { value: '3D', label: '3D' },
              ]}
            />
            <Button icon={<ReloadOutlined />} onClick={()=>(setGameType(undefined), setDrawSchedule(undefined))}/>
          </Space.Compact>
          <Space.Compact>
            <Select
                showSearch
                allowClear
                placeholder="Search Draw Schedule"
                style={{ width: 200 }}
                value={drawSchedule}
                onChange={setDrawSchedule}
                filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={drawOptions.map((item) => ({
                label: formatLabel(item),
                value: `${item.gameType}_${item.drawDate}`,
                }))}
                disabled={!gameType}
            />
            <Button icon={<ReloadOutlined />} onClick={()=>{setDrawSchedule(undefined)}} disabled={!gameType}/>
          </Space.Compact>
          <Button icon={<SearchOutlined />} onClick={handleSearch} />
        </Space>
          <RangePicker
            value={dateRange}
            onChange={(dates) => {
              if (dates) setDateRange(dates as [Dayjs, Dayjs]);
            }}
            allowClear={false}
            format="YYYY-MM-DD"
          />
      </Space>
    </Space>
  );
};