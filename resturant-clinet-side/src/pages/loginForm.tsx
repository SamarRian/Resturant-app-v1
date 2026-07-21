import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLogin } from "@/hooks/QueryHooks/Auth/useLogin";
import { Spinner } from "@/components/ui/spinner";
import { Link, useNavigate } from "react-router-dom";
import { Flame, CheckCircle2 } from "lucide-react";

const FONT_DISPLAY = { fontFamily: "'Oswald', sans-serif" };
const FONT_MONO = { fontFamily: "'IBM Plex Mono', monospace" };

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { isLoginPending, login } = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(
      { name, email, password },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
      }
    );
  }

  return (
    <div className="grid min-h-svh w-full grid-cols-1 bg-[#14171A] md:grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#FF5A2E]">
                <Flame className="h-3.5 w-3.5" strokeWidth={2.5} />
              </div>
              <span
                className="text-sm tracking-wide text-[#EDEBE6]"
                style={{ ...FONT_DISPLAY, fontWeight: 600 }}
              >
                FOOD ENGINE
              </span>
            </div>

            <Card className="border-white/10 bg-[#181B1E]">
              <CardHeader>
                <CardTitle
                  className="text-2xl text-[#EDEBE6]"
                  style={{ ...FONT_DISPLAY, fontWeight: 600 }}
                >
                  Sign in to the floor
                </CardTitle>
                <CardDescription className="text-[#9AA0A6]">
                  Enter your details to open the register
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name" className="text-[#EDEBE6]">
                        Name
                      </FieldLabel>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Your Name"
                        required
                        className="border-white/10 bg-[#14171A] text-[#EDEBE6] placeholder:text-[#6B6E71] focus-visible:ring-[#FF5A2E]"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="email" className="text-[#EDEBE6]">
                        Email
                      </FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="m@example.com"
                        required
                        className="border-white/10 bg-[#14171A] text-[#EDEBE6] placeholder:text-[#6B6E71] focus-visible:ring-[#FF5A2E]"
                      />
                    </Field>
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel
                          htmlFor="password"
                          className="text-[#EDEBE6]"
                        >
                          Password
                        </FieldLabel>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-white/10 bg-[#14171A] text-[#EDEBE6] focus-visible:ring-[#FF5A2E]"
                      />
                    </Field>
                    <Field>
                      <Button
                        type="submit"
                        disabled={isLoginPending}
                        className="bg-[#FF5A2E] font-medium text-[#14171A] hover:bg-[#FF7A52]"
                      >
                        {isLoginPending ? <Spinner /> : "Login"}
                      </Button>

                      <FieldDescription className="text-center text-[#9AA0A6]"></FieldDescription>
                    </Field>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* RIGHT — kitchen ticket visual (hidden on mobile)                  */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative hidden items-center justify-center overflow-hidden bg-[#0F1113] md:flex">
        <div className="relative w-full max-w-sm -rotate-2">
          <div
            className="relative rounded-sm bg-[#F6F1E4] px-6 py-7 text-[#1B1B1B] shadow-2xl shadow-black/50"
            style={FONT_MONO}
          >
            <div className="absolute -top-1 right-0 left-0 flex justify-between px-3">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-[#0F1113]" />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">SESSION #04</span>
              <span className="flex items-center gap-1 text-[#B5451D]">
                <Flame className="h-3 w-3" /> LIVE
              </span>
            </div>
            <div className="mt-1 text-xs text-[#6B6558]">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>

            <div className="my-4 h-px w-full bg-[#1B1B1B]/15" />

            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Register access</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-[#3F6B4F]" />
              </li>
              <li className="flex items-center justify-between">
                <span>Kitchen printing</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-[#3F6B4F]" />
              </li>
              <li className="flex items-center justify-between">
                <span>Session reports</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-[#3F6B4F]" />
              </li>
            </ul>

            <div className="my-4 h-px w-full bg-[#1B1B1B]/15" />

            <p className="text-xs text-[#6B6558]">
              One login, every station on the floor.
            </p>
          </div>

          <div className="absolute -top-4 -right-4 -z-10 h-full w-full rotate-3 rounded-sm bg-[#F6F1E4]/20" />
        </div>
      </div>
    </div>
  );
}
