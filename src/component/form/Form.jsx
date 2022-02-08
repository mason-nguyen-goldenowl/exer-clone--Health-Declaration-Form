import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";

import {
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
  CheckboxGroup,
  Grid,
  Textarea,
} from "@chakra-ui/react";

import IllnessTable from "../table/ IllnessTable";
import Epidemiologicalfactors from "../table/EpidemiologicalFactors";
import { SUBMIT } from "../../redux/type/FormType";

import declarationPlaces from "../../data/ DeclarationPlace.json";

import "./Form.scss";

export default function Form(props) {
  registerLocale("vi", vi);
  const [birthDay, setBirthDay] = useState(new Date());
  const [provinces, setProvinces] = useState([]);
  const [provinceClick, setProvinceClick] = useState("");
  const [districtClick, setDistrictClick] = useState([]);
  const [testCovid, setTestCovid] = useState("no");
  const [placeTest, setPlaceTest] = useState("hospital");
  const [sickness, setSickness] = useState("no");
  const [Molnupiravir, setMolnupiravir] = useState("no");
  const [MolnupiravirList, setMolnupiravirList] = useState([]);
  const [disase, setDisase] = useState([]);
  const [note, setNote] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    values = {
      ...values,
      declarer: props.declarer,
      testCovid: testCovid,
      placeTest: placeTest,
      sickness: sickness,
      molnupiravir: MolnupiravirList,
      disase: disase,
      note: note,
      birthDay: birthDay,
    };

    dispatch({
      type: SUBMIT,
      values,
    });
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

  const renderStaff = () => {
    if (props.declarer === "staff") {
      return (
        <Box>
          <FormControl isInvalid={errors.staffCode} marginTop="10px">
            <FormLabel htmlFor="staffCode">Mã nhân viên:</FormLabel>
            <Input
              name="staffCode"
              id="staffCode"
              placeholder="Mã nhân viên"
              {...register("staffCode", {})}
            ></Input>

            <FormErrorMessage>
              {errors.staffCode && errors.staffCode.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.majors} marginTop="10px">
            <FormLabel htmlFor="majors">Khoa/phòng:</FormLabel>
            <Input
              name="majors"
              id="majors"
              placeholder="Khoa/phòng"
              {...register("majors", {})}
            ></Input>

            <FormErrorMessage>
              {errors.majors && errors.majors.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
      );
    }
  };

  const renderVaccination = () => {
    if (props.declarer === "vaccination" || props.declarer === "test") {
      return (
        <FormControl isInvalid={errors.ID} marginTop="10px">
          <FormLabel htmlFor="ID">
            CMND/CCCD<span style={{ color: "red" }}>(*)</span>:
          </FormLabel>
          <Input
            name="ID"
            id="ID"
            placeholder="Nhập chính xác CMND/CCCD"
            {...register("ID", {
              required: "Vui lòng nhập CMND/CCCD",
            })}
          ></Input>

          <FormErrorMessage>{errors.ID && errors.ID.message}</FormErrorMessage>
        </FormControl>
      );
    }
  };

  const renderCovid = () => {
    if (testCovid === "yes") {
      return (
        <FormControl marginTop="10px">
          <FormLabel htmlFor="covid-test">Nơi xét nghiệm:</FormLabel>
          <RadioGroup onChange={setPlaceTest} value={placeTest}>
            <Stack>
              <Radio value="hospital">Bệnh viện</Radio>
              <Radio value="clinic">Phòng khám tư nhân</Radio>
              <Radio value="blockade-area">Khu phong tỏa</Radio>
              <Radio value="home">Tự làm xét nghiệm tại nhà</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      );
    }
  };

  const renderTest = () => {
    if (props.declarer === "test" || props.declarer === "monitoring") {
      return (
        <Box>
          <FormControl marginTop="10px">
            <FormLabel htmlFor="covid">
              Ông/Bà hiện có mắc Covid-19 hoặc các trường hợp theo dõi sau đây
              không?:
            </FormLabel>
            <RadioGroup onChange={setTestCovid} value={testCovid}>
              <Stack direction="row">
                <Radio value="no">Không</Radio>
                <Radio value="yes">Có</Radio>
                <Radio value="F1">F1</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          {renderCovid()}
        </Box>
      );
    }
  };

  const renderSickness = () => {
    if (sickness === "yes") {
      return (
        <Box>
          <FormControl marginTop="10px">
            <FormLabel htmlFor="sickness">Chọn bệnh nền:</FormLabel>
            <CheckboxGroup onChange={setDisase} value={disase}>
              <Stack>
                <Checkbox value="Thận mạn tính">Thận mạn tính</Checkbox>
                <Checkbox value="Tăng huyết áp">Tăng huyết áp</Checkbox>
                <Checkbox value="Đái tháo đường">Đái tháo đường</Checkbox>
                <Checkbox value="Bệnh phổi tắc nghẽn mạn tính">
                  Bệnh phổi tắc nghẽn mạn tính
                </Checkbox>
                <Checkbox value="Có tình trạng béo phì">
                  Có tình trạng béo phì
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>
          <FormControl isInvalid={errors.otherDisase} marginTop="10px">
            <Input
              name="otherDisase"
              id="otherDisase"
              placeholder="Nhập bệnh khác nếu có"
              {...register("otherDisase", {})}
            ></Input>

            <FormErrorMessage>
              {errors.otherDisase && errors.otherDisase.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
      );
    }
  };

  const renderMolnupiravir = () => {
    if (Molnupiravir === "yes") {
      return (
        <Box>
          <FormControl marginTop="10px">
            <FormLabel htmlFor="sickness">
              Ông/bà có triệu chứng nào hay dấu hiệu sau khi sử dụng thuốc
              Molnupiravir? <span style={{ color: "red" }}>(*)</span>:
            </FormLabel>
            <CheckboxGroup
              onChange={setMolnupiravirList}
              value={MolnupiravirList}
            >
              <Grid
                templateColumns="40% 60%"
                templateRows="repeat(2, 2fr)"
                alignItems="center"
              >
                <Checkbox value="Không">Không</Checkbox>
                <Checkbox value="Nôn">Nôn</Checkbox>

                <Checkbox value="Chóng mặt">Chóng mặt</Checkbox>
                <Checkbox value="Đau bụng">Đau bụng</Checkbox>
                <Checkbox value="Đau tay chân">Đau tay chân</Checkbox>
                <Checkbox value="Buồn nôn">Buồn nôn</Checkbox>
                <Checkbox value="Tê tay chân">Tê tay chân</Checkbox>
                <Checkbox value="Nổi sần ngứa">Nổi sần ngứa</Checkbox>
                <Checkbox value="Đau đầu">Đau đầu</Checkbox>
                <Checkbox value="Đau lưng">Đau lưng</Checkbox>
                <Checkbox value="Sổ mũi">Sổ mũi</Checkbox>
                <Checkbox value="Tiêu chảy">Tiêu chảy</Checkbox>

                <Checkbox value="Yếu liệt tay chân">Yếu liệt tay chân</Checkbox>
                <FormControl
                  marginTop="10px"
                  display="flex"
                  alignItems="center"
                >
                  <FormLabel htmlFor="otherSignal" width="30%">
                    Triệu chứng khác :
                  </FormLabel>
                  <Input
                    name="otherSignal"
                    id="otherSignal"
                    placeholder=""
                    {...register("otherSignalOfMolnupiravir", {})}
                  ></Input>
                  <FormErrorMessage>
                    {errors.otherDisase && errors.otherDisase.message}
                  </FormErrorMessage>
                </FormControl>
              </Grid>
            </CheckboxGroup>
          </FormControl>
        </Box>
      );
    }
  };

  const renderMonitoring = () => {
    if (props.declarer === "monitoring") {
      return (
        <Box>
          <FormControl marginTop="10px">
            <FormLabel htmlFor="sickness">
              Ông/Bà có mắc bệnh nền hay không?:
            </FormLabel>
            <RadioGroup onChange={setSickness} value={sickness}>
              <Stack direction="row">
                <Radio value="no">Không</Radio>
                <Radio value="yes">Có</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          {renderSickness()}
          <FormControl marginTop="10px">
            <FormLabel htmlFor="Molnupiravir">
              Ông/bà có sử dụng thuốc Molnupiravir?:
            </FormLabel>
            <RadioGroup onChange={setMolnupiravir} value={Molnupiravir}>
              <Stack direction="row">
                <Radio value="no">Không</Radio>
                <Radio value="yes">Có</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          {renderMolnupiravir()}
          <Box display="flex" gap="20px">
            <FormControl isInvalid={errors.temperature} marginTop="10px">
              <FormLabel htmlFor="temperature">
                Nhiệt độ cơ thể (ºC) :
              </FormLabel>
              <Input
                name="temperature"
                id="temperature"
                placeholder="VD: 38.5"
                {...register("temperature", {})}
              ></Input>

              <FormErrorMessage>
                {errors.temperature && errors.temperature.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.oxygen} marginTop="10px">
              <FormLabel htmlFor="oxygen">
                Nồng độ oxy trong máu SPO2 (%) :
              </FormLabel>
              <Input
                name="oxygen"
                id="oxygen"
                placeholder="Nhập giá trị từ 30  -> 100"
                {...register("oxygen", {})}
              ></Input>

              <FormErrorMessage>
                {errors.oxygen && errors.oxygen.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
        </Box>
      );
    }
  };

  const handleTextArea = (e) => {
    setNote(e.target.value);
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
              selected={birthDay}
              onChange={(date) => setBirthDay(date)}
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
        {renderStaff()}
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
        {renderVaccination()}
        {renderTest()}
        {renderMonitoring()}
        <Epidemiologicalfactors />
        {props.declarer !== "monitoring" ? (
          <IllnessTable declarer={props.declarer} />
        ) : (
          <Box></Box>
        )}
        <Textarea
          marginTop="10px"
          onChange={handleTextArea}
          placeholder="Vui lòng cung cấp thêm chi tiết thông tin về triệu chứng, dịch tễ, lịch sử di chuyển (Nếu có)"
          size="sm"
        />
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
