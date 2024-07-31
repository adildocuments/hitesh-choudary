import InputController from "@/components/custom/InputCotroller";
import SelectOption from "@/components/custom/SelectOption";
import { Button } from "@/components/ui/button";
import { options } from "@/constant/constant";
import { signUpSchema } from "@/schema/authSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const initialState = {
  username: "",
  email: "",
  password: "",
  cpassword: "",
  role: "",
};

const SignupPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: initialState,
  });

  const onSubmitForm = (data: any) => {
    console.log(data, "data");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="border border-gray-400 w-[400px] h-auto p-6 rounded-md">
          <h1 className="text-center text-4xl mb-3">Sign Up</h1>

          <InputController
            placeholder="Email"
            label="Email"
            type="email"
            name="email"
            control={control}
            error={errors?.email?.message}
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
          <InputController
            placeholder="C Password"
            label="C Password"
            type="password"
            className="relative"
            name="cpassword"
            control={control}
            error={errors?.cpassword?.message}
          />
          <InputController
            placeholder="Username"
            label="Username"
            type="text"
            name="username"
            control={control}
            error={errors?.username?.message}
          />
          <SelectOption
            placeholder="Role"
            label="Role"
            options={options}
            name="role"
            control={control}
            error={errors?.role?.message}
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmit(onSubmitForm)}>Submit</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
