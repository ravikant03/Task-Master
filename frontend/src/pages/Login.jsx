import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
   
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await api.post("/auth/login", values);
            localStorage.setItem("token", response.data?.token);
            toast.success(response.data?.message);
            navigate("/");
          } catch (error) {
            toast.error("Something went worng while logging in");
          } finally {
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-center">Login</h2>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
             {/* Footer */}
            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-600 font-medium hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
    
    
  );
}
