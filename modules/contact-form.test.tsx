import { Box, ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";

import ContactForm from "./contact-form";
import { CATEGORY, PROJECTS } from "./validation";
const { ToastContainer } = createStandaloneToast();
describe("Contact form component", () => {
  beforeEach(() => {
    render(<ContactForm />);
  });
  it("should render 2 input field", async () => {
    const inputs = await screen.findAllByTestId("form.input");
    expect(inputs).toHaveLength(2);
  });
  it("should render 2 select field", async () => {
    const inputs = await screen.findAllByTestId("form.select");
    expect(inputs).toHaveLength(2);
  });
  it("should render 1 text area field", async () => {
    const inputs = await screen.findAllByTestId("form.textarea");
    expect(inputs).toHaveLength(1);
  });
  test("input invalid email should throw error message", async () => {
    const emailInput = await screen.getByRole("input", {
      name: "form.input.email",
    });
    fireEvent.change(emailInput, { target: { value: "hello@g" } });
    const submit = await screen.findByTestId("form.submit");
    await fireEvent.submit(submit);

    const emailError = await screen.findByRole("alert", {
      name: "error.emailAddress",
    });
    expect(emailError).toBeInTheDocument();
  });

  test("user clicks submit with no value or invalid input and renders 5 total error messages", async () => {
    const submit = await screen.findByTestId("form.submit");
    await fireEvent.submit(submit);
    const errorFormControl = await screen.findAllByTestId(
      "formcontainer.error"
    );
    expect(errorFormControl).toHaveLength(5);
  });
  test("user clicks submit with valid inputs shows toast", async () => {
    const emailInput = await screen.getByRole("input", {
      name: "form.input.email",
    });

    const nameInput = await screen.getByRole("input", {
      name: "form.input.name",
    });

    const category = await screen.getByRole("input", {
      name: "form.select.category",
    });

    const project = await screen.getByRole("input", {
      name: "form.select.projects",
    });
    const description = await screen.findByTestId("form.textarea");
    const submit = await screen.findByTestId("form.submit");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "hello@g.co" } });
      fireEvent.change(nameInput, { target: { value: "Jade" } });
      fireEvent.change(category, { target: { value: CATEGORY.General } });
      fireEvent.change(project, { target: { value: PROJECTS.FinHQ } });
      fireEvent.change(description, {
        target: { value: "This is description" },
      });

      await fireEvent.submit(submit);
    });
    expect(await screen.findByTestId("toast")).toBeInTheDocument();
  });
});
