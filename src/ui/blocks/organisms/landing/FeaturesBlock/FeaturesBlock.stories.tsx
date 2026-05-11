import type { Meta, StoryObj } from "@storybook/react";
import { FeaturesBlock } from "./FeaturesBlock";
import { landingSections } from "@/lib/config";

const { component: _featuresComponent, ...featuresProps } = landingSections.features as {
  component: string;
  [key: string]: unknown;
};

const meta = {
  title: "UI/Landing/FeaturesBlock",
  component: FeaturesBlock,
  tags: ["autodocs"],
  args: featuresProps,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FeaturesBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoColumns: Story = {
  args: {
    columns: 2,
  },
};
