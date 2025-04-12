import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Button, Card, DatePicker, Divider, Flex, Input, Space, Table, TableColumnsType, TimePicker, Typography } from "antd";
import { FC, Key, useState } from "react";
import { useEditableTable } from "../../../hooks/useEditableTable";
import { fetchMockDrawSchedules } from "../../../utils/mock";
import { cancellationModal, deletionModal } from "../../../utils/helpers";
import dayjs from "dayjs";

export interface DrawScheduleEntity{
    key: Key;
    scheduleName: string;
    cutoffStart: string;
    cutoffEnd: string;
}

export const DrawSchedulesTable: FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const {
    data,
    loading,
    hasChanges,
    handleUpdate,
    handleDelete,
    handleAdd,
    handleCancel,
    handleSave,
  } = useEditableTable<DrawScheduleEntity>({
    rowKey: "key",
    fetchData: fetchMockDrawSchedules,
  });
  
  const handleDeletion = (key:Key) => {
    deletionModal(()=>{handleDelete(key)},"Are you sure you want to delete this draw schedule?");
  }

  const addEmptyEntry = () => {
    let emptyItem: DrawScheduleEntity = {
      key:"newId",
      scheduleName:"",
      cutoffStart: Date.now().toString(),
      cutoffEnd: Date.now().toString()
    }
    handleAdd(emptyItem);
  }
  
  const columns : TableColumnsType<DrawScheduleEntity>= [
    {
      title: "Schedule Name",
      dataIndex: "scheduleName",
      key: "scheduleName",
      render: (value: string, record: DrawScheduleEntity) => (
        <Input
          value={value}
          type="text"
          onChange={(val) => handleUpdate(record.key, "scheduleName", val.target.value || "")}
          style={{ width: 250 }}
        />
      ),
      
    },
    {
      title: "Cut-off Start",
      dataIndex: "cutoffStart",
      key: "cutoffStart",
      render: (value: number, record: DrawScheduleEntity) => (
        <TimePicker
          value={dayjs(value)}
          format="h:mm a"
          onChange={(val) => handleUpdate(record.key, "cutoffStart", val.toString())}
        />
      ),
    },
    {
      title: "Cut-off End",
      dataIndex: "cutoffEnd",
      key: "cutoffEnd",
      render: (value: number, record: DrawScheduleEntity) => (
        <TimePicker
          value={dayjs(value)}
          format="h:mm a"
          onChange={(val) => handleUpdate(record.key, "cutoffEnd", val.toString())}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      align:"center",
      render: (_: any, record: DrawScheduleEntity) => (
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
    <Card size="small" className="w-2xl">
      <Space style={{ marginBottom: 10 }}>
        <Typography.Text strong style={{margin:0, color:"grey"}}>Draw Schedule(s)</Typography.Text>
        <Button size="small" icon={<PlusCircleFilled />} onClick={addEmptyEntry} />
      </Space>
      <Table<DrawScheduleEntity>
        bordered
        rowKey="key"
        size="small"
        pagination={false}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
      {/* ACTIONS */}
      <Flex justify="space-between" style={{marginTop: 10}}>
        <Button
          variant="outlined"
          danger 
          onClick={()=>cancellationModal(handleCancel)}
          disabled={!hasChanges}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={handleSave}
          disabled={!hasChanges}
          className="w-[220px]"
        >
          Save Changes
        </Button>
      </Flex>
    </Card>
  )
}