import { ForgotPasswordForm } from "@/ui/blocks/organisms/auth/ForgotPasswordForm/ForgotPasswordForm";
import { PRODUCT } from "@/lib/config";

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm productName={PRODUCT.name} />;
}
