import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import Field from "../common/Field";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { api } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => api.post("/auth/register", formData),
    onSuccess: () => {
      navigate("/login");
    },
    onError: (err) => {
      console.error(err);

      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${err.message}`,
      });
    },
  });

  const submitForm = (formData) => {
    mutate(formData);
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-7.5"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", {
            required: "First Name is Required",
          })}
          className={`auth-input ${
            errors.firstName ? "border-red-500" : "border-gray-200"
          }`}
          type="firstName"
          name="firstName"
          id="firstName"
        />
      </Field>
      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName")}
          className={`auth-input ${
            errors.lastName ? "border-red-500" : "border-gray-200"
          }`}
          type="lastName"
          name="lastName"
          id="lastName"
        />
      </Field>
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
      <p>{errors?.root?.random?.message}</p>
      <button
        className="auth-input bg-lws-green font-bold text-deep-dark transition-all hover:opacity-90"
        type="submit"
      >
        {isPending ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegistrationForm;
