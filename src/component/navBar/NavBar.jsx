import React from "react";

import { Wrap, WrapItem, Heading, Image, Flex } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import logo from "../../asset/Logo_BoYTe.png";

export default function NavBar() {
  return (
    <div>
      <Flex
        display="flex"
        bg="#0056c1"
        w="100%"
        p="0 123px"
        h="60px"
        color="white"
        alignItems="center"
        justifyContent="space-between"
      >
        <WrapItem display="flex" alignItems="center" mmaxWidth="100%" w="auto">
          <Image src={logo} w="45px" h="45px" alt="Dan Abramov" />
          <Heading
            as="h2"
            fontWeight="700"
            lineHeight="1.7px"
            fontSize="1.125rem"
            ml="15px"
          >
            KHAI BÁO Y TẾ ĐIỆN TỬ TẠI BỆNH VIỆN
          </Heading>
        </WrapItem>

        <WrapItem
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <HamburgerIcon w={35} h={35} />
        </WrapItem>
      </Flex>
    </div>
  );
}
