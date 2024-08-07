import InputController from "@/components/custom/InputCotroller";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import useLoginQuery from "@/query/auth/useLoginQuery";

type loginType = {
  username: string;
  password: string;
};

const initialState: loginType = {
  username: "",
  password: "",
};

const LoginPage = () => {
  const { mutateAsync } = useLoginQuery();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
    resolver: yupResolver(loginSchema),
  });

  const onSubmitForm = (payload: any) => {
    mutateAsync(payload);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-gray-400 w-[400px] h-auto p-6 rounded-md">
        <h1 className="text-center text-4xl mb-3">Login</h1>

        <InputController
          placeholder="Username"
          label="Username"
          type="text"
          name="username"
          control={control}
          error={errors?.username?.message}
        />

        <InputController
          placeholder="Password"
          label="Password"
          type="password"
          className="relative"
          name="password"
          control={control}
          error={errors?.password?.message}
        />
        <div className="flex justify-end">
          <Button className="mx-2">
            <Link to="/">Signup</Link>
          </Button>
          <Button onClick={handleSubmit(onSubmitForm)}>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
