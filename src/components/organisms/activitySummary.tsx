import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  SelectChangeEvent,
} from "@mui/material";
import TextBox from "../atom/textBox";
import DateSelector from "../atom/dateSelect";
import { useForm, Controller } from "react-hook-form"; // Import the necessary hooks
import ActivitySummaryReport from "./activitySummaryReport";
import Dropdown from "../atom/dropdown";

type FormValues = {
  startDate: string;
  endDate: string;
  activityTypes: { [key: string]: boolean };
  activityDetails: { [key: string]: { date: string; cost: number } };
  selectCategory: string;
  selectSubCategory: string;
};

interface Category {
  label: string;
  value: string;
}

const categories: Category[] = [
  { label: "Organization", value: "Organization" },
  { label: "Farm", value: "Farm" },
  { label: "Field", value: "Field" },
];

const ActivitySummary: React.FC = () => {
  const { control, handleSubmit, watch, getValues } = useForm<FormValues>({
    defaultValues: {
      startDate: "",
      endDate: "",
      activityTypes: {},
      activityDetails: {},
      selectCategory: "",
      selectSubCategory: "",
    },
  });

  const activities = [
    { name: "Corn planting", date: "01/05/2024", cost: 500 },
    { name: "Wheat planting", date: "02/10/2024", cost: 700 },
    { name: "Sprinkler irrigation", date: "01/15/2024", cost: 300 },
    { name: "Drip irrigation", date: "02/20/2024", cost: 400 },
    { name: "Corn harvest", date: "03/01/2024", cost: 1000 },
    { name: "Wheat harvest", date: "03/31/2024", cost: 1200 },
  ];
  const [formData, setFormData] = useState<any>([]);

  const [showSummary, setShowSummary] = useState(false);
  const activityTypes = [
    "General",
    "Land Preparation",
    "Planting",
    "Application",
    "Irrigation",
    "Harvest",
    "Operations",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<Category[]>([]);

  const handleCategoryChange = (event: SelectChangeEvent<string | number>) => {
    const selectedValue = event.target.value as string;
    setSelectedCategory(event.target.value as string);

    // Simulate fetching subcategories (you can replace this with actual data)
    const fetchedSubCategories: Category[] = [
      { label: `${selectedValue} 1`, value: `${selectedValue}_1` },
      { label: `${selectedValue} 2`, value: `${selectedValue}_2` },
      // Add more subcategories as needed
    ];
    setSubCategories(fetchedSubCategories);
  };

  const categoryItems = categories.map((cat) => ({
    value: cat.value,
    label: cat.label,
  }));

  const subCategoryItems = subCategories.map((scat) => ({
    value: scat.value,
    label: scat.label,
  }));

  const handleGenerateSummary = (data) => {
    console.log("Form Data: ", data);
    setFormData(data);
    setShowSummary(true);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h6" gutterBottom>
        Activity Summary
        <Divider sx={{ marginTop: 1 }} />
      </Typography>
      <form onSubmit={handleSubmit(handleGenerateSummary)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DateSelector
                  label="Start Date"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DateSelector
                  label="End Date"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select Activity Types</FormLabel>
              <FormGroup row>
                {activityTypes.map((type) => (
                  <FormControlLabel
                    key={type}
                    control={
                      <Controller
                        name={`activityTypes.${type}`}
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            checked={watch(`activityTypes.${type}`, false)}
                          />
                        )}
                      />
                    }
                    label={type}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
          {activityTypes.map(
            (type) =>
              watch(`activityTypes.${type}`, false) && (
                <Grid container key={type} spacing={2}>
                  <Grid item xs={6}>
                    <Controller
                      name={`activityDetails.${type}.date`}
                      control={control}
                      render={({ field }) => (
                        <DateSelector
                          label={`Date for ${type}`}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name={`activityDetails.${type}.cost`}
                      control={control}
                      render={({ field }) => (
                        <TextBox
                          label={`Cost for ${type}`}
                          type="number"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              )
          )}
          <Grid container spacing={2} marginTop={0}>
            <Grid item xs={6}>
              <Controller
                name="selectCategory"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label={"Select Category"}
                    name={"selectCategory"}
                    value={field.value}
                    items={categoryItems}
                    sx={{ marginBottom: 1 }}
                    onChange={(e) => {
                      field.onChange(e);
                      handleCategoryChange(e);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              {watch("selectCategory") && (
                <Controller
                  name="selectSubCategory"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      label={"Select Subcategory"}
                      name={"selectSubCategory"}
                      value={field.value}
                      items={subCategoryItems}
                      sx={{ marginBottom: 1 }}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              )}
            </Grid>

            <Button
              variant="contained"
              color="primary"
              sx={{ marginBottom: 1 }}
              type="submit"
            >
              Generate Summary
            </Button>
          </Grid>
        </Grid>
      </form>
      {showSummary && (
        <ActivitySummaryReport
          selectCategory={formData?.selectCategory}
          selectSubCategory={formData?.selectSubCategory}
          dateRange={formData?.startDate + " to " + formData?.endDate}
          activities={activities}
        />
      )}
    </Container>
  );
};

export default ActivitySummary;
