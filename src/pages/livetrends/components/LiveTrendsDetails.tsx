import { Card, Divider, Flex } from "antd";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { mockLiveTrends } from "../../../utils/mock";
import { PlayerStatisticChart } from "./PlayerStatisticChart";
import { TopCombinationsTable } from "./TopCombinationsTable";
import { LiveTrends } from "../models/LiveTrends";

export const LiveTrendsDetails : FC = () => {
  const [now, setNow] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<LiveTrends>();

  useEffect(() => {
    mockLiveTrends().then((res) => {
      setData(res);
    });
    const interval = setInterval(() => {
      setNow(new Date());
      setIsOpen(data?(data.cutoff < now): false);
    }, 1000);

    return () => {
      interval.close;
    }
  },[]);

  return (
      <Flex vertical>
        <div className="relative">

          {/* CUTOFF AND BET STATUS */}
          <Flex vertical align="center">
            <h2 className="font-bold text-lg">CUTOFF TIME: Mar 24,2025(04:56 PM)</h2>
            <h2 className="font-bold text-lg">{dayjs(now).format('ddd MMM DD, YYYY hh:mm:ss A')}</h2>
          </Flex>
          { isOpen ? 
            <span className="bg-(--green-light) text-white text-4xl font-bold px-4 py-2 rounded-lg absolute right-0 top-0">BET OPEN</span>
            :
            <span className="bg-(--red-warn) text-white text-4xl font-bold px-4 py-2 rounded-lg absolute  right-0 top-0">BET CLOSE</span>
          }

          {/* GROSS CARDS */}
          <Flex gap={8} style={{marginTop:12}}>
            <Card size="small" className="w-[calc(25%_-_8px)]">
              <Divider orientation="left" orientationMargin={0} style={{margin:0, color:"grey"}}>TOTAL IN</Divider>
              <h2 className="m-auto text-center font-bold text-4xl">{data?.totalIn}</h2>
            </Card>
            <Card size="small" className="w-[calc(25%_-_8px)]">
              <Divider orientation="left" orientationMargin={0} style={{margin:0, color:"grey"}}>STRAIGHT</Divider>
              <h2 className="m-auto text-center font-bold text-4xl">{data?.straight}</h2>
            </Card>
            <Card size="small" className="w-[calc(25%_-_8px)]">
              <Divider orientation="left" orientationMargin={0} style={{margin:0, color:"grey"}}>RUMBLE</Divider>
              <h2 className="m-auto text-center font-bold text-4xl">{data?.rumble}</h2>
            </Card>
            <Card size="small" className="w-[calc(25%_-_8px)]">
              <Divider orientation="left" orientationMargin={0} style={{margin:0, color:"grey"}}>TOTAL BET</Divider>
              <h2 className="m-auto text-center font-bold text-4xl">{data?.totalBet}</h2>
            </Card>
          </Flex>

          {/* STATISTICS AND TOP 10 COMBINATION */}
          <Flex gap={8} style={{marginTop:12}}>
            <PlayerStatisticChart/>
            <TopCombinationsTable/>
          </Flex>
        </div>
      </Flex>
  )
}