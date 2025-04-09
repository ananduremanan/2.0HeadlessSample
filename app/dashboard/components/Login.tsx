import { Button } from "@/component-lib/button";
import { Checkbox } from "@/component-lib/checkbox";
import { Input } from "@/component-lib/input";
import { useRouter, useSearchParams } from "next/navigation";

export function Login({ showOtpModal }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const cancelLogin = () => {
    params.delete("login");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const authCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (showOtpModal) showOtpModal(true);
  };

  return (
    <form
      action=""
      className="w-full px-2 md:px-20 flex flex-col space-y-4"
      onSubmit={authCheck}
    >
      <div>
        <div className="text-2xl font-bold">Login To Your Project</div>
        <div className="text-xs">Made With Building Block</div>
      </div>

      <div>
        <label htmlFor="userName" className="text-xs">
          Enter Your UserName
        </label>
        <Input placeholder="username" required />
      </div>
      <div>
        <label htmlFor="userName" className="text-xs">
          Enter Your Password
        </label>
        <Input placeholder="password" type="password" required />
      </div>

      <div className="text-xs flex items-center space-x-2">
        <div>
          Type Anything In the Input Feild. Agree To Our Terms And Policy
        </div>
        <Checkbox required />
      </div>

      <div className="flex space-x-2">
        <Button type="button" onClick={cancelLogin}>
          Cancel
        </Button>
        <Button>Login</Button>
      </div>
    </form>
  );
}
