// SettingsPage.tsx — product settings page. DashboardTemplate + SettingsTemplate + children.
import React from "react";
import { DashboardTemplate, type DashboardTemplateProps } from "@/ui/templates/DashboardTemplate";
import { SettingsTemplate, type SettingsTemplateProps } from "@/ui/templates/SettingsTemplate";

export interface SettingsPageProps {
  layout: Omit<DashboardTemplateProps, "children">;
  settings: Omit<SettingsTemplateProps, "children">;
  children: React.ReactNode;
}

export function SettingsPage({ layout, settings, children }: SettingsPageProps) {
  return (
    <DashboardTemplate {...layout}>
      <SettingsTemplate {...settings}>
        {children}
      </SettingsTemplate>
    </DashboardTemplate>
  );
}
