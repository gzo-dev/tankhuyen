import {
  Box,
  Input,
  VStack,
  Button,
  Heading,
  Textarea,
  FormLabel,
  Container,
  SimpleGrid,
  FormControl,
  AspectRatio,
  FormErrorMessage,
} from "@chakra-ui/react";

import { get } from "lodash";

import { object, string } from "yup";
import { useToggle } from "react-use";
import { useSnackbar } from "notistack";
import { useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { forwardRef, useCallback } from "react";
import PhoneInput from "react-phone-number-input/input";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";

import { GET_GENERAL_INFO } from "@/queries";
import { Blockcode_Generalinfo } from "@/__generated__/graphql";

import axios from "axios";
import WrapperMainContent from "@/components/WrapperMainContent";

const resolver = yupResolver(
  object().shape({
    full_name: string().required("Trường này không được bỏ trống"),
    email: string()
      .required("Trường này không được bỏ trống")
      .email("Email không đúng định dạng"),
    phone_number: string()
      .required("Trường này không được bỏ trống")
      .test({
        test: (value) => {
          if (!value) return true;

          const phoneNumber = parsePhoneNumber(value);

          if (!phoneNumber) return false;

          if (phoneNumber.country !== "VN") return false;

          if (!isValidPhoneNumber(phoneNumber.number)) return false;

          return true;
        },
        message: "Số điện thoại không đúng định dạng",
      }),
    message: string(),
  })
);

const defaultValues = {
  full_name: "",
  email: "",
  phone_number: "",
  message: "",
};

const Contact = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isLoading, toggleIsLoading] = useToggle(false);

  const { handleSubmit, control, reset } = useForm({
    resolver,
    defaultValues,
  });

  const { enqueueSnackbar } = useSnackbar();

  const { data } = useQuery(GET_GENERAL_INFO);

  const submitHandler: SubmitHandler<{
    message?: string | undefined;
    full_name: string;
    email: string;
    phone_number: string;
  }> = useCallback(
    async (data) => {
      try {
        toggleIsLoading(true);

        await executeRecaptcha?.();

        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
          formData.append(key, value);
        }

        await axios.post(process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT!, formData);

        enqueueSnackbar("Gửi tin nhắn thành công", {
          variant: "success",
        });

        reset(defaultValues, { keepDirty: false });
      } catch (err) {
        const message = get(
          err,
          "response.data.message",
          "Có lỗi xảy ra vui lòng thử lại sau"
        );

        enqueueSnackbar(message, {
          variant: "error",
        });
      } finally {
        toggleIsLoading(false);
      }
    },
    [toggleIsLoading, enqueueSnackbar, reset, executeRecaptcha]
  );

  const generalInfoData = get(data, "blockcodes.nodes[0].generalInfo") as
    | Blockcode_Generalinfo
    | undefined;

  if (generalInfoData == undefined) return null;

  const { map } = generalInfoData;

  return (
    <WrapperMainContent>
      <Container>
        <VStack gap={12}>
          <Heading className="underline">Thông Tin Liên Hệ</Heading>

          <SimpleGrid width="full" columns={{ base: 1, md: 2 }} gap={{ base: 4, lg: 8 }}>
            <Box hideBelow="md">
              <AspectRatio ratio={1 / 1}>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: map!,
                  }}
                />
              </AspectRatio>
            </Box>
            <Box>
              <VStack alignItems="flex-start" gap={8}>
                <Heading size="md">Đăng ký nhận tư vấn</Heading>
                <VStack
                  as="form"
                  width="full"
                  gap={4}
                  alignItems="flex-start"
                  onSubmit={handleSubmit(submitHandler)}
                >
                  <Controller
                    control={control}
                    name="full_name"
                    render={({
                      field: { onChange, ref, value, name },
                      fieldState: { error },
                    }) => {
                      return (
                        <FormControl isRequired isInvalid={!!error}>
                          <FormLabel htmlFor={name}>Tên</FormLabel>
                          <Input
                            id={name}
                            placeholder="Tên"
                            onChange={onChange}
                            ref={ref}
                            value={value}
                          />

                          <FormErrorMessage>{error && error.message}</FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="email"
                    render={({
                      field: { onChange, ref, value, name },
                      fieldState: { error },
                    }) => {
                      return (
                        <FormControl isRequired isInvalid={!!error}>
                          <FormLabel htmlFor={name}>Email</FormLabel>
                          <Input
                            id={name}
                            placeholder="Email"
                            onChange={onChange}
                            ref={ref}
                            value={value}
                          />

                          <FormErrorMessage>{error && error.message}</FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="phone_number"
                    render={({
                      field: { onChange, ref, value, name },
                      fieldState: { error },
                    }) => {
                      return (
                        <PhoneInput
                          error={error}
                          name={name}
                          country="VN"
                          ref={ref}
                          value={value}
                          onChange={onChange}
                          inputComponent={CustomPhoneNumberInput as any}
                        />
                      );
                    }}
                  />

                  <Controller
                    control={control}
                    name="message"
                    render={({
                      field: { onChange, ref, value, name },
                      fieldState: { error },
                    }) => {
                      return (
                        <FormControl isInvalid={!!error}>
                          <FormLabel htmlFor={name}>Tin nhắn</FormLabel>
                          <Textarea
                            id={name}
                            placeholder="Tin nhắn..."
                            onChange={onChange}
                            ref={ref}
                            value={value}
                            resize="vertical"
                            height={80}
                          />

                          <FormErrorMessage>{error && error.message}</FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  />
                  <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                    Gửi tin nhắn
                  </Button>
                </VStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </WrapperMainContent>
  );
};

const CustomPhoneNumberInput = forwardRef<HTMLInputElement, any>(
  function CustomPhoneNumberInput(props, ref) {
    const { name, onChange, value, error } = props;

    return (
      <FormControl isRequired isInvalid={!!error}>
        <FormLabel htmlFor={name}>Số điện thoại</FormLabel>
        <Input
          id={name}
          placeholder="Số điện thoại"
          onChange={onChange}
          ref={ref}
          value={value}
        />
        <FormErrorMessage>{error && error.message}</FormErrorMessage>
      </FormControl>
    );
  }
);

export default Contact;

// Use this site key in the HTML code your site serves to users
// 6LdUJw8pAAAAAAiSr4CRggzKFkXBZeH1oE9_6_cH

// Use this secret key for communication between your site and reCAPTCHA.
// 6LdUJw8pAAAAABfrlNr9hFh1RP30kiN9Vg1ffr56
