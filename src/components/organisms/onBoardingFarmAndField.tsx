import { Container, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormSection from "../molecules/DynamicFormSection";
import FieldMapComponent from "../molecules/FieldMapComponent";
import { ForwardRefRenderFunction, forwardRef, useImperativeHandle } from "react";
import Iframe from "react-iframe";
import { useGlobalState } from "../../GlobalState";

const validationSchema = yup.object({
  farmName: yup.string().required("Required"),
});

type OnBoardingFarmAndFieldProps = {
  onSubmit: (formData: any) => Promise<void>;
};

const OnBoardingFarmAndField: ForwardRefRenderFunction<unknown, OnBoardingFarmAndFieldProps> = ({ onSubmit }, ref) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit),
  }));

  const { activeAccount } = useGlobalState();
  const azureUserId = activeAccount?.localAccountId;
  let mapUrl = `${process.env.REACT_APP_MAPPING_TOOL}/field/${azureUserId}`;

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add Farm & Field
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection
          title="Farm Details"
          fields={[{ id: "farmName", label: "Farm Name", type: "text" }]}
          control={control}
          errors={errors}
          columns={2}
        />
      </form>
      <Paper elevation={2} sx={{ backgroundColor: "white", margin: 1, p: 0.2 }}>
      <Iframe
        url={mapUrl}
        width="100%"
        height="380"
        display="initial"
        position="relative"
        frameBorder={0}
      />
    </Paper>
    </Container>
  );
};

export default forwardRef(OnBoardingFarmAndField);
