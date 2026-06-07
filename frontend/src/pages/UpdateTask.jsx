import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import api from "../services/api.js";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";


const UpdateTask = () => {

  const navigate = useNavigate();

  const [task, setTask] = useState();

  const { id } = useParams();

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await api.get(`/task/${id}`);
        //   console.log(response);
        setTask(response.data?.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    }
    fetchTask();
  }, [id]);

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    status: Yup.string()
      .oneOf(["pending", "completed"], "Invalid status")
      .required("Status is required"),
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Task</h2>

        <Formik
          initialValues={{
            title: task?.title || "",
            description: task?.description || "",
            status: task?.status || "pending",
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              const response = await api.put(`/task/${id}`, values);
              toast.success(response.data?.message);
              navigate("/task/dashboard")
            } catch (error) {
              toast.error("Somthing went wrong while updating task.");
            } finally {
              setSubmitting(false);
              resetForm();
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Enter task title"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Enter task description"
                  rows="3"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
              >
                {isSubmitting ? "Updating..." : "Update Task"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateTask;
