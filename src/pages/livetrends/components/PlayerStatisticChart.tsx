import { Card, Divider } from "antd";
import { FC, useEffect, useState } from "react";
import { mockPlayerStatistics } from "../../../utils/mock";
import { ProgressBar } from "../../../shared/components/ProgressBar";
import { getPercentage } from "../../../utils/helpers";
import { PlayerStatistics } from "../models/PlayerStatistics";

export const PlayerStatisticChart : FC = () => {
  const [players, setPlayers] = useState<PlayerStatistics>();

  useEffect(() => {
    mockPlayerStatistics().then((res)=>{
      setPlayers(res);
    });
  },[]);

  return (
    <Card size="small" className="w-[calc(25%_-_8px)]">
      <Divider orientation="left" orientationMargin={0} style={{margin:0, color:"grey"}}>PLAYER STATISTIC</Divider>
      {players &&
        <>
          <ProgressBar percentage={getPercentage(players.total, players.total)} amount={players.total} label="Total Players"/>
          <ProgressBar percentage={getPercentage(players.total, players.played)} amount={players.played} label="Played"/>
          <ProgressBar percentage={getPercentage(players.total, players.online)} amount={players.online} label="Player Login"/>
          <ProgressBar percentage={getPercentage(players.total, players.offline)} amount={players.offline} label="Offline Player"/>
          <ProgressBar percentage={getPercentage(players.total, players.newRegistered)} amount={players.newRegistered} label="New Registered Player"/>
        </>
      }
    </Card>
  )
}