import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormSection from "../molecules/DynamicFormSection";
import FieldMapComponent from "../molecules/FieldMapComponent";
import { ForwardRefRenderFunction, forwardRef, useImperativeHandle } from "react";

const validationSchema = yup.object({
  farm: yup.string().required("Required"),
});

type OnBoardingFarmAndFieldProps = {
  onSubmit: (formData: any) => Promise<void>;
};

const OnBoardingFarmAndField: ForwardRefRenderFunction<unknown, OnBoardingFarmAndFieldProps> = ({ onSubmit }, ref) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit)
  }));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Farm & Field
      </Typography>
      <form>
        <Box sx={{ mt: 4 }}>
          <FormSection
            title="Farm Details"
            fields={[
              { id: "farmName", label: "Farm Name", type: "text" }
            ]}
            control={control}
            errors={errors}
            columns={2}
          />
        </Box>
      </form>
      <Box sx={{ mt: 4 }}>
        <FieldMapComponent height={"400"}/>
      </Box>
    </Container>
  );
};

export default forwardRef(OnBoardingFarmAndField);