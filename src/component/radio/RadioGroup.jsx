import { HStack, useRadioGroup, Radio } from "@chakra-ui/react";
import React from "react";
import RadioButton from "./RadioButton";

export default function RadioGroup() {
  const options = [
    { value: "patient", name: "Bệnh nhân/Người nhà" },
    { value: "staff", name: "Nhân viên bệnh viện" },
    { value: "guest", name: "Khách đến liên hệ công tác" },
    { value: "vaccination", name: "Tiêm chủng vắc xin" },
    { value: "test", name: "Xét nghiệm Covid-19" },
    { value: "monitoring", name: "Theo dõi sức khỏe tại nhà" },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    onChange: console.log,
  });

  const group = getRootProps();
  return (
    <HStack {...group}>
      {options.map((option) => {
        const radio = getRadioProps(option.value);
        return (
          <Radio colorScheme="blue" value={option.value} {...radio}>
            {option.name}
          </Radio>
        );
      })}
    </HStack>
  );
}
