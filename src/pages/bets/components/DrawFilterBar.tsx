import { FC, useState } from 'react';
import { Select, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { drawOptions } from '../../../utils/mock';
import { formatLabel } from '../../../utils/helpers';

export const DrawFilterBar: FC = () => {
  const [selected, setSelected] = useState<string | undefined>();

  const handleSearch = () => {
    console.log('Searching for:', selected);
  };

  const handleReset = () => {
    setSelected(undefined);
    console.log('Reset filters');
  };

  return (
    <Space className='mb-4'>
      <span>Filter(s):</span>
      <Space.Compact>
        <Select
            showSearch
            allowClear
            placeholder="Search"
            style={{ width: 200 }}
            value={selected}
            onChange={setSelected}
            filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={drawOptions.map((item) => ({
            label: formatLabel(item),
            value: `${item.gameType}_${item.drawDate}`,
            }))}
            className='rounded-r-xs'
        />
        <Button icon={<ReloadOutlined />} onClick={handleReset}/>
      </Space.Compact>
      <Button icon={<SearchOutlined />} onClick={handleSearch}  variant='outlined'/>
    </Space>
  );
};