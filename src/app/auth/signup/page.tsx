import { SignUpForm } from "@/ui/blocks/organisms/auth/SignUpForm/SignUpForm";
import { PRODUCT } from "@/lib/config";

export default function SignUpPage() {
  return <SignUpForm productName={PRODUCT.name} />;
}
