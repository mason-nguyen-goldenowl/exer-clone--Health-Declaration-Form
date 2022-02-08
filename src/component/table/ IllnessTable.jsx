import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
} from "@chakra-ui/react";

import { ADD_ILL } from "../../redux/type/FormType";

export default function IllnessTable(props) {
  const dispatch = useDispatch();

  const [illness, setIllness] = useState([
    {
      name: "covid19",
      checked: "No",
      display: "1. Bạn có đang mắc COVID-19 không?",
    },
    {
      name: "nearCovid19",
      checked: "No",
      display:
        "2. Tiếp xúc gần ca nhiễm, ca nghi nhiễm COVID-19 trong vòng 14 ngày qua",
    },
    {
      name: "otherCountry",
      checked: "No",
      display:
        "3. Đi từ quốc gia hoặc vùng lãnh thổ khác trong vòng 14 ngày qua",
    },
    {
      name: "block",
      checked: "No",
      display:
        "4. Bạn có kết thúc cách ly tập trung trong vòng 14 ngày qua không?",
    },
    {
      name: "familyFever",
      checked: "No",
      display:
        "5. Trong vòng 14 ngày qua, trong gia đình/cơ quan bạn có ai sốt hay ho không? ",
    },
    {
      name: "endCovid",
      checked: "No",
      display:
        "6. Bạn đã xuất viện do điều trị COVID-19 trong vòng 14 ngày qua không? ",
    },
  ]);

  const handleChange = (e) => {
    const value = e.target.value;

    let changeSign = illness.find((sign) => sign.name === e.target.name);

    changeSign.checked = value;
    setIllness([...illness]);
  };

  const renderTr = () => {
    return illness.map((ill) => {
      return (
        <Tr key={ill.name}>
          <Td width="90%">
            {ill.display} <span style={{ color: "red" }}> (*)</span>
          </Td>

          <Td width="100%">
            <input
              type="radio"
              name={ill.name}
              value="Yes"
              checked={ill.checked === "Yes"}
              onChange={handleChange}
            ></input>
          </Td>
          <Td width="100%">
            <input
              type="radio"
              name={ill.name}
              value="No"
              checked={ill.checked === "No"}
              onChange={handleChange}
            ></input>
          </Td>
        </Tr>
      );
    });
  };
  useEffect(() => {
    if (props.declarer !== "monitoring") {
      dispatch({
        type: ADD_ILL,
        ill: illness,
      });
    }
  }, [illness]);

  return (
    <Box>
      <Heading size="sm" marginTop="10px" color="#0056c1">
        Trong thời gian vừa qua
        <span style={{ color: "red" }}> (*)</span>:
      </Heading>

      <Table variant="simple" marginTop="10px" colorScheme="telegram">
        <Thead>
          <Tr>
            <Th>
              Yếu tố dịch tễ <span style={{ color: "red" }}> (*)</span>:
            </Th>
            <Th>Có</Th>
            <Th>Không</Th>
          </Tr>
        </Thead>
        <Tbody>{renderTr()}</Tbody>
      </Table>
    </Box>
  );
}
