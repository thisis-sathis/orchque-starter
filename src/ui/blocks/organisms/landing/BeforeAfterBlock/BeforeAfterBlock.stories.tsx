import type { Meta, StoryObj } from '@storybook/react';
import { BeforeAfterBlock } from './BeforeAfterBlock';

const meta = {
  title: 'Organisms/Landing/BeforeAfterBlock',
  component: BeforeAfterBlock,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BeforeAfterBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageComparison: Story = {
  args: {
    badge: 'Visual Transformation',
    heading: 'See the power of great design',
    subheading: 'Drag the slider to compare before and after transformations.',
    comparisons: [
      {
        id: 'dashboard',
        beforeImage:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format&q=80',
        afterImage:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format&q=80&brightness=120&contrast=130',
        beforeLabel: 'Generic Dashboard',
        afterLabel: 'Polished UI',
        alt: 'Dashboard UI transformation',
      },
      {
        id: 'landing',
        beforeImage:
          'https://images.unsplash.com/photo-1460925895917-adf4e565db90?w=600&h=400&fit=crop&auto=format&q=80&saturate=50',
        afterImage:
          'https://images.unsplash.com/photo-1460925895917-adf4e565db90?w=600&h=400&fit=crop&auto=format&q=80',
        beforeLabel: 'Dull Landing',
        afterLabel: 'Vibrant Landing',
        alt: 'Landing page enhancement',
      },
    ],
    variant: 'grid',
    showShutter: true,
  },
};

export const TextComparison: Story = {
  args: {
    badge: 'Before vs After',
    heading: 'The difference is clear',
    subheading: 'Drag the handle to see what changes when you use this starter.',
    before: {
      label: 'Without this starter',
      items: [
        'Weeks spent on auth and billing setup',
        'Inconsistent UI across every page',
        'No config system — copy is hardcoded',
        'Start from zero on every project',
        'No documentation, no structure',
      ],
    },
    after: {
      label: 'With this starter',
      items: [
        'Auth, billing, and credits on day one',
        'Cohesive UI kit driven by design tokens',
        'One JSON file controls all copy and theme',
        'Clone and configure — ship in days',
        'Docs, architecture, and best practices included',
      ],
    },
  },
};

export const GridLayout: Story = {
  args: {
    ...ImageComparison.args,
    variant: 'grid',
  },
};

export const StackLayout: Story = {
  args: {
    ...ImageComparison.args,
    variant: 'stack',
  },
};

export const StaticTileComparison: Story = {
  args: {
    badge: 'Side by Side',
    heading: 'Before vs After — No Slider Needed',
    subheading: 'See what changes when you upgrade to our platform.',
    noSlider: true,
    before: {
      label: 'Before',
      items: [
        'Manual processes everywhere',
        'Scattered tools and data',
        'Hours spent on repetitive tasks',
        'No visibility into performance',
        'Slow time to market',
        'High maintenance costs',
      ],
    },
    after: {
      label: 'After',
      items: [
        'Fully automated workflows',
        'Everything in one platform',
        'Tasks completed in minutes',
        'Real-time analytics dashboard',
        'Ship features 10x faster',
        'Reduced operational overhead',
      ],
    },
  },
};
