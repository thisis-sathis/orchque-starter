import { ResetPasswordForm } from "@/ui/blocks/organisms/auth/ResetPasswordForm/ResetPasswordForm";
import { PRODUCT } from "@/lib/config";

export default function ResetPasswordPage() {
  return <ResetPasswordForm productName={PRODUCT.name} />;
}
