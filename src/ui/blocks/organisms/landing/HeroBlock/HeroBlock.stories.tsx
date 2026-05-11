import type { Meta, StoryObj } from "@storybook/react";
import { HeroBlock } from "./HeroBlock";
import { landingSections } from "@/lib/config";

const { component: _heroComponent, ...heroProps } = landingSections.hero as {
  component: string;
  [key: string]: unknown;
};

const meta = {
  title: "UI/Landing/HeroBlock",
  component: HeroBlock,
  tags: ["autodocs"],
  args: heroProps,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeroBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    imageSrc: "/og.png",
    imageAlt: "Product preview",
  },
};
