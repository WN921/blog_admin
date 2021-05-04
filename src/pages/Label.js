import React, { useState, useEffect } from "react";
import {
  List,
  Row,
  Col,
  Modal,
  message,
  Button,
  Table,
  Tag,
  Space,
  Input,
} from "antd";
import { getLabelList, addLabel, deleteLabel } from "../API/request";
import { Link } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";

function Laebl(props) {
  const [labelList, setLabelList] = useState(null);
  const [inputLabelName, setInputLabelName] = useState("");
  const [inputColor, setInputColor] = useState("");
  useEffect(() => {
    getLabelList()
      .then((res) => {
        //这里需要为每行添加一个key，也就是所在的bodyRow的key。
        res.data.forEach(item => {
          item.key = item.id;
        })
        setLabelList(res.data);
      })
      .catch((err) => {
        message.error("获取标签列表失败");
      });
  }, []);
  const addOneLabel = () => {
    addLabel(inputLabelName, inputColor)
      .then((res) => {
        if (res.errno === 0) {
          message.success("新增标签成功");
        }
      })
      .catch((err) => {});
  };
  const deleteOneLabel = (id) => {
    deleteLabel(id)
      .then((res) => {
        if (res.errno === 0) {
          message.success("删除标签成功");
        }
      })
      .catch((err) => {
        message.error("删除失败");
      });
  };
  const columns = [
    {
      title: "label",
      key: "label",
      dataIndex: "label",
      align: "center",
      render: (text, record, index) => (
  
          <Tag color={record.color} key={record.labelName}>
            {record.labelName}
          </Tag>
      
      ),
    },
    {
      title: "labelName",
      dataIndex: "labelName",
      key: "labelName",
      align: "center",
    },
    {
      title: "color",
      dataIndex: "color",
      key: "color",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record, index) => (
        <Space size="middle" key={record.id}>
          <Button
            onClick={() => {
              deleteOneLabel(record.id);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row
        gutter={32}
        style={{
          marginBottom: "1vh",
        }}
      >
        <Col span={4} offset={4}>
          <Input
            placeholder="labelName"
            value={inputLabelName}
            onChange={(e) => setInputLabelName(e.target.value)}
          />
        </Col>
        <Col span={4}>
          <Input
            placeholder="color"
            value={inputColor}
            onChange={(e) => setInputColor(e.target.value)}
          />
        </Col>
        <Col span={4}>
          <Tag color={inputColor}>{inputLabelName}</Tag>
        </Col>
        <Col span={4}>
          <Button onClick={addOneLabel}>新增</Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={labelList} />
    </>
  );
}

export default Laebl;
