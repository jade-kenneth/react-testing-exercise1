import { array, object, SchemaOf, string } from "yup";
import { ContactFormProps } from "./contact-form";

export enum PROJECTS {
  ThreadSync = "ThreadSync",
  UpWatch = "UpWatch",
  FinHQ = "FinHQ",
}

export enum CATEGORY {
  Integration = "Integration",
  General = "General",
  HowTos = "How-to's",
}

export const contactFormSchema: SchemaOf<ContactFormProps> = object()
  .shape({
    name: string().required("Required field.").trim(),
    emailAddress: string()
      .email("Please enter valid email")
      .required("Required field.")
      .trim(),
    project: string()
      .oneOf(Object.values(PROJECTS))
      .required("Required field.")
      .nullable(),
    category: string()
      .oneOf(Object.values(CATEGORY))
      .required("Required field.")
      .nullable(),
    description: string().required("Required field.").trim(),
  })
  .required();
