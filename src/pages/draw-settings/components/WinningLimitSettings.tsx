import { Button, Card, Divider, Flex, Form, InputNumber, message } from "antd";
import { FC, useState } from "react";
import { mockWinningSettingsData } from "../../../utils/mock";
import { cancellationModal, safeNumber, updateModal } from "../../../utils/helpers";


export interface WinningLimitSettingsData {
  id:number;
  winningAmount:number;
  straightLimit:number;
  rumbleLimit:number;
}

export const WinningLimitSettings: FC = () => {
  const [data, setData] = useState<WinningLimitSettingsData>(mockWinningSettingsData);
  const [originalData, setOriginalData] = useState<WinningLimitSettingsData>(mockWinningSettingsData);
  const [form] = Form.useForm();
  
  const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);

  const handleUpdate = <K extends keyof WinningLimitSettingsData>( field: K, value: WinningLimitSettingsData[K]) => {
    setData((prev) => ({...prev, [field]: value, }));
  };

  const handleCancel = () => {
    setData(JSON.parse(JSON.stringify(originalData)));
    form.setFieldsValue(originalData);
    message.info("Changes have been reset");
  };

  const handleSave = () => {
    setOriginalData(JSON.parse(JSON.stringify(data)));
    message.success("Changes saved successfully");
  };

  
  return (
      <Form form={form} layout="vertical" initialValues={data}>
        <Card size="small">
          {/* Winnings */}
          <Divider
            orientation="left"
            orientationMargin={0}
            style={{margin:0, color:"grey"}}
            >
              Winnings
          </Divider>
          <Form.Item style={{marginBottom:0}} name="winningAmount" label="Winning Amount" >
            <InputNumber
              onChange={(val) => handleUpdate("winningAmount", safeNumber(val))}
              style={{width:250}}
            />
          </Form.Item>
          {/* LIMITS */}
          <Divider
            orientation="left"
            orientationMargin={0}
            style={{margin:0, color:"grey"}}
            >
              Limits
          </Divider>
          <Flex gap={5}>
            <Form.Item style={{marginBottom:0}} name="straightLimit" label="Straight Limit">
              <InputNumber
              onChange={(val) => handleUpdate("straightLimit", safeNumber(val))}
                style={{width:200}}
              />
            </Form.Item>
            <Form.Item style={{marginBottom:0}} name="rumbleLimit" label="rumble Limit">
              <InputNumber
              onChange={(val) => handleUpdate("rumbleLimit", safeNumber(val))}
                style={{width:200}}
              />
            </Form.Item>
          </Flex>
          {/* Actions */}
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
              onClick={()=>updateModal(handleSave)}
              disabled={!hasChanges}
              className="w-[220px]"
              >
                Save Changes
            </Button>
          </Flex>
        </Card>
      </Form>
  );
};