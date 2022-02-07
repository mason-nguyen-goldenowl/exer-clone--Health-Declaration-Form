import React, { useState } from "react";
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

const Epidemiologicalfactors = () => {
  const [signs, setSign] = useState([
    { name: "fever", checked: "No", display: "Sốt" },
    { name: "cough", checked: "No", display: "Ho" },
    { name: "throat", checked: "No", display: "Đau họng" },
    { name: "taste", checked: "No", display: "Mất vị/Mất mùi" },
    { name: "tired", checked: "No", display: "Cảm giác mệt" },
    { name: "breath", checked: "No", display: "Khó thở" },
    { name: "otherSigns", checked: "No", display: "Triệu chứng/dấu hiệu khác" },
  ]);

  const handleChange = (e) => {
    const value = e.target.value;

    let changeSign = signs.find((sign) => sign.name === e.target.name);

    changeSign.checked = value;
    setSign([...signs]);
  };

  const renderTr = () => {
    return signs.map((sign) => {
      return (
        <Tr key={sign.name}>
          <Td width="100%">
            {sign.display} <span style={{ color: "red" }}> (*)</span>
          </Td>

          <Td>
            <input
              type="radio"
              name={sign.name}
              value="Yes"
              checked={sign.checked === "Yes"}
              onChange={handleChange}
            ></input>
          </Td>
          <Td>
            <input
              type="radio"
              name={sign.name}
              value="No"
              checked={sign.checked === "No"}
              onChange={handleChange}
            ></input>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <Box>
      <Heading size="sm" marginTop="10px" color="#0056c1">
        Trong 14 ngày qua, bạn có thấy những triệu chứng nào sau đây không?
        <span style={{ color: "red" }}> (*)</span>:
      </Heading>

      <Table variant="simple" marginTop="10px" colorScheme="telegram">
        <Thead>
          <Tr>
            <Th>Dấu hiệu</Th>
            <Th>Có</Th>
            <Th>Không</Th>
          </Tr>
        </Thead>
        <Tbody>{renderTr()}</Tbody>
      </Table>
    </Box>
  );
};

export default Epidemiologicalfactors;
