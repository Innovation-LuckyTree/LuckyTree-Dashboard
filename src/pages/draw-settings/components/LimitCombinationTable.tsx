import { Button, Dropdown, Flex, InputNumber, MenuProps, Space, Table, TableColumnsType, Typography, } from "antd";
import { FC, useState } from "react";
import { mockFetchLimitCombinations} from "../../../utils/mock";
import { useEditableTable } from "../../../shared/hooks/useEditableTable";
import { DeleteOutlined, PlusCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { cancellationModal, comboSorter, deletionModal, updateModal } from "../../../utils/helpers";
import { useColumnSearch } from "../../../shared/hooks/useColumnSearch";
import { AddLimitModal } from "./AddLimitModal";
import { LimitCombination } from "../models/LimitCombination";

export const transformLimitToEntity = (data: any, digits: number): LimitCombination => {
  var keys = []
  for(var i=1; i<=digits;i++){
    keys.push(`combi${i}`);
  }
  const combination = keys
    .map(key => data[key])
    .join('-');

  return {
    id: 9,
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
  } = useEditableTable<LimitCombination>({
    rowKey: "id",
    fetchData: mockFetchLimitCombinations,
  });
  const { getColumnSearchProps} = useColumnSearch<LimitCombination>();
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleDeletion = (id:number) => {
    deletionModal(()=>{handleDelete(id)},"Are you sure you want to delete this limit entry?");
  }

  const columns : TableColumnsType<LimitCombination>= [
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
      render: (value: number, record: LimitCombination) => (
        <InputNumber
          value={value}
          min={0}
          onChange={(val) => handleUpdate(record.id, "straightLimit", val ||0)}
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
      render: (value: number, record: LimitCombination) => (
        <InputNumber
          value={value}
          min={0}
          onChange={(val) => handleUpdate(record.id, "rumbleLimit", val ||0)}
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
      render: (_: any, record: LimitCombination) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDeletion(record.id)}
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
        <Table<LimitCombination>
          bordered
          rowKey="id"
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