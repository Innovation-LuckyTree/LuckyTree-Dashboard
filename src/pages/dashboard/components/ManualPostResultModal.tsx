import { Button, DatePicker, Divider, Flex, Form, Input, InputRef, Modal, Select, Space } from "antd"
import { FC, JSX, useEffect, useRef, useState } from "react"
import { cancellationModal, formatLabel} from "../../../utils/helpers";
import {  GameType } from "../../../utils/consts";
import { PlusCircleOutlined, ReloadOutlined} from "@ant-design/icons";
import { drawOptions, mockFetchGameTypes } from "../../../utils/mock";
import dayjs, { Dayjs } from "dayjs";
import { PostResultPayload } from "../models/requests";
import { DrawSchedule } from "../../game-configurations/models/DrawSchedule";

export interface PostResultModalProps {
  open: boolean;
  gameType: GameType | undefined;
  onClose: () => void;
}

export const transformResultToPayload = (data: any, digits: number): PostResultPayload => {
  var keys = []
  for(var i=1; i<=digits;i++){
    keys.push(`combi${i}`);
  }
  const combination = keys.map(key => data[key]).join('-');

  return {
    gameTypeId: data.gameTypeId,
    result:combination,
    ...data
  };
};

export const PostResultModal: FC<PostResultModalProps> =  (props) => {
  const [form] = Form.useForm();
  const [isEmpty, setIsEmpty] = useState(true);
  const [selectedGame, setSelectedGame] = useState<GameType | undefined>();
  const [drawSchedule, setDrawSchedule] = useState<DrawSchedule | undefined>();
  const [gameTypes, setGameTypes] = useState<GameType[]>();
  const inputRefs = useRef<(InputRef | null)[]>([]);
  const [dateRange, setDateRange] = useState<Dayjs>(dayjs());

  const checkIfEmpty = () => {
    const values = form.getFieldsValue();
    const hasValue = Object.values(values).some(val => val !== undefined && val !== '');
    setIsEmpty(!hasValue);
  };

  const onCheck = async () =>{
    try{
      const values = await form.validateFields();
      let newItem: PostResultPayload = transformResultToPayload(values,(selectedGame?.digits??3));
      console.log(newItem);
      props.onClose();
    } catch(errorInfo){

    }
  }

  const numberFields: () => JSX.Element[] = () =>{
    var inputFields = []
    for(var i=1; i <= (selectedGame?.digits??3);i++ ){
      let index = i;
      inputFields.push(
        <Form.Item
          className="flex-1 new-required"
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

  const refreshGameTypes = async () => {
    mockFetchGameTypes().then((res)=>{
        setGameTypes(res);
    })
  }

  useEffect(()=>{
    refreshGameTypes();
    if(props.gameType){
      setSelectedGame(props.gameType);
    }
  },[])

  return(
    <Modal
      open={props.open}
      onOk={onCheck}
      onCancel={handleCancellation}
      cancelButtonProps={{style:{display:'none'}}}
      title={<span className="flex items-center gap-1"><PlusCircleOutlined/>{props.gameType?"":"Manual "}Post Result</span>}
      className="centered-button-modal"
      okText="Post Entry"
      okButtonProps={{style:{width:150}, disabled:isEmpty}}
      width={500}
    >
      <Form form={form} layout="vertical" onValuesChange={checkIfEmpty}>
        <Space>
          <Form.Item name="gameType" label="Game Type">
            <Space.Compact>     
              <Select
                showSearch
                allowClear
                placeholder="Search Game Type"
                style={{ width: 160 }}
                value={selectedGame}
                onChange={(val)=>setSelectedGame(val)}
                options={gameTypes?.map((item) => ({
                  label: item.label,
                  value: item.label,
                  }))}
              />
              <Button icon={<ReloadOutlined />} onClick={refreshGameTypes}/>
            </Space.Compact>
          </Form.Item>
        </Space>
        <Flex gap={5}>
          <Form.Item name ="drawDate"  label="Draw Date" className="flex-1">
            <DatePicker
              value={dateRange}
              onChange={(dates) => {
                if (dates) setDateRange(dates);
              }}
              allowClear={false}
              format="YYYY-MM-DD"
              style={{width:"100%"}}
              />
          </Form.Item>
          <Form.Item name ="schedule" label="Draw Schedule">
            <Space.Compact>
            <Select
                showSearch
                allowClear
                placeholder="Search Draw Schedule"
                style={{ width: 200 }}
                value={drawSchedule}
                onChange={setDrawSchedule}
                filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={drawOptions.map((item) => ({
                label: formatLabel(item),
                value: `${item.gameType}_${item.drawDate}`,
                }))}
                disabled={!selectedGame}
            />
            <Button icon={<ReloadOutlined />} onClick={()=>{setDrawSchedule(undefined)}} disabled={!selectedGame}/>
            </Space.Compact>
          </Form.Item>
        </Flex>
      <Flex vertical gap={5}>
        {/* COMBINATION */}
        <Divider className="required" orientation="left" orientationMargin={0} style={{margin:0, color:"grey"}}>Result Combination</Divider>
        <Flex gap={5}>
          {numberFields()}
        </Flex>
      </Flex>
      </Form>
    </Modal>
  )
}