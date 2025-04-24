import { FC, useState } from "react"
import { Dropdown, MenuProps, Table, TableColumnsType, TableProps } from "antd";
import { CheckOutlined, CloseOutlined, ReloadOutlined, ScheduleFilled } from "@ant-design/icons";
import { mockActiveDrawData } from "../../../utils/mock";
import { useColumnSearch } from "../../../shared/hooks/useColumnSearch";
import { PostResultModal } from "./ManualPostResultModal";
import { getGameType } from "../../../utils/helpers";
import { ActiveDraw } from "../models/ActiveDraw";

export const ActiveDrawTable: FC =() => {
  
  const { getColumnSearchProps } = useColumnSearch<ActiveDraw>();
  const [openPost, setOpenPost] = useState(false);
  const [rowContextMenu, setRowContextMenu] = useState< ActiveDraw>();

  const handleRowContextMenu = (record: ActiveDraw) => (event: React.MouseEvent) => {
    event.preventDefault();
    setRowContextMenu(record);
    console.log(record);
  };

  const closeRowContextMenu = () => setRowContextMenu(undefined);

  const columns: TableColumnsType<ActiveDraw> = [
    {
      title: 'Game Type',
      width:120,
      dataIndex: 'gameType',
      fixed: 'left',
      filters: [
        {
          text: '2D',
          value: '2D',
        },
        {
          text: '3D',
          value: '3D',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.gameType.includes(value as string),
    },
    {
      title: 'DrawDate',
      width:120,
      dataIndex: 'drawDate',
      fixed: 'left',
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime()
    },
    {
      title: 'DrawSchedule',
      width:150,
      dataIndex: 'drawSchedule',
      fixed: 'left',
      sorter: (a, b) => a.drawSchedule.localeCompare(b.drawSchedule)
    },
    {
      title: 'Cut-off Start',
      width:150,
      dataIndex: 'cutoffStart',
    },
    {
      title: 'Cut-off End',
      width:150,
      dataIndex: 'cutoffEnd',
    },
    {
      title: 'Status',
      width:150,
      dataIndex: 'statusName',
    },
    {
      title: 'Advance Bet',
      width:150,
      dataIndex: 'allowAdvanced',
      render: (text) => text ? <CheckOutlined className="color-red"/> : <CloseOutlined/>,
    },
    {
      title: 'Gross Straight',
      width:170,
      dataIndex: 'grossStraight',
      sorter: (a, b) => a.grossStraight - b.grossStraight,
      ...getColumnSearchProps('grossStraight'),
    },
    {
      title: 'Gross Shuffle',
      width:170,
      dataIndex: 'grossShuffle',
      sorter: (a, b) => a.grossShuffle - b.grossShuffle,
      ...getColumnSearchProps('grossShuffle'),
    },
    {
      title: 'Total Gross',
      width:170,
      dataIndex: 'totalGross',
      sorter: (a, b) => a.totalGross - b.totalGross,
      ...getColumnSearchProps('totalGross'),
    },
  ];

  const openPostModal = () => {
    setOpenPost(true);
  }

  const onChange: TableProps<ActiveDraw>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  
  const refresh: MenuProps['items'] = [
    {
      label: 'Manual Post Result',
      key: '1',
      icon: <ScheduleFilled />
    },
    {
      label: 'Refresh',
      key: '2',
      icon: <ReloadOutlined/>
    },
  ];

  const rowMenu: MenuProps['items'] = [
    {
      label: 'Manual Post Result',
      key: '1',
      icon: <ScheduleFilled />,
      onClick: ()=>{setRowContextMenu(undefined)}
    },
    {
      label: 'Post Result',
      key: '2',
      icon: <ScheduleFilled />
    },
    {
      label: 'Refresh',
      key: '3',
      icon: <ReloadOutlined/>
    },
  ];

  return (
    <>
      <Dropdown menu={{items:rowContextMenu ? rowMenu :refresh, onClick:openPostModal}} trigger={['contextMenu']}>
        <div className="bg-white p-4 overflow-x-auto" 
          onContextMenu={(e) => {
            if (!(e.target as HTMLElement).closest('.ant-table-row')) {
              e.preventDefault();
              setRowContextMenu(undefined);
            }
          }}
          onClick={closeRowContextMenu}
        >
          <Table<ActiveDraw> 
            size="small"
            pagination={{ position: ['bottomLeft'] }}
            columns={columns}
            dataSource={mockActiveDrawData}
            onChange={onChange}
            scroll={{ x: 1500 }}
            onRow={(record) => ({
              onContextMenu: handleRowContextMenu(record),
            })}
          />
        </div>
      </Dropdown>
      {openPost &&
        <PostResultModal open={openPost} onClose={()=>setOpenPost(false)} gameType={rowContextMenu?getGameType(rowContextMenu?.gameType):undefined}/>
      }
    </>
  )
}