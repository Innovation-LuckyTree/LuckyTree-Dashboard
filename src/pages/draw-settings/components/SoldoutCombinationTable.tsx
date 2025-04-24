import { Button, Dropdown, Flex, MenuProps, Space, Table, TableColumnsType, Typography, } from "antd";
import { FC, useState } from "react";
import { mockSoldoutCombinations} from "../../../utils/mock";
import { useEditableTable } from "../../../shared/hooks/useEditableTable";
import { DeleteOutlined, PlusCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { cancellationModal, comboSorter, deletionModal, updateModal } from "../../../utils/helpers";
import { useColumnSearch } from "../../../shared/hooks/useColumnSearch";
import { AddSoldoutCombination } from "./AddSoldoutModal";
import { SoldoutCombination } from "../models/SoldoutCombination";

export const transformSoldoutToEntity = (data: any, digits: number): SoldoutCombination => {
  var keys = []
  for(var i=1; i<=digits;i++){
    keys.push(`combi${i}`);
  }
  const combination = keys
    .map(key => data[key])
    .join('-');

  return {
    id: 9,
    combination
  };
};

export const SoldoutCombinationTable: FC<{digits:number}> = ({digits})  => {
  const {
    data,
    loading,
    hasChanges,
    handleDelete,
    handleAdd,
    handleCancel,
    handleSave,
  } = useEditableTable<SoldoutCombination>({
    rowKey: "id",
    fetchData: mockSoldoutCombinations,
  });
  const { getColumnSearchProps} = useColumnSearch<SoldoutCombination>();
  const [openAddModal, setOpenAddModal] = useState(false);
  
  const handleDeletion = (id:number) => {
    deletionModal(()=>{handleDelete(id)},"Are you sure you want to delete this limit entry?");
  }


  const columns : TableColumnsType<SoldoutCombination>= [
    {
      title: "Combination",
      dataIndex: "combination",
      key: "combination",
      ...getColumnSearchProps("combination"),
      sorter: (a, b) => comboSorter(a.combination, b.combination)
      
    },
    {
      title: "Action",
      key: "action",
      align:"center",
      width:50,
      render: (_: any, record: SoldoutCombination) => (
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
          <Typography.Text strong>Soldout Combinations</Typography.Text>
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
        <Table<SoldoutCombination>
          bordered
          rowKey="key"
          size="small"
          pagination={{position:['bottomLeft'], pageSize: 10}}
          columns={columns}
          dataSource={data}
          loading={loading}
          style={{width: 500}}
        />
        { openAddModal &&
          <AddSoldoutCombination open={openAddModal} digits={digits} onClose={() => setOpenAddModal(false)} onAccept={()=>{handleAdd}}/>
        }
      </Flex>
    </Dropdown>
  );
}