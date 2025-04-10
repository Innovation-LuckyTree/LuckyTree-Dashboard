import React, { useState } from 'react';
import { DatePicker, Select, Button, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
const { Text } = Typography;

type FilterType = 'Date Range';

interface FilterBarProps {
  onFilter: (filters: {
    type: FilterType;
    dateRange?: [string, string];
  }) => void;
}

export const DateFilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
  const [filterType, setFilterType] = useState<FilterType>('Date Range');
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs(),
    dayjs(),
  ]);

  const handleSearch = () => {
    if (filterType === 'Date Range' && dateRange) {
      onFilter({
        type: filterType,
        dateRange: [
          dateRange[0].format('YYYY-MM-DD'),
          dateRange[1].format('YYYY-MM-DD'),
        ],
      });
    }
  };

  return (
    <Space className='mb-4'>
      <Text>Filter(s):</Text>
      <Select
        value={filterType}
        style={{ width: 140 }}
        onChange={setFilterType}
        options={[{ value: 'Date Range', label: 'Date Range' }]}
      />
      {filterType === 'Date Range' && (
        <RangePicker
          value={dateRange}
          onChange={(dates) => {
            if (dates) setDateRange(dates as [Dayjs, Dayjs]);
          }}
          allowClear={false}
          format="YYYY-MM-DD"
        />
      )}
      <Button icon={<SearchOutlined />} onClick={handleSearch}/>
    </Space>
  );
};