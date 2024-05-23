import { useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WelcomeCard from "../molecules/welcome";
import { CircularProgress, Grid, Paper } from "@mui/material";
import theme from "../../theme";
import {
  createFarm,
  createOrganization,
  getLegalEntities,
} from "../../api-ffm-service";
import { useGlobalState } from "../../GlobalState";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LegalEntity } from "../../models/legalEntity.interface";
import { useFetchData } from "../../hooks/useFethData";
import OnBoardingOrganisationForm from "./onBoardingOrganisationDialog";
import OnBoardingFarmAndField from "./onBoardingFarmAndField";
import Loading from "../pages/loading";

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
  const { selectedOrganization } = useGlobalState();
  const navigate = useNavigate();

  useFetchData(getLegalEntities, setLegalEntities);
  const orgFormRef = useRef<{ submitForm: () => void }>(null);
  const farmFormRef = useRef<{ submitForm: () => void }>(null);

  const handleNext = () => {
    if (activeStep === 1) {
      orgFormRef.current?.submitForm();
    } else if (activeStep === steps.length - 1) {
      farmFormRef.current?.submitForm();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleFinish = () => {
    navigate("/");
    <CircularProgress color="primary" />;
  };

  const handleOrgSubmit = async (formData: any) => {
    try {
      const org = {
        name: formData.name,
        vatNumber: formData.vatNumber,
        legalEntityTypeId: formData.legalEntityTypeId,
        registrationNumber: formData.registrationNumber,
        contactDetail: [
          {
            fullName: formData.fullName,
            contacts: [
              { type: "Mobile", details: formData.contactNumber },
              { type: "Email", details: formData.emailAddress },
            ],
          },
        ],
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
            },
      };

      // await createOrganization(org);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.error("Failed to create organization:", error);
    }
  };

  const handleFarmSubmit = async (formData: any) => {
    try {
      const createData = {
        name: formData.farmName,
        partyId: selectedOrganization?.partyId,
      };

      await createFarm(createData);

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.error("Failed to create farm:", error);
    }
  };

  const stepContent = [
    <WelcomeCard />,
    <OnBoardingOrganisationForm
      ref={orgFormRef}
      onSubmit={handleOrgSubmit}
      legalEntities={legalEntities}
    />,
    <OnBoardingFarmAndField ref={farmFormRef} onSubmit={handleFarmSubmit} />,
  ];

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                  textAlign: "center",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.paper,
                }}
              >
                <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
                  Step {activeStep + 1}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    mb: 1,
                  }}
                >
                  {stepDescriptions[activeStep - 1]}
                </Typography>
                <Typography variant="caption" sx={{ mt: 2, mb: 1 }}>
                  {stepCaption[activeStep - 1]}
                </Typography>
              </Paper>
            </Grid>
          )}
          <Grid
            item
            xs={activeStep > 0 ? 8 : 12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {stepContent[activeStep]}
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          alignItems: "right",
          justifyContent: "right",
          p: 2,
        }}
      >
        <Button
          onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </>
  );
}
