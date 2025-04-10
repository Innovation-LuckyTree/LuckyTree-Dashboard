import { Button, Card, Divider, Flex, Form, InputNumber } from "antd";
import { FC, useState } from "react";
import { mockWinningSettingsData } from "../../../utils/mock";


export interface WinningLimitSettingsData {
  id:number;
  winningAmount:number;
  straightLimit:number;
  shuffleLimit:number;
}

export const WinningLimitSettings: FC = () => {
  const [settings, setSettings] = useState<WinningLimitSettingsData>(mockWinningSettingsData);
  const [form] = Form.useForm();
  
  const handleSubmit = (values: any) => {
    console.log(values);
    setSettings(values as WinningLimitSettingsData);
  };

  
  return (
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Card size="small">
          {/* Winnings */}
          <Divider
            orientation="left"
            orientationMargin={0}
            style={{margin:0, color:"grey"}}
            >
              Winnings
          </Divider>
          <Form.Item style={{marginBottom:0}} name="drawDate" label="Winning Amount" >
            <InputNumber defaultValue={settings.winningAmount} value={settings.winningAmount} style={{width:250}}/>
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
            <Form.Item style={{marginBottom:0}} name="drawDate" label="Straight Limit">
              <InputNumber defaultValue={settings.straightLimit} value={settings.straightLimit} style={{width:200}}/>
            </Form.Item>
            <Form.Item style={{marginBottom:0}} name="drawDate" label="Shuffle Limit">
              <InputNumber defaultValue={settings.shuffleLimit} value={settings.shuffleLimit} style={{width:200}}/>
            </Form.Item>
          </Flex>
          {/* Actions */}
          <Flex justify="space-between" style={{marginTop: 10}}>
            <Button
              variant="outlined"
              danger
              >
                Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="w-[220px]"
              >
                Save Changes
            </Button>
          </Flex>
        </Card>
      </Form>
  );
};