import { ResetPasswordForm } from "@/ui/blocks/organisms/auth/ResetPasswordForm/ResetPasswordForm";
import { AuthTemplate } from "@/ui/templates/AuthTemplate/AuthTemplate";
import { brand } from "@/lib/config";

export default function ResetPasswordPage() {
  return (
    <AuthTemplate logoText={brand.name}>
      <ResetPasswordForm productName={brand.name} />
    </AuthTemplate>
  );
}
