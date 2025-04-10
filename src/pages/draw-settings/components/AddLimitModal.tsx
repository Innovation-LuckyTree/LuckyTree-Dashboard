import { Divider, Flex, Form, Input, InputNumber, InputRef, Modal } from "antd"
import { FC, JSX, useRef, useState } from "react"
import { cancellationModal } from "../../../utils/helpers";
import { LimitCombinationEntity, transformLimitToEntity } from "./LimitCombinationTable";

export interface AddLimitModalProps {
  open: boolean;
  digits: number;
  onClose: () => void;
  onAccept: (item:LimitCombinationEntity) => void;
}

export const AddLimitModal: FC<AddLimitModalProps> =  (props) => {
  const [form] = Form.useForm();
  const [isEmpty, setIsEmpty] = useState(true);
  const inputRefs = useRef<(InputRef | null)[]>([]);

  const checkIfEmpty = () => {
    const values = form.getFieldsValue();
    const hasValue = Object.values(values).some(val => val !== undefined && val !== '');
    setIsEmpty(!hasValue);
  };

  const onCheck = async () =>{
    try{
      const values = await form.validateFields();
      let newItem: LimitCombinationEntity = transformLimitToEntity(values,props.digits);
      props.onAccept(newItem);
      props.onClose();
    } catch(errorInfo){

    }
  }

  const numberFields: () => JSX.Element[] = () =>{
    var inputFields = []
    for(var i=1; i <= props.digits;i++ ){
      let index = i;
      inputFields.push(
        <Form.Item
          className="flex-1"
          name={`combi${i}`} 
          rules={[{ required: true, message: `Input your digit #${i}` }]}
          style={{ marginBottom: 0}}
          >
            <Input
              ref={(ref) => {
                inputRefs.current[index - 1] = ref;
              }}
              style={{ textAlign: 'center'}}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*" 
              maxLength={1}
              placeholder={`#${i}`}
              onChange={(_) => {
                inputRefs.current[index]?.focus(); 
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !e.currentTarget.value && index > 1) {
                  inputRefs.current[index - 2]?.focus(); 
                }
              }}
              />
          </Form.Item>
      )
    }
    return inputFields;
  }

  const handleCancellation= () =>{
    isEmpty ? props.onClose() : cancellationModal(props.onClose);
  }


  return(
    <Modal
      open={props.open}
      onOk={onCheck}
      onCancel={handleCancellation}
      cancelButtonProps={{style:{display:'none'}}}
      title="Add Limit Combination"
      className="centered-button-modal"
      okText="Add Entry"
      okButtonProps={{style:{width:150}, disabled:isEmpty}}
      width={500}
    >
      <Form form={form} layout="vertical" onValuesChange={checkIfEmpty}>
      <Flex vertical gap={5}>
        {/* COMBINATION */}
        <Divider className="required" orientation="left" orientationMargin={0} style={{margin:0, color:"grey"}}>Combination</Divider>
        <Flex gap={5}>
          {numberFields()}
        </Flex>
        {/* LIMITS */}
        <Divider orientation="left" orientationMargin={0} style={{margin:0, color:"grey"}}>Limits</Divider>
        <Flex gap={5} justify="start">

          <Form.Item
            label="Straight Limit"
            name={`straightLimit`}
            style={{ marginBottom: 0}}
            >
            <InputNumber
              min={0}
              defaultValue={0}
              style={{width:150}}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
          </Form.Item>
          <Form.Item
            label="Rumble Limit"
            name={`rumbleLimit`}
            style={{ marginBottom: 0}}
            >
            <InputNumber
              min={0}
              defaultValue={0}
              style={{width:150}}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
          </Form.Item>
        </Flex>
      </Flex>
      </Form>
    </Modal>
  )
}