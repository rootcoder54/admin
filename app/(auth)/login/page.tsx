import { LoginForm } from "@/components/auth/loginForm";
import { Mode } from "@/components/provider/mode";

export default function LoginPage() {
  return (
    <div>
      <div className="absolute right-0 top-0 p-5">
        <Mode />
      </div>
      <LoginForm />
    </div>
  );
}
