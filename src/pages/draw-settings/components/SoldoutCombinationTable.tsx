import { Button, Flex, Space, Table, TableColumnsType, Typography, } from "antd";
import { FC, Key, useState } from "react";
import { mockSoldoutCombinations} from "../../../utils/mock";
import { useEditableTable } from "../../../hooks/useEditableTable";
import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import { cancellationModal, comboSorter, deletionModal, updateModal } from "../../../utils/helpers";
import { useColumnSearch } from "../../../hooks/useColumnSearch";
import { AddSoldoutCombination } from "./AddSoldoutModal";

export interface SoldoutEntity {
    key: Key;
    combination: string;
}

export const transformSoldoutToEntity = (data: any, digits: number): SoldoutEntity => {
  var keys = []
  for(var i=1; i<=digits;i++){
    keys.push(`combi${i}`);
  }
  const combination = keys
    .map(key => data[key])
    .join('-');

  return {
    key: 9,
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
  } = useEditableTable<SoldoutEntity>({
    rowKey: "key",
    fetchData: mockSoldoutCombinations,
  });
  const { getColumnSearchProps} = useColumnSearch<SoldoutEntity>();
  const [openAddModal, setOpenAddModal] = useState(false);
  
  const handleDeletion = (key:Key) => {
    deletionModal(()=>{handleDelete(key)},"Are you sure you want to delete this limit entry?");
  }


  const columns : TableColumnsType<SoldoutEntity>= [
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
      render: (_: any, record: SoldoutEntity) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDeletion(record.key)}
        />
      ),
    },
  ];
    
  return (
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
      <Table<SoldoutEntity>
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
  );
}