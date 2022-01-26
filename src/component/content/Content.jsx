import React from "react";
import { Text, Box, Heading } from "@chakra-ui/react";
export default function Content() {
  return (
    <div>
      <Box display="flex" justifyContent="center" paddingTop="60px">
        <Box>
          <Box textAlign="center">
            <Heading
              fontSize="18px"
              color="#0056c1"
              marginTop="6px"
              fontWeight={900}
            >
              SỞ Y TẾ TP. HỒ CHÍ MINH
            </Heading>
            <Heading
              fontSize="12px"
              color="red"
              fontWeight="900"
              marginTop="10px"
            >
              KHAI BÁO THÔNG TIN SAI LÀ VI PHẠM PHÁP LUẬT VIỆT NAM VÀ CÓ THỂ XỬ
              LÝ HÌNH SỰ
            </Heading>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
