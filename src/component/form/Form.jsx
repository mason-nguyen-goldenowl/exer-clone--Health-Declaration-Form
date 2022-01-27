import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";

import declarationPlaces from "../../data/ DeclarationPlace.json";
import {
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";

import "./Form.scss";

import axios from "axios";

export default function Form(props) {
  registerLocale("vi", vi);
  const [startDate, setStartDate] = useState(new Date());
  const [provinces, setProvinces] = useState([]);
  const [provinceClick, setProvinceClick] = useState("");
  const [districtClick, setDistrictClick] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };
  const renderProvince = () => {
    return provinces.map((province) => {
      return (
        <option key={province.codename} value={province.name}>
          {province.name}
        </option>
      );
    });
  };
  console.log(props.declarer);
  const renderDistricts = () => {
    let Province = provinces.find(
      (province) => province.name === provinceClick
    );

    return Province?.districts.map((district) => {
      return (
        <option key={district.codename} value={district.name}>
          {district.name}
        </option>
      );
    });
  };
  const renderWards = () => {
    let Province = provinces.find(
      (province) => province.name === provinceClick
    );

    let District = Province?.districts.find(
      (district) => district.name === districtClick
    );

    return District?.wards.map((ward) => {
      return (
        <option key={ward.codename} value={ward.name}>
          {ward.name}
        </option>
      );
    });
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "https://provinces.open-api.vn/api/?depth=3",
    }).then(function (response) {
      setProvinces(response.data);
    });
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.declarationPlaces}>
          <FormLabel htmlFor="declarationPlace">
            Nơi khai báo <span style={{ color: "red" }}>(*)</span>:
          </FormLabel>
          <Select
            id="declarationPlace"
            placeholder="Nhập và chọn nơi khai báo"
            {...register("declarationPlace", {
              required: true,
            })}
          >
            {declarationPlaces.places.map((place) => {
              return (
                <option key={place} value={place}>
                  {place}
                </option>
              );
            })}
          </Select>
          <FormErrorMessage>
            {errors.declarationPlaces && errors.declarationPlaces.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.phoneNumber} marginTop="10px">
          <FormLabel htmlFor="phoneNumber">
            Số điện thoại <span style={{ color: "red" }}>(*)</span> :
          </FormLabel>
          <Input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            {...register("phoneNumber", {
              required: "Vui lòng nhập số điện thọai",
              minLength: {
                value: 10,
                message: "Số điện thoại tối thiểu 10 ký tự",
              },
            })}
          ></Input>

          <FormErrorMessage>
            {errors.phoneNumber && errors.phoneNumber.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.fullName} marginTop="10px">
          <FormLabel htmlFor="fullName">
            Họ và tên <span style={{ color: "red" }}>(*)</span>:
          </FormLabel>
          <Input
            name="fullName"
            id="fullName"
            placeholder="Họ và tên"
            {...register("fullName", {
              required: "Vui lòng nhập họ và tên",
            })}
          ></Input>

          <FormErrorMessage>
            {errors.fullName && errors.fullName.message}
          </FormErrorMessage>
        </FormControl>

        <Box display="flex">
          <FormControl
            isInvalid={errors.birthDay}
            marginTop="10px"
            marginRight="25px"
          >
            <FormLabel htmlFor="birthDay">
              Ngày sinh <span style={{ color: "red" }}>(*)</span>:
            </FormLabel>
            <DatePicker
              locale="vi"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </FormControl>

          <FormControl isInvalid={errors.gender} marginTop="10px">
            <FormLabel htmlFor="gender">
              Giới tính <span style={{ color: "red" }}>(*)</span>:
            </FormLabel>
            <Select
              id="gender"
              {...register("gender", {
                required: true,
              })}
            >
              <option value="male">Nam</option>
              <option value="Fmale">Nữ</option>
              <option value="other">Giới tính khác</option>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" marginTop="10px" flex-wrap="wrap" gap="15px">
          <FormControl isInvalid={errors.nation} width="100%">
            <FormLabel htmlFor="nation">
              Quốc tịch <span style={{ color: "red" }}>(*)</span>:
            </FormLabel>
            <Select
              id="nation"
              {...register("nation", {
                required: true,
              })}
            >
              <option value="Viêt Nam">Viêt Nam</option>
            </Select>
            <FormErrorMessage>
              {errors.nation && errors.nation.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.provinces}>
            <FormLabel htmlFor="provinces">
              Tỉnh thành <span style={{ color: "red" }}>(*)</span>:
            </FormLabel>
            <Select
              id="province"
              {...register("province", {
                required: true,
              })}
              onChange={(e) => {
                setProvinceClick(e.target.value);
              }}
            >
              {renderProvince()}
            </Select>
            <FormErrorMessage>
              {errors.provinces && errors.provinces.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.districts}>
            <FormLabel htmlFor="districts">
              Quận huyện <span style={{ color: "red" }}>(*)</span>:
            </FormLabel>
            <Select
              id="district"
              {...register("district", {
                required: true,
              })}
              onChange={(e) => {
                setDistrictClick(e.target.value);
              }}
            >
              {renderDistricts()}
            </Select>
            <FormErrorMessage>
              {errors.district && errors.district.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.wards}>
            <FormLabel htmlFor="wards">
              Xã phường <span style={{ color: "red" }}>(*)</span>:
            </FormLabel>
            <Select
              id="ward"
              {...register("ward", {
                required: true,
              })}
            >
              {renderWards()}
            </Select>
            <FormErrorMessage>
              {errors.declarationPlaces && errors.declarationPlaces.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <FormControl isInvalid={errors.address} marginTop="10px">
          <FormLabel htmlFor="address">
            Số nhà, tên đường <span style={{ color: "red" }}>(*)</span>:
          </FormLabel>
          <Input
            name="address"
            id="address"
            placeholder="Số nhà, tên đường"
            {...register("address", {
              required: "Vui lòng nhập số nhà, tên đường",
            })}
          ></Input>

          <FormErrorMessage>
            {errors.address && errors.address.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
