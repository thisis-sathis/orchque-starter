import Link from "next/link";
import { AuthTemplate } from "@/ui/templates/AuthTemplate/AuthTemplate";
import { EmptyState } from "@/ui/blocks/organisms/product/EmptyState/EmptyState";
import { Button } from "@/ui/components/button/Button";
import { brand } from "@/lib/config";

export default function AuthErrorPage() {
  return (
    <AuthTemplate logoText={brand.name}>
      <EmptyState
        icon="AlertTriangle"
        heading="Authentication error"
        description="The verification link may have expired or already been used. Please try again."
      />
      <div className="flex gap-3 justify-center mt-4">
        <Button asChild>
          <Link href="/auth/signin">Sign in</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/auth/forgot-password">Reset password</Link>
        </Button>
      </div>
    </AuthTemplate>
  );
}
