import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WelcomeCard from "../molecules/welcome";
import { Container, Grid, Paper } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import FarmManagement from "../pages/FarmPage";
import { createOrganization, getLegalEntities } from "../../api-ffm-service";
import { useState } from "react";
import { LegalEntity } from "../../models/legalEntity.interface";
import { useFetchData } from "../../hooks/useFethData";
import OnBoardingOrganisationForm from "./onBoardingOrganisationDialog";

const steps = ["Welcome", "Add Organisation", "Add Farm & Field"];

const stepDescriptions = [
  "Kickstart the process by creating your organisation.",
  "Click on the ‘Add Farm’ button, enter the required details, then press ‘Save’. Repeat the process to add a Field.",
];
const stepCaption = [
  "Simply click on the Add Organization’ button, enter the required details, then press ‘Save’.",
  "Remember, you have the flexibility to create multiple farms and fields.",
];

export default function StepperForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [legalEntities, setLegalEntities] = useState<LegalEntity[]>([]);
  useFetchData(getLegalEntities, setLegalEntities);

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    navigate("/");
  };

  const handleSubmit = async (formData: any) => {
    const org: any = {
      name: formData.name,
      vatNumber: formData.vatNumber,
      legalEntityTypeId: formData.legalEntityTypeId,
      registrationNumber: formData.registrationNumber,
      contactDetail: [{
        fullName: formData.fullName,
        contacts: [
          { type: "Mobile", details: formData.contactNumber },
          { type: "Email", details: formData.emailAddress },
        ]
      }],
      physicalAddress: {
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        code: formData.code,
      },
      sameAddress: formData.sameAddress,
      postalAddress: formData.sameAddress
        ? {
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          code: formData.code,
        }
        : {
          addressLine1: formData.postalAddressLine1,
          addressLine2: formData.postalAddressLine2,
          city: formData.postalAddressCity,
          code: formData.postalAddressCode,
        }
    };
  
    await createOrganization(org);
  };
  
  

  const stepContent = [
    <WelcomeCard />,
    <Container sx={{ pt: 9 }}>
      <OnBoardingOrganisationForm onSubmit={handleSubmit} legalEntities={legalEntities} />
    </Container>,
    <Container sx={{ pt: 2, ml: 0 }}>
      <FarmManagement />
    </Container>,
  ];

  return (
    <Box sx={{ width: "100%", height: "85vh", display: "flex", flexDirection: "column" }}>
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Grid container sx={{ height: "100%" }}>
          {activeStep > 0 && (
            <Grid item xs={4}>
              <Paper
                elevation={3}
                sx={{
                  height: "100%",
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.paper,
                }}
              >
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                  Step {activeStep + 1}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                  {stepDescriptions[activeStep - 1]}
                </Typography>
                <Typography variant="caption" sx={{ mt: 2, mb: 1 }}>
                  {stepCaption[activeStep - 1]}
                </Typography>
              </Paper>
            </Grid>
          )}
          <Grid item xs={activeStep > 0 ? 8 : 12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {stepContent[activeStep]}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ position: 'fixed', bottom: 0, width: '100%', display: "flex", justifyContent: "space-between", p: 2 }}>
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
