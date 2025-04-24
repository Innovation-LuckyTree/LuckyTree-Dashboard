import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Button, Card,  Flex, Input, Space, Table, TableColumnsType, TimePicker, Typography } from "antd";
import { FC } from "react";
import { useEditableTable } from "../../../shared/hooks/useEditableTable";
import { fetchMockDrawSchedules } from "../../../utils/mock";
import { cancellationModal, deletionModal } from "../../../utils/helpers";
import dayjs from "dayjs";
import { DrawSchedule } from "../models/DrawSchedule";

export const DrawSchedulesTable: FC = () => {
  const {
    data,
    loading,
    hasChanges,
    handleUpdate,
    handleDelete,
    handleAdd,
    handleCancel,
    handleSave,
  } = useEditableTable<DrawSchedule>({
    rowKey: "id",
    fetchData: fetchMockDrawSchedules,
  });
  
  const handleDeletion = (id:number) => {
    deletionModal(()=>{handleDelete(id)},"Are you sure you want to delete this draw schedule?");
  }

  const addEmptyEntry = () => {
    let emptyItem: DrawSchedule = {
      id:10,
      scheduleName:"",
      cutoffStart: Date.now().toString(),
      cutoffEnd: Date.now().toString()
    }
    handleAdd(emptyItem);
  }
  
  const columns : TableColumnsType<DrawSchedule>= [
    {
      title: "Schedule Name",
      dataIndex: "scheduleName",
      key: "scheduleName",
      render: (value: string, record: DrawSchedule) => (
        <Input
          value={value}
          type="text"
          onChange={(val) => handleUpdate(record.id, "scheduleName", val.target.value || "")}
          style={{ width: 250 }}
        />
      ),
      
    },
    {
      title: "Cut-off Start",
      dataIndex: "cutoffStart",
      key: "cutoffStart",
      render: (value: number, record: DrawSchedule) => (
        <TimePicker
          value={dayjs(value)}
          format="h:mm a"
          onChange={(val) => handleUpdate(record.id, "cutoffStart", val.toString())}
        />
      ),
    },
    {
      title: "Cut-off End",
      dataIndex: "cutoffEnd",
      key: "cutoffEnd",
      render: (value: number, record: DrawSchedule) => (
        <TimePicker
          value={dayjs(value)}
          format="h:mm a"
          onChange={(val) => handleUpdate(record.id, "cutoffEnd", val.toString())}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      align:"center",
      render: (_: any, record: DrawSchedule) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDeletion(record.id)}
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
      <Table<DrawSchedule>
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
          onClick={()=>handleSave()}
          disabled={!hasChanges}
          className="w-[220px]"
        >
          Save Changes
        </Button>
      </Flex>
    </Card>
  )
}