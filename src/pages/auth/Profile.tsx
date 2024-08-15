import InputController from "@/components/custom/InputCotroller";
import { Button } from "@/components/ui/button";
import useProfileQuery from "@/query/auth/useProfileQuery";

const Profile = () => {
  const formMethods = useProfileQuery();
  const { control } = formMethods;

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="border border-gray-400 w-[400px] h-auto p-6 rounded-md">
          <h1 className="text-center text-4xl mb-3">Profile</h1>

          <InputController
            placeholder="Email"
            label="Email"
            type="email"
            name="email"
            control={control}
            // error={errors?.email?.message}
          />
          <InputController
            placeholder="Username"
            label="Username"
            type="text"
            name="username"
            control={control}
            // error={errors?.username?.message}
          />
          <InputController
            placeholder="Role"
            label="Role"
            type="text"
            name="role"
            control={control}
            // error={errors?.username?.message}
          />
          <div className="flex justify-end">
            <Button>Update</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
