import { Button, Dropdown, Flex, InputNumber, MenuProps, Space, Table, TableColumnsType, Typography, } from "antd";
import { FC, Key, useState } from "react";
import { mockFetchLimitCombinations} from "../../../utils/mock";
import { useEditableTable } from "../../../hooks/useEditableTable";
import { DeleteOutlined, PlusCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { cancellationModal, comboSorter, deletionModal, updateModal } from "../../../utils/helpers";
import { useColumnSearch } from "../../../hooks/useColumnSearch";
import { AddLimitModal } from "./AddLimitModal";

export interface LimitCombinationEntity {
    key: Key;
    combination: string;
    straightLimit: number;
    rumbleLimit: number;
}

export const transformLimitToEntity = (data: any, digits: number): LimitCombinationEntity => {
  var keys = []
  for(var i=1; i<=digits;i++){
    keys.push(`combi${i}`);
  }
  const combination = keys
    .map(key => data[key])
    .join('-');

  return {
    key: 9,
    combination,
    straightLimit: data.straightLimit,
    rumbleLimit: data.rumbleLimit,
  };
};


export const LimitCombinationTable: FC<{digits:number}> = ({digits}) => {
  const {
    data,
    loading,
    hasChanges,
    handleUpdate,
    handleDelete,
    handleAdd,
    handleCancel,
    handleSave,
  } = useEditableTable<LimitCombinationEntity>({
    rowKey: "key",
    fetchData: mockFetchLimitCombinations,
  });
  const { getColumnSearchProps} = useColumnSearch<LimitCombinationEntity>();
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleDeletion = (key:Key) => {
    deletionModal(()=>{handleDelete(key)},"Are you sure you want to delete this limit entry?");
  }

  const columns : TableColumnsType<LimitCombinationEntity>= [
    {
      title: "Combination",
      dataIndex: "combination",
      key: "combination",
      ...getColumnSearchProps("combination"),
      sorter: (a, b) => comboSorter(a.combination, b.combination)
      
    },
    {
      title: "Straight Limit",
      dataIndex: "straightLimit",
      key: "straightLimit",
      render: (value: number, record: LimitCombinationEntity) => (
        <InputNumber
          value={value}
          min={0}
          onChange={(val) => handleUpdate(record.key, "straightLimit", val ||0)}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
          style={{ width: 150 }}
        />
      ),
    },
    {
      title: "Rumble Limit",
      dataIndex: "rumbleLimit",
      key: "rumbleLimit",
      render: (value: number, record: LimitCombinationEntity) => (
        <InputNumber
          value={value}
          min={0}
          onChange={(val) => handleUpdate(record.key, "rumbleLimit", val ||0)}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
          style={{ width: 150 }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      align:"center",
      render: (_: any, record: LimitCombinationEntity) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDeletion(record.key)}
        />
      ),
    },
  ];
  
  const refresh: MenuProps['items'] = [
    {
      label: 'Refresh',
      key: '1',
      icon: <ReloadOutlined/>
    },
  ];
  
    
  return (
    <Dropdown menu={{items:refresh}} trigger={['contextMenu']}>
      <Flex vertical>
        <Flex justify="space-between" style={{ marginBottom: 10 }}>
          <Space>
          <Typography.Text strong>Limit Combinations</Typography.Text>
          <Button size="small" icon={<PlusCircleFilled />} onClick={()=>{setOpenAddModal(true)}} />
          </Space>
          <Space style={{ gap: 5 }}>
            <Button size="small" onClick={()=>cancellationModal(handleCancel)} disabled={!hasChanges}>
              Cancel
            </Button>
            <Button size="small" type="primary" onClick={()=>updateModal(handleSave)} disabled={!hasChanges}>
              Save Changes
            </Button>
        </Space>
        </Flex>
        <Table<LimitCombinationEntity>
          bordered
          rowKey="key"
          size="small"
          pagination={{position:['bottomLeft'], pageSize: 10}}
          columns={columns}
          dataSource={data}
          loading={loading}
        />
        { openAddModal &&
          <AddLimitModal open={openAddModal} digits={digits} onClose={() => setOpenAddModal(false)} onAccept={handleAdd}/>
        }
      </Flex>
    </Dropdown>
  );
}