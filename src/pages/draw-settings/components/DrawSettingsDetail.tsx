import { Button, Card, Checkbox, DatePicker, DatePickerProps, Divider, Flex, Form, Table, TableColumnsType, Typography } from "antd";
import { DRAWSCHEDULES } from "../../../utils/consts";
import { FC, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const { Text } = Typography;

export interface DrawScheduleDetail{
  drawScheduleId:number;
  drawSchedule:string;
  currentDraw:boolean;
  advanced:boolean;
}

export const DrawSettingsDetail: FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawDate, setDrawDate] = useState<Dayjs>(dayjs());
  const [form] = Form.useForm();
  
  const onChange: DatePickerProps['onChange'] = (dates) => {
      if (dates) setDrawDate(dates);
    };
  
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const columns: TableColumnsType<DrawScheduleDetail> = [
    {
      title: 'Draw Schedules',
      align: 'center',
      width:150,
      dataIndex: 'drawSchedule',
    },
    {
      title: 'Current Draw',
      align: 'center',
      width:150,
      dataIndex: 'currentDraw',
      render: (_: any, draw: DrawScheduleDetail) => (
        <Checkbox 
          defaultChecked={draw.currentDraw}
          checked={draw.drawScheduleId === selectedId}
          onChange={() => setSelectedId(draw.drawScheduleId)}
        />
      ),
    },
    {
      title: 'Advance Bet',
      align: 'center',
      width:150,
      dataIndex: 'advanced',
      render: (_: any, draw: DrawScheduleDetail) => (
        <Checkbox 
          indeterminate={selectedId != null ? (draw.drawScheduleId <= selectedId):false}
          checked={selectedId != null ? (draw.drawScheduleId > selectedId):false}
          onChange={() => setSelectedId(draw.drawScheduleId)}
        />
      ),
    },
  ];
  
  return (
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Card size="small">
          <Divider orientation="left" orientationMargin={0} style={{margin:0, color:"grey"}}>Draw Details</Divider>
          <Text>Draw Date</Text>
          <Form.Item name="drawDate">
            <DatePicker
              onChange={onChange}
              className="w-3xs"
              value={drawDate}
              defaultValue={drawDate}
            />
          </Form.Item>
          <Table<DrawScheduleDetail> 
            size="small"
            columns={columns}
            dataSource={DRAWSCHEDULES}
            pagination={false}
          />
          {/* ACTIONS */}
          <Flex justify="space-between" style={{marginTop: 10}}>
            <Button
              variant="outlined"
              danger
              disabled={selectedId === null}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled={selectedId === null}
              className="w-[220px]"
            >
              Save Changes
            </Button>
          </Flex>
        </Card>
      </Form>
  );
};