import React, { useState } from "react";
import { Box, Radio, Stack, RadioGroup } from "@chakra-ui/react";

import Form from "../form/Form";

export default function Card() {
  const [declarer, setDeclarer] = useState("patient");

  const options = [
    { value: "patient", name: "Bệnh nhân/Người nhà" },
    { value: "staff", name: "Nhân viên bệnh viện" },
    { value: "guest", name: "Khách đến liên hệ công tác" },
    { value: "vaccination", name: "Tiêm chủng vắc xin" },
    { value: "test", name: "Xét nghiệm Covid-19" },
    { value: "monitoring", name: "Theo dõi sức khỏe tại nhà" },
  ];

  return (
    <div>
      <Box
        w="100%"
        padding="0.75rem"
        marginTop="0.75rem"
        display="flex"
        flexDirection="column"
        border="1px"
        borderColor="#e7eaed"
        borderRadius="0.25rem"
        boxShadow="0 0.75rem 6rem rgb(56 65 74 / 3%)"
      >
        <Box>
          <RadioGroup onChange={setDeclarer} value={declarer}>
            <Stack direction="row">
              {options.map((option) => {
                return (
                  <Radio key={option.value} value={option.value}>
                    {option.name}
                  </Radio>
                );
              })}
            </Stack>
          </RadioGroup>
        </Box>

        <Box marginTop="0.375rem">
          <Form declarer={declarer} />
        </Box>
      </Box>
    </div>
  );
}
