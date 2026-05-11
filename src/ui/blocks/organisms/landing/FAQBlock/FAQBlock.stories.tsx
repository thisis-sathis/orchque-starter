import type { Meta, StoryObj } from "@storybook/react";
import { FAQBlock } from "./FAQBlock";
import { landingSections } from "@/lib/config";

const { component: _faqComponent, ...faqProps } = landingSections.faq as {
  component: string;
  [key: string]: unknown;
};

const meta = {
  title: "UI/Landing/FAQBlock",
  component: FAQBlock,
  tags: ["autodocs"],
  args: faqProps,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FAQBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
