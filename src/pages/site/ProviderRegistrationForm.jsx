import React, { useState } from "react";
import axios from "axios";

const fieldTypes = ["text", "number", "tel", "email", "file", "checkbox", "textarea"];

const CreateDynamicForm = () => {
  const [formConfig, setFormConfig] = useState({
    categoryId: "cmciyb14e0000560xvomotosp",
    formType: "provider_registration_form",
    name: "Provider Registration - Home Cleaning",
    description: "Register as a provider for Home Cleaning services.",
    allowMultipleSubmissions: false,
    requireAuthentication: false,
    autoApprove: true,
    notificationEmail: "admin@example.com",
    sendEmailOnSubmission: true,
    formFields: [],
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Handle Input Change
  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...formConfig.formFields];
    updatedFields[index][field] = value;
    setFormConfig({ ...formConfig, formFields: updatedFields });
  };

  // Add New Field
  const addField = () => {
    setFormConfig((prev) => ({
      ...prev,
      formFields: [...prev.formFields, { label: "", name: "", type: "text", required: false }],
    }));
  };

  // Remove Field
  const removeField = (index) => {
    const updatedFields = [...formConfig.formFields];
    updatedFields.splice(index, 1);
    setFormConfig({ ...formConfig, formFields: updatedFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await axios.post(
        "/api/forms/create", // Replace with your backend route
        formConfig,
        {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace or remove
          },
        }
      );

      setSuccessMsg(response.data.message);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Create New Dynamic Form</h2>

      {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* General Form Info */}
        <input
          type="text"
          value={formConfig.name}
          onChange={(e) => setFormConfig({ ...formConfig, name: e.target.value })}
          placeholder="Form Name"
          className="w-full border p-2 rounded"
        />

        <textarea
          value={formConfig.description}
          onChange={(e) => setFormConfig({ ...formConfig, description: e.target.value })}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          value={formConfig.notificationEmail}
          onChange={(e) =>
            setFormConfig({ ...formConfig, notificationEmail: e.target.value })
          }
          placeholder="Notification Email"
          className="w-full border p-2 rounded"
        />

        {/* Boolean toggles */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            ["Allow Multiple Submissions", "allowMultipleSubmissions"],
            ["Require Authentication", "requireAuthentication"],
            ["Auto Approve", "autoApprove"],
            ["Send Email On Submission", "sendEmailOnSubmission"],
          ].map(([label, key]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formConfig[key]}
                onChange={(e) =>
                  setFormConfig({ ...formConfig, [key]: e.target.checked })
                }
              />
              {label}
            </label>
          ))}
        </div>

        <hr className="my-6" />

        {/* 📌 Dynamic Fields Builder */}
        <h3 className="text-lg font-semibold">Form Fields</h3>
        {formConfig.formFields.map((field, index) => (
          <div key={index} className="border p-4 rounded mb-4 bg-gray-50 space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={field.label}
                onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                placeholder="Field Label"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                value={field.name}
                onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                placeholder="Field Name"
                className="border p-2 rounded"
                required
              />
              <select
                value={field.type}
                onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                className="border p-2 rounded"
              >
                {fieldTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    handleFieldChange(index, "required", e.target.checked)
                  }
                />
                Required
              </label>
            </div>
            <button
              type="button"
              onClick={() => removeField(index)}
              className="text-red-600 text-sm hover:underline"
            >
              Remove Field
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addField}
          className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
        >
          + Add Field
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Form"}
        </button>
      </form>
    </div>
  );
};

export default CreateDynamicForm;
