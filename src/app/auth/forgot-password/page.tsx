import { ForgotPasswordForm } from "@/ui/blocks/organisms/auth/ForgotPasswordForm/ForgotPasswordForm";
import { AuthTemplate } from "@/ui/templates/AuthTemplate/AuthTemplate";
import { brand } from "@/lib/config";

export default function ForgotPasswordPage() {
  return (
    <AuthTemplate logoText={brand.name}>
      <ForgotPasswordForm productName={brand.name} />
    </AuthTemplate>
  );
}
