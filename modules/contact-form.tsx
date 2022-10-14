import {
  Box,
  Button,
  Heading,
  Select,
  Stack,
  Text,
  Textarea,
  SelectField as ChakraSelectField,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import logo from "../public/logo.svg";
import InputField from "../components/form/input-field";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CATEGORY, contactFormSchema, PROJECTS } from "./validation";
import SelectField from "@/components/form/select-field";
import TextareaField from "@/components/form/textarea-field";
import { createStandaloneToast } from "@chakra-ui/toast";
export interface ContactFormProps {
  name: string;
  emailAddress: string;
  project: string;
  category: string;
  description: string;
}
const { ToastContainer, toast } = createStandaloneToast();
const ContactForm = () => {
  const { register, handleSubmit, formState, watch, getValues } =
    useForm<ContactFormProps>({
      resolver: yupResolver(contactFormSchema),
    });

  const onSubmit = (value: ContactFormProps) => {
    toast({
      position: "top",
      duration: 9000,
      render: () => (
        <Box
          borderRadius={"10px"}
          color="white"
          data-testid="toast"
          p={3}
          bg="green"
        >
          Successfully submitted
        </Box>
      ),
    });
  };

  return (
    <Box>
      <ToastContainer />
      <VStack height={"400px"} background={"black"} w="full">
        <Box position={"relative"} mt="40px" mb={"40px"}>
          <Image src={logo} alt={"hovlogo"} />
        </Box>
        <VStack w="full" spacing={"8px"} color="white">
          <Heading
            m={0}
            fontWeight={800}
            fontSize={"48px"}
            letterSpacing={"-0.025em"}
          >
            Contact us
          </Heading>
          <Text>Tell us what you need and we'll help you out.</Text>
        </VStack>
      </VStack>
      <Box
        minHeight={"954px"}
        w="512px"
        position={"absolute"}
        top={"284px"}
        left={"50%"}
        transform={"translateX(-50%)"}
      >
        <Box
          width={"full"}
          bg="white"
          borderRadius={"8px"}
          boxShadow={
            "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
          }
        >
          <VStack
            width={"full"}
            height={"100%"}
            pb="44px"
            as="form"
            onSubmitCapture={handleSubmit(onSubmit)}
          >
            <Heading mt="56px" mb="40px">
              Drop your message
            </Heading>
            <VStack
              spacing={"32px"}
              w="80%"
              height={"100%"}
              align={"center"}
              pb="1px solid red"
              justify="start"
            >
              <InputField
                id="name"
                {...register("name")}
                label={"Name"}
                errorMsg={formState.errors.name?.message}
                chakraInputProps={{
                  width: "400px",
                  height: "42px",
                  border: "1px solid #D1D5DB",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                  borderRadius: "6px",
                  placeholder: "Input your name",
                  "aria-label": "form.input.name",
                  role: "input",
                }}
              />
              <InputField
                id="emailAddress"
                label={"Email"}
                errorMsg={formState.errors.emailAddress?.message}
                {...register("emailAddress")}
                chakraInputProps={{
                  width: "400px",
                  height: "42px",
                  border: "1px solid #D1D5DB",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                  borderRadius: "6px",
                  placeholder: "Input your name",
                  "aria-label": "form.input.email",
                  role: "input",
                }}
              />
              <SelectField
                id="projects"
                label="Concern Project"
                options={Object.values(PROJECTS).map((p) => p)}
                errorMsg={formState.errors.project?.message}
                {...register("project")}
                formControlProps={{ w: "400px" }}
                chakraInputProps={{
                  height: "42px",
                  icon: undefined,
                  border: "1px solid #D1D5DB",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                  borderRadius: "6px",
                  placeholder: "Select concerned project",
                  "aria-label": "form.select.projects",
                  role: "input",
                }}
              />
              <SelectField
                id="category"
                label="Select Category"
                options={Object.values(CATEGORY).map((p) => p)}
                errorMsg={formState.errors.category?.message}
                {...register("category")}
                formControlProps={{ w: "400px" }}
                chakraInputProps={{
                  height: "42px",
                  icon: undefined,
                  border: "1px solid #D1D5DB",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                  borderRadius: "6px",
                  placeholder: "Select category",
                  "aria-label": "form.select.category",
                  role: "input",
                }}
              />
              <TextareaField
                id="textarea"
                errorMsg={formState.errors.description?.message}
                label="Description of concern"
                {...register("description")}
              />
              <Button
                type="submit"
                bgColor={"#4F46E5"}
                data-testid="form.submit"
                height="42px"
                width={"full"}
                color="white"
              >
                Submit
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactForm;
