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
  getOrganizations,
  getOrganizationFarms,
} from "../../api-ffm-service";
import { useGlobalState } from "../../GlobalState";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LegalEntity } from "../../models/legalEntity.interface";
import { fetchData, useFetchData } from "../../hooks/useFethData";
import OnBoardingOrganisationForm from "./onBoardingOrganisationDialog";
import OnBoardingFarmAndField from "./onBoardingFarmAndField";
import { CreateOrganization } from "../../models/createOrganization.interface";
import { ContactPerson } from "../../models/contactPerson.interface";

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
  const { selectedOrganization, setSelectedOrganization } = useGlobalState();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const navigate = useNavigate();
  const [farms, setFarms] = useState<any[]>([]);
  const [finish, setFinish] = useState(false);

  useFetchData(getOrganizations, setOrganizations);
  useFetchData(getOrganizationFarms, setFarms);
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

  const handleFinish = async () => {
    if (farmFormRef.current) {
      farmFormRef.current.submitForm();
    }

    if (!selectedOrganization) {
      fetchData(getOrganizations, setOrganizations);
      if (organizations.length > 0) {
        setSelectedOrganization(organizations[0]);
        navigate("/");
      }
    }
  };

  if (farms.length > 0 && organizations.length > 0) {
    if (finish === false) {
      setFinish(true);
    }
  }

  const handleOrgSubmit = async (formData: any) => {
    try {
      const org: Partial<CreateOrganization> = {
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
          } as ContactPerson,
        ],
        physicalAddress: {
          addressId: 0,
          addressUniqueIdentifier: "",
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          code: formData.code,
        },
        sameAddress: formData.sameAddress,
        postalAddress: formData.sameAddress
          ? {
              addressId: 0,
              addressUniqueIdentifier: "",
              addressLine1: formData.addressLine1,
              addressLine2: formData.addressLine2,
              city: formData.city,
              code: formData.code,
            }
          : {
              addressId: 0,
              addressUniqueIdentifier: "",
              addressLine1: formData.postalAddressLine1,
              addressLine2: formData.postalAddressLine2,
              city: formData.postalAddressCity,
              code: formData.postalAddressCode,
            },
      };

      const ty = await createOrganization(org);
      console.log(ty);
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
      console.log(createData);

      await createFarm(createData);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      if (activeStep === steps.length - 1) {
        handleFinish();
      }
    } catch (error) {
      console.error("Failed to create farm:", error);
    }
  };

  const stepContent = [
    <WelcomeCard key="welcome" />,
    <OnBoardingOrganisationForm
      key="orgForm"
      ref={orgFormRef}
      onSubmit={handleOrgSubmit}
      legalEntities={legalEntities}
    />,
    <OnBoardingFarmAndField
      key="farmForm"
      ref={farmFormRef}
      onSubmit={handleFarmSubmit}
    />,
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
        {finish ? (
          <Button type="submit" variant="contained" onClick={handleFinish}>
            Finish
          </Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </Box>
    </>
  );
}
