import { SignInForm } from "@/ui/blocks/organisms/auth/SignInForm/SignInForm";
import { PRODUCT } from "@/lib/config";

export default function SignInPage() {
  return <SignInForm productName={PRODUCT.name} />;
}
