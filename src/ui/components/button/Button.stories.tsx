import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "UI/Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    label: "Get Started",
    variant: "primary",
    size: "md",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    label: "Learn More",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    label: "Skip",
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    label: "Delete",
    variant: "danger",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="xs" label="XS" />
      <Button size="sm" label="SM" />
      <Button size="md" label="MD" />
      <Button size="lg" label="LG" />
    </div>
  ),
};
