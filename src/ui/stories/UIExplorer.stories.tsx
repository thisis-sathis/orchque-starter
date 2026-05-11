import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import { Badge } from "@/ui/components/badge";

function UIExplorer() {
  return (
    <div className="w-full max-w-4xl space-y-8 p-6">
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">UI Kit Explorer</h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Use the left sidebar to browse all UI stories. This page is a quick visual entry point.
        </p>
      </section>

      <section className="space-y-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h3 className="text-lg font-semibold">Buttons</h3>
        <div className="flex flex-wrap gap-2">
          <Button label="Primary" variant="primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Ghost" variant="ghost" />
          <Button label="Danger" variant="danger" />
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h3 className="text-lg font-semibold">Form Inputs</h3>
        <div className="max-w-sm space-y-3">
          <Input placeholder="Enter your email" />
          <Input placeholder="Invalid value" hasError value="not-an-email" readOnly />
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h3 className="text-lg font-semibold">Status Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary" label="Primary" />
          <Badge variant="success" label="Success" />
          <Badge variant="warning" label="Warning" />
          <Badge variant="danger" label="Danger" />
          <Badge variant="outline" label="Outline" />
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: "UI/Explorer/Overview",
  component: UIExplorer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof UIExplorer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
