import React from "react";
import { Form } from "react-bootstrap";

export const MarketCategories = [
  { val: "SPORT", text: "Sport", key: 1 },
  { val: "ECONOMY", text: "Gospodarka", key: 2 },
  { val: "CELEBRITIES", text: "Celebryci", key: 3 },
  { val: "POLICY", text: "Polityka", key: 4 },
  { val: "OTHER", text: "Inne", key: 5 },
];

export const renderCategoryFilter = (handleCategory) => {
  const filterCategories = [
    { label: "Sport", value: "SPORT", key: 1 },
    { label: "Celebryci", value: "CELEBRITIES", key: 2 },
    { label: "Polityka", value: "POLICY", key: 3 },
    { label: "Gospodarka", value: "ECONOMY", key: 4 },
    { label: "Inne", value: "OTHER", key: 5 },
  ];

  return (
    <div>
      <h4>Kategorie</h4>
      <Form.Group>
        {filterCategories.map((category) => (
          <Form.Check
            onClick={handleCategory}
            key={category.value}
            label={category.label}
            value={category.value}
            name="checkbox"
            type="checkbox"
          />
        ))}
      </Form.Group>
    </div>
  );
};
