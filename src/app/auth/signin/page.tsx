import { SignInForm } from "@/ui/blocks/organisms/auth/SignInForm/SignInForm";
import { AuthTemplate } from "@/ui/templates/AuthTemplate/AuthTemplate";
import { brand } from "@/lib/config";

export default function SignInPage() {
  return (
    <AuthTemplate logoText={brand.name}>
      <SignInForm productName={brand.name} />
    </AuthTemplate>
  );
}
