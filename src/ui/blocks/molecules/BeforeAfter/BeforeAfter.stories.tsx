import type { Meta, StoryObj } from '@storybook/react';
import { BeforeAfter } from './BeforeAfter';

const meta = {
  title: 'Molecules/BeforeAfter',
  component: BeforeAfter,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    beforeImage: {
      control: 'text',
      description: 'URL of the before image',
    },
    afterImage: {
      control: 'text',
      description: 'URL of the after image',
    },
    beforeLabel: {
      control: 'text',
      description: 'Label for before image',
    },
    afterLabel: {
      control: 'text',
      description: 'Label for after image',
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
    },
    width: {
      control: 'number',
      description: 'Width of comparison container',
    },
    height: {
      control: 'number',
      description: 'Height of comparison container',
    },
    showShutter: {
      control: 'boolean',
      description: 'Show interactive shutter slider or side-by-side view',
    },
  },
} satisfies Meta<typeof BeforeAfter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithShutter: Story = {
  args: {
    beforeImage:
      'https://images.unsplash.com/photo-1494390248081-4fb0900881f8?w=600&h=400&fit=crop',
    afterImage:
      'https://images.unsplash.com/photo-1494390248081-4fb0900881f8?w=600&h=400&fit=crop&sat=-100&hue=300',
    beforeLabel: 'Before',
    afterLabel: 'After',
    alt: 'Transformation comparison',
    width: 600,
    height: 400,
    showShutter: true,
  },
  render: (args) => <BeforeAfter {...args} />,
};

export const SideBySide: Story = {
  args: {
    beforeImage:
      'https://images.unsplash.com/photo-1494390248081-4fb0900881f8?w=600&h=400&fit=crop',
    afterImage:
      'https://images.unsplash.com/photo-1494390248081-4fb0900881f8?w=600&h=400&fit=crop&sat=-100&hue=300',
    beforeLabel: 'Before',
    afterLabel: 'After',
    alt: 'Transformation comparison',
    width: 600,
    height: 400,
    showShutter: false,
  },
  render: (args) => <BeforeAfter {...args} />,
};

export const NoLabels: Story = {
  args: {
    beforeImage:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
    afterImage:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop&br=50',
    beforeLabel: '',
    afterLabel: '',
    alt: 'Photo enhancement',
    width: 600,
    height: 400,
    showShutter: true,
  },
  render: (args) => <BeforeAfter {...args} />,
};

export const ResponsiveShutter: Story = {
  args: {
    beforeImage:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=800&h=500&fit=crop',
    afterImage:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=800&h=500&fit=crop&sat=150',
    beforeLabel: 'Original',
    afterLabel: 'Enhanced',
    alt: 'Product showcase',
    width: 800,
    height: 500,
    showShutter: true,
    className: 'w-full',
  },
  render: (args) => (
    <div className="flex justify-center">
      <BeforeAfter {...args} />
    </div>
  ),
};

export const DifferentDimensions: Story = {
  args: {
    beforeImage:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop',
    afterImage:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop&contrast=120',
    beforeLabel: 'Standard',
    afterLabel: 'Contrast+',
    alt: 'Contrast comparison',
    width: 400,
    height: 600,
    showShutter: true,
  },
  render: (args) => <BeforeAfter {...args} />,
};
