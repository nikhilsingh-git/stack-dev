import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User, Mail, Phone, Lock, Users, ChevronDown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      role: "",
      agree: false,
    },
  });

  const onSubmit = async (data) => {

     console.log(data)
    try {
      // 👇 apna backend endpoint yahan daalo (port + route mentor ne jo diya hai)
      const res = await axios.post("http://localhost:4000/api/auth/register", data );

      console.log("Registered:", res.data);
      navigate("/login"); // signup ke baad login page pe bhej do
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      // TODO: yahan ek error state bana ke UI me dikha sakte ho
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4 py-10 sm:py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
              <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-slate-900">Smart Campus</span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-xl sm:text-2xl font-bold text-slate-900">
          Student Registration
        </h1>
        <p className="text-center text-sm text-slate-500 mt-1 mb-6">
          Create your institutional account to access the student portal.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Full Legal Name */}
          <Field label="Full Legal Name" error={errors.fullName?.message}>
            <User className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Jane Doe"
              className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
              {...register("fullName", { required: "Full name is required" })}
            />
          </Field>

          {/* Institutional Email */}
          <Field label="Institutional Email" error={errors.email?.message}>
            <Mail className="w-4 h-4 text-slate-400" />
            <input
              type="email"
              placeholder="jane.doe@university.edu"
              className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
              {...register("email", {
                required: "Institutional email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
          </Field>

          {/* Phone Number */}
          <Field label="Phone Number" error={errors.phone?.message}>
            <Phone className="w-4 h-4 text-slate-400" />
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
              {...register("phone", { required: "Phone number is required" })}
            />
          </Field>

          {/* Password */}
          <Field label="Create Password" error={errors.password?.message}>
            <Lock className="w-4 h-4 text-slate-400" />
            <input
              type="password"
              placeholder="••••••••"
              className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
            />
          </Field>

          {/* Role */}
          <Field label="Institutional Role" error={errors.role?.message}>
            <Users className="w-4 h-4 text-slate-400" />
            <select
              defaultValue=""
              className="flex-1 bg-transparent outline-none text-sm text-slate-800 appearance-none"
              {...register("role", { required: "Please select your role" })}
            >
              <option value="" disabled className="text-slate-400">
                Select your role
              </option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="staff">Staff</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </Field>

          {/* Terms */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="agree"
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              {...register("agree", { required: "You must accept the terms" })}
            />
            <label htmlFor="agree" className="text-sm text-slate-600 leading-snug">
              I agree to the institutional{" "}
              <a href="#" className="text-slate-900 font-medium underline underline-offset-2">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-slate-900 font-medium underline underline-offset-2">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          {errors.agree && (
            <p className="text-xs text-red-600 -mt-2">{errors.agree.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-sm py-3 rounded-lg transition-colors"
          >
            <GoogleIcon />
            Sign up with Google
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 border-t border-slate-100 mt-6 pt-5">
          Already have a student account?{" "}
          <a href="#" className="text-slate-900 font-medium underline underline-offset-2">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-800 mb-1.5">{label}</label>
      <div
        className={`flex items-center gap-2 rounded-lg border bg-slate-50 px-3 py-2.5 focus-within:ring-2 focus-within:ring-slate-900/10 focus-within:border-slate-400 ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      >
        {children}
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.4C29.6 35 26.9 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 39.6 16.3 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.5l6.6 5.4C41.5 35.6 44 30.3 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

export default Register;