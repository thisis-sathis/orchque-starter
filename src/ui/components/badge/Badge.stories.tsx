import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "UI/Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    label: "Starter",
    variant: "default",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Popular",
  },
};

export const StatusSet: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" label="Success" />
      <Badge variant="warning" label="Warning" />
      <Badge variant="danger" label="Error" />
      <Badge variant="outline" label="Outline" />
    </div>
  ),
};
