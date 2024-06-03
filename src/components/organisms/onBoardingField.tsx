import { Container, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ForwardRefRenderFunction, forwardRef, useImperativeHandle } from "react";
import { useGlobalState } from "../../GlobalState";
import FieldManagement from "../pages/FieldsPage";


const validationSchema = yup.object({
  farmName: yup.string().required("Required"),
});

type OnBoardingFieldProps = {
  onSubmit: (formData: any) => Promise<void>;
};

const OnBoardingField: ForwardRefRenderFunction<unknown
, OnBoardingFieldProps> = ({ onSubmit }, ref) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit),
  }));

  return (
    <Container>  
      <FieldManagement />
    </Container>
  );
};

export default forwardRef(OnBoardingField);
