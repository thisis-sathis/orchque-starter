// @orchque/ui — main entry point
// Tokens & themes (CSS only — import in your app's global CSS or layout)
// import "@orchque/ui/styles"; // tokens + base reset

// ── Data-driven type system ───────────────────────────────────────────────────
export type {
  ButtonVariant,
  ButtonSize,
  TriggerConfig,
  ActionConfig,
  ComponentConfig,
  CellRendererType,
  CellRendererConfig,
  OnboardingStepConfig,
  ComponentSlot,
  TriggerSlot,
} from './lib/types';

export { isComponentConfig, isTriggerConfig } from './lib/types';

// ── Render utilities ──────────────────────────────────────────────────────────
export {
  importSpecificComponent,
  renderComponent,
  renderTrigger,
  renderAction,
  renderSlot,
  renderSlots,
  renderTriggerSlot,
} from './lib/render-component';

// ── Atoms ─────────────────────────────────────────────────────────────────────
export { Icon } from './components/icon';
export type { IconName, IconSize } from './components/icon';

export { Button } from './components/button';
export type { ButtonProps } from './components/button';

export { Input } from './components/input';
export type { InputProps } from './components/input';

export { Textarea } from './components/textarea';
export type { TextareaProps } from './components/textarea';

export { Label } from './components/label';
export type { LabelProps } from './components/label';

export { Badge } from './components/badge';
export type { BadgeProps } from './components/badge';

export { Avatar } from './components/avatar';
export type { AvatarProps } from './components/avatar';

export { Skeleton } from './components/skeleton';
export type { SkeletonProps } from './components/skeleton';
export { Spinner } from './components/spinner';
export type { SpinnerProps, SpinnerSize } from './components/spinner';

export { Separator } from './components/separator';
export type { SeparatorProps } from './components/separator';

export { Toggle } from './components/toggle';
export type { ToggleProps } from './components/toggle';

export { Checkbox } from './components/checkbox';
export type { CheckboxProps } from './components/checkbox';

export { Select } from './components/select';

export { Tooltip, TooltipProvider } from './components/tooltip';
export type { TooltipProps } from './components/tooltip';

export { OqImage } from './components/image';
export type { OqImageProps } from './components/image';

export { OqVideo } from './components/video';
export type { OqVideoProps } from './components/video';

export { OqPhoto } from './components/photo';
export type { OqPhotoProps } from './components/photo';

export { DropdownSelect } from './components/dropdownselect';
export type { DropdownSelectProps, DropdownSelectOption, DropdownSelectGroup } from './components/dropdownselect';

// ── Molecules ─────────────────────────────────────────────────────────────────
export { FormField } from './blocks/molecules/FormField';
export type { FormFieldProps } from './blocks/molecules/FormField';

export { NavItem } from './blocks/molecules/NavItem';
export type { NavItemProps } from './blocks/molecules/NavItem';

export { StatCard } from './blocks/molecules/StatCard';
export type { StatCardProps } from './blocks/molecules/StatCard';

export { UserMenu } from './blocks/molecules/UserMenu';
export type { UserMenuProps, UserMenuAction } from './blocks/molecules/UserMenu';

export { PricingCard } from './blocks/molecules/PricingCard';
export type { PricingCardProps } from './blocks/molecules/PricingCard';

export { FeatureItem } from './blocks/molecules/FeatureItem';
export type { FeatureItemProps } from './blocks/molecules/FeatureItem';

export { TestimonialCard } from './blocks/molecules/TestimonialCard';
export type { TestimonialCardProps } from './blocks/molecules/TestimonialCard';

export { SearchBar } from './blocks/molecules/SearchBar';
export type { SearchBarProps } from './blocks/molecules/SearchBar';

// ── Organisms — Landing ───────────────────────────────────────────────────────
export { NavbarBlock } from './blocks/organisms/landing/NavbarBlock';
export type { NavbarBlockProps } from './blocks/organisms/landing/NavbarBlock';

export { HeroBlock } from './blocks/organisms/landing/HeroBlock';
export type { HeroBlockProps } from './blocks/organisms/landing/HeroBlock';

export { FeaturesBlock } from './blocks/organisms/landing/FeaturesBlock';
export type { FeaturesBlockProps } from './blocks/organisms/landing/FeaturesBlock';

export { PricingBlock } from './blocks/organisms/landing/PricingBlock';
export type { PricingBlockProps } from './blocks/organisms/landing/PricingBlock';

export { TestimonialsBlock } from './blocks/organisms/landing/TestimonialsBlock';
export type { TestimonialsBlockProps } from './blocks/organisms/landing/TestimonialsBlock';

export { FAQBlock } from './blocks/organisms/landing/FAQBlock';
export type { FAQBlockProps } from './blocks/organisms/landing/FAQBlock';

export { CTABlock } from './blocks/organisms/landing/CTABlock';
export type { CTABlockProps } from './blocks/organisms/landing/CTABlock';

export { FooterBlock } from './blocks/organisms/landing/FooterBlock';
export type { FooterBlockProps } from './blocks/organisms/landing/FooterBlock';

// ── Organisms — Product ───────────────────────────────────────────────────────
export { Sidebar } from './blocks/organisms/product/Sidebar';
export type { SidebarProps, SidebarSection } from './blocks/organisms/product/Sidebar';

export { TopNav } from './blocks/organisms/product/TopNav';
export type { TopNavProps, TopNavAction } from './blocks/organisms/product/TopNav';

export { StatsRow } from './blocks/organisms/product/StatsRow';
export type { StatsRowProps } from './blocks/organisms/product/StatsRow';

export { PageHeader } from './blocks/organisms/product/PageHeader';
export type { PageHeaderProps } from './blocks/organisms/product/PageHeader';

export { EmptyState } from './blocks/organisms/product/EmptyState';
export type { EmptyStateProps } from './blocks/organisms/product/EmptyState';

export { DataTable } from './blocks/organisms/product/DataTable';
export type { DataTableProps, DataTableColumn } from './blocks/organisms/product/DataTable';

// ── Templates ─────────────────────────────────────────────────────────────────
export { DashboardTemplate } from './templates/DashboardTemplate';
export type { DashboardTemplateProps, ProductTheme } from './templates/DashboardTemplate';

export { LandingTemplate } from './templates/LandingTemplate';
export type { LandingTemplateProps, LandingTheme } from './templates/LandingTemplate';

export { AuthTemplate } from './templates/AuthTemplate';
export type { AuthTemplateProps } from './templates/AuthTemplate';

export { SettingsTemplate } from './templates/SettingsTemplate';
export type { SettingsTemplateProps, SettingsNavItem } from './templates/SettingsTemplate';

export { EmptyTemplate } from './templates/EmptyTemplate';
export type { EmptyTemplateProps } from './templates/EmptyTemplate';

// ── Pages ─────────────────────────────────────────────────────────────────────
export { LandingPage } from './pages/LandingPage';
export type { LandingPageProps, LandingPageConfig } from './pages/LandingPage';

export { DashboardPage } from './pages/DashboardPage';
export type { DashboardPageProps } from './pages/DashboardPage';

export { LoginPage } from './pages/LoginPage';
export type { LoginPageProps } from './pages/LoginPage';

export { SignupPage } from './pages/SignupPage';
export type { SignupPageProps } from './pages/SignupPage';

export { PricingPage } from './pages/PricingPage';
export type { PricingPageProps } from './pages/PricingPage';

export { SettingsPage } from './pages/SettingsPage';
export type { SettingsPageProps } from './pages/SettingsPage';

export { OnboardingPage } from './pages/OnboardingPage';
export type { OnboardingPageProps, OnboardingStep } from './pages/OnboardingPage';

export { WallOfLovePage } from './pages/WallOfLovePage';
export type { WallOfLovePageProps } from './pages/WallOfLovePage';

export { LegalPage } from './pages/LegalPage';
export type { LegalPageProps, LegalSection } from './pages/LegalPage';

export { HelpPage } from './pages/HelpPage';
export type { HelpPageProps, HelpCategory, HelpArticle } from './pages/HelpPage';

export { FAQPage } from './pages/FAQPage';
export type { FAQPageProps } from './pages/FAQPage';

export { ForgotPasswordPage } from './pages/ForgotPasswordPage';
export type { ForgotPasswordPageProps } from './pages/ForgotPasswordPage';

export { ResetPasswordPage } from './pages/ResetPasswordPage';
export type { ResetPasswordPageProps } from './pages/ResetPasswordPage';

// ── Utils ─────────────────────────────────────────────────────────────────────
export { cn } from './lib/utils';
