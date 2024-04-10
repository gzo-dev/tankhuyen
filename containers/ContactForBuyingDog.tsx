import axios from "axios";
import { get } from "lodash";
import { object, string } from "yup";
import { useToggle } from "react-use";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import React, { forwardRef, useCallback, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";

import {
  VStack,
  Input,
  Button,
  Heading,
  Textarea,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import PhoneInput from "react-phone-number-input/input";

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
    ask_for: string(),
  })
);

const defaultValues = {
  full_name: "",
  email: "",
  ask_for: "",
  phone_number: "",
  message: "",
};

const ContactForBuyingDog = ({ name }: { name: string }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isLoading, toggleIsLoading] = useToggle(false);

  const { handleSubmit, control, reset, setValue } = useForm({
    resolver,
    defaultValues,
  });

  useEffect(() => {
    setValue("ask_for", name);
  }, [name, setValue]);

  const { enqueueSnackbar } = useSnackbar();

  const submitHandler: SubmitHandler<{
    message?: string | undefined;
    full_name: string;
    email: string;
    phone_number: string;
    ask_for?: string;
  }> = useCallback(
    async (data) => {
      try {
        toggleIsLoading(true);

        await executeRecaptcha?.();

        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
          formData.append(key, value);
        }

        await axios.post(process.env.NEXT_PUBLIC_BUY_DOG_ENDPOINT!, formData);

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

  return (
    <VStack width="full" alignItems="flex-start" gap={8}>
      <Heading size="md">Đặt mua chó</Heading>
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
          render={({ field: { onChange, ref, value, name }, fieldState: { error } }) => {
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
          render={({ field: { onChange, ref, value, name }, fieldState: { error } }) => {
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
          render={({ field: { onChange, ref, value, name }, fieldState: { error } }) => {
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
          render={({ field: { onChange, ref, value, name }, fieldState: { error } }) => {
            return (
              <FormControl isInvalid={!!error}>
                <FormLabel htmlFor={name}>Ghi chú</FormLabel>
                <Textarea
                  id={name}
                  placeholder="Ghi chú..."
                  onChange={onChange}
                  ref={ref}
                  value={value}
                  resize="vertical"
                  height={40}
                />

                <FormErrorMessage>{error && error.message}</FormErrorMessage>
              </FormControl>
            );
          }}
        />
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          Đặt mua
        </Button>
      </VStack>
    </VStack>
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

export default ContactForBuyingDog;
