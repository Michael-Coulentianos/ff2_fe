// src/components/CategoryDropdowns.tsx

import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Dropdown from "./dropdown";

interface Category {
  label: string;
  value: string;
}

const categories: Category[] = [
  { label: "Organization", value: "organization" },
  { label: "Farm", value: "farm" },
  { label: "Field", value: "field" },
];

const CategoryDropdowns: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
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

  const handleSubCategoryChange = (
    event: SelectChangeEvent<string | number>
  ) => {
    setSelectedSubCategory(event.target.value as string);
  };

  const categoryItems = categories.map((cat) => ({
    value: cat.value,
    label: cat.label,
  }));
  const subCategoryItems = subCategories.map((scat) => ({
    value: scat.value,
    label: scat.label,
  }));
  return (
    <div>
      <Dropdown
        label={"Select Category"}
        name={"selectCategory"}
        value={selectedCategory}
        items={categoryItems}
        sx={{ marginBottom: 1 }}
        onChange={handleCategoryChange}
      ></Dropdown>

      {selectedCategory && (
        <Dropdown
          label={"Select Subcategory"}
          name={"selectSubCategory"}
          value={selectedSubCategory}
          items={subCategoryItems}
          sx={{ marginBottom: 1 }}
          onChange={handleSubCategoryChange}
        ></Dropdown>
      )}
    </div>
  );
};

export default CategoryDropdowns;
