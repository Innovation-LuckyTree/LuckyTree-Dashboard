import { FC, useState } from "react";
import { GameType } from "../../../utils/consts";
import { Button, Card, Checkbox, Divider, Flex, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { cancellationModal, updateModal } from "../../../utils/helpers";

export const AppSettings: FC<{game:GameType}> = ({game}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<GameType>(game);
  const [originalData, setOriginalData] = useState<GameType>(game);

  const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);

  const handleUpdate = <K extends keyof GameType>( field: K, value: GameType[K]) => {
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
    <Form form={form} layout="vertical" initialValues={game}>
      <Card size="small" className="w-lg">
        <Flex vertical gap={5}>
          <Divider orientation="left" orientationMargin={0} style={{margin:0, color:"grey"}}>App Details</Divider>
          <Form.Item label="Title" required style={{marginBottom:0}} name="label">
            <Input
              onChange={(val) => handleUpdate("label",val.target.value)}
              />
          </Form.Item>
          <Form.Item label="Long Description" style={{marginBottom:0}} name="description">
            <TextArea
              rows={3}
              onChange={(val) => handleUpdate("description",val.target.value)}
              />
          </Form.Item>
          <Form.Item name="isPlayable"  valuePropName="checked">
            <Checkbox
              onChange={(val) => handleUpdate("isPlayable",val.target.checked)}
            >
              <Flex vertical >
                <p className="leading-none">Playable Game</p>
                <small>(if checked, will appear on play list)</small>
              </Flex>
            </Checkbox>
          </Form.Item>
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
              onClick={()=>updateModal(handleSave)}
              disabled={!hasChanges}
              className="w-[220px]"
            >
              Save Changes
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Form>
  );
}