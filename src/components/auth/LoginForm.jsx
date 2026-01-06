import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  FACEHOOK_USER_REFRESH_TOKEN,
  FACEHOOK_USER_SESSION_TOKEN,
  FACEHOOK_USER_INFO,
} from "../../config";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import Field from "../common/Field";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { api } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => api.post("/auth/login", formData),
    onSuccess: (response) => {
      const { token, user } = response.data;
      if (token) {
        const authToken = token.token;
        const refreshToken = token.refreshToken;

        console.log(`Login time auth token: ${authToken}`);
        setAuth({ user, authToken, refreshToken });

        Cookies.set(FACEHOOK_USER_SESSION_TOKEN, authToken);
        Cookies.set(FACEHOOK_USER_REFRESH_TOKEN, refreshToken);
        Cookies.set(FACEHOOK_USER_INFO, JSON.stringify(user));

        navigate("/");
      }
    },
    onError: (err, variables) => {
      console.error(err);

      setError("root.random", {
        type: "random",
        message: `User with email ${variables.email} or password is not correct`,
      });
    },
  });

  const submitForm = (formData) => {
    mutate(formData);
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-15"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email ID is Required" })}
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          type="email"
          name="email"
          id="email"
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          name="password"
          id="password"
        />
      </Field>
      {errors?.root?.random && (
        <p className="text-red-500 text-center pb-4">
          {errors?.root?.random?.message}!
        </p>
      )}
      <Field>
        <button className="auth-input bg-lws-green font-bold text-deep-dark transition-all hover:opacity-90 cursor-pointer">
          {isPending ? "Logging in..." : "Login"}
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
