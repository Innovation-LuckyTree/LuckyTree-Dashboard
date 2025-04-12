import { Flex, Progress } from "antd";
import { FC } from "react";

interface ProgressBarProps {
  percentage: number,
  amount: number,
  label: string
}

export const ProgressBar: FC<ProgressBarProps> =(props) => {

  return (
      <Flex vertical>
        <Flex justify="space-between">
          <h2 className="font-bold m-0">{props.label}</h2>
          <h2 className="font-bold m-0">{props.amount}</h2>
        </Flex>
        <Progress percent={props.percentage} showInfo={false} status="normal" className=""/>
      </Flex>
  )
}