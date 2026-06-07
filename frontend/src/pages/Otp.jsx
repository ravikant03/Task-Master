import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

// ✅ Validation schema
const OtpSchema = Yup.object().shape({
  otp: Yup.array()
    .of(Yup.string().matches(/^[0-9]$/, "Must be a digit"))
    .min(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

export default function OtpPage() {

    const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>

        <Formik
          initialValues={{ otp: Array(6).fill("") }}
          validationSchema={OtpSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const otpValue = values.otp.join("");
              const pendingUser = JSON.parse(
                localStorage.getItem("pendingUser"),
              );
              if (!pendingUser) {
                toast.error("Registration data not found");
                return;
              }
              const response = await api.post("/auth/verify-otp", {
                otp: otpValue,
                email: pendingUser.email,
              });
              await api.post("/auth/register", pendingUser);
              localStorage.removeItem("pendingUser");
              toast.success("OTP verified & user registered successfully");
              navigate("/login")
            } catch (error) {
              toast.error(
                error.response?.data?.message || "Something went wrong",
              );
            } finally {
              setSubmitting(false);
              resetForm();
            }
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="flex flex-col gap-6">
              {/* OTP Inputs */}
              <div className="flex justify-center gap-2">
                {values.otp.map((digit, index) => (
                  <Field
                    key={index}
                    name={`otp[${index}]`}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 text-center border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      setFieldValue(`otp[${index}]`, val);

                      // Auto-focus next input
                      if (val && index < 5) {
                        const nextInput = document.querySelector(
                          `input[name="otp[${index + 1}]"]`,
                        );
                        nextInput?.focus();
                      }
                    }}
                  />
                ))}
              </div>

              {/* Error message */}
              {errors.otp && touched.otp ? (
                <div className="text-red-500 text-sm text-center">
                  {errors.otp}
                </div>
              ) : null}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Verify
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
