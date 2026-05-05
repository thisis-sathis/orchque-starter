import { SignUpForm } from "@/ui/blocks/organisms/auth/SignUpForm/SignUpForm";
import { AuthTemplate } from "@/ui/templates/AuthTemplate/AuthTemplate";
import { brand } from "@/lib/config";

export default function SignUpPage() {
  return (
    <AuthTemplate logoText={brand.name}>
      <SignUpForm productName={brand.name} />
    </AuthTemplate>
  );
}
