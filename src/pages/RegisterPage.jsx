import { motion } from "framer-motion";
import {
  ArrowRight,
  Building,
  Key,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";
import { authService, orgService } from "../services";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "doctor",
    organizationId: "",
    secretCode: "",
    specialty: "",
    licenseNumber: "",
  });

  const [organizations, setOrganizations] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPendingApproval, setIsPendingApproval] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      value: "doctor",
      label: "Doctor",
      icon: Stethoscope,
      color: "from-[#02aaa5] to-[#20d7cf]",
      description: "Clinical workspace access",
    },
    {
      value: "admin",
      label: "Admin",
      icon: ShieldCheck,
      color: "from-violet-500 to-fuchsia-500",
      description: "Owner-created access only",
    },
  ];

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const { data } = await orgService.getAllOrganizations();
        setOrganizations(data || []);
      } catch (error) {
        console.error("Error loading organizations:", error);
        setOrganizations([]);
      }
    };

    if (formData.role === "doctor") {
      loadOrganizations();
    }
  }, [formData.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.role === "doctor") {
      if (!formData.organizationId) {
        newErrors.organizationId = "Please select an organization";
      }

      if (!formData.secretCode.trim()) {
        newErrors.secretCode = "Organization secret code is required";
      }

      if (!formData.specialty.trim()) {
        newErrors.specialty = "Medical specialty is required";
      }

      if (!formData.licenseNumber.trim()) {
        newErrors.licenseNumber = "Medical license number is required";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      if (formData.role === "doctor") {
        const isValidCode = await orgService.verifySecretCode(
          formData.organizationId,
          formData.secretCode,
        );

        if (!isValidCode) {
          setErrors({
            secretCode: "Invalid secret code for this organization",
          });
          setIsLoading(false);
          return;
        }

        const { data: authData, error: authError } = await authService.signUp({
          email: formData.email,
          password: formData.password,
          fullName: formData.name,
          role: formData.role,
          phone: formData.phone,
          org_id: parseInt(formData.organizationId),
          specialty: formData.specialty,
          license_number: formData.licenseNumber,
        });

        if (authError) {
          setErrors({
            email: authError.message || "Registration failed",
          });
          setIsLoading(false);
          return;
        }

        if (authData?.user) {
          setIsPendingApproval(true);
        }
      } else if (formData.role === "admin") {
        setErrors({
          email:
            "Admin accounts must be created by the system owner. Please contact support.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        email: error.message || "Registration failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fffe] dark:bg-[#061414] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e9fffd] via-white to-[#dffaf8] dark:from-[#061414] dark:via-[#092322] dark:to-[#03100f]" />

      <motion.div
        animate={{ y: [0, -25, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-24 left-10 w-80 h-80 bg-[#19d4ca] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />

      <motion.div
        animate={{ y: [0, 25, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-[#6ff7ef] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65 }}
        className="relative z-10 max-w-3xl w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-5 px-5 py-2.5 rounded-full bg-[#e1fffc] dark:bg-[#07312f] border border-[#baf8f3] dark:border-[#0d5c58] text-[#039b97] dark:text-[#5af7ee] text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            MediVue AI — Clinical Registration
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#02aaa5] to-[#20d7cf] mb-5 shadow-xl shadow-cyan-500/25"
          >
            <User className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl font-display font-black text-gray-900 dark:text-white mb-2">
            Create MediVue Account
          </h2>

          <p className="text-gray-600 dark:text-gray-400">
            Join the AI-powered medical diagnostics platform.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-white/90 dark:bg-[#0b2423]/90 backdrop-blur-2xl border border-cyan-100 dark:border-cyan-900 shadow-2xl">
          <div className="h-1.5 bg-gradient-to-r from-[#02aaa5] via-[#12cfc7] to-[#20d7cf]" />

          <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-teal-400/10 blur-3xl" />

          <div className="relative p-8">
            <div className="mb-7">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 text-center">
                Select Registration Type
              </label>

              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                {roles.map((role) => {
                  const RoleIcon = role.icon;
                  const active = formData.role === role.value;

                  return (
                    <motion.button
                      key={role.value}
                      type="button"
                      whileHover={{ y: -4, scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          role: role.value,
                        }))
                      }
                      className={`relative p-5 rounded-2xl border transition-all overflow-hidden ${
                        active
                          ? "border-[#05bdb8] bg-[#effefd] dark:bg-[#082f2d] shadow-lg shadow-cyan-500/10"
                          : "border-cyan-100 dark:border-cyan-900 hover:border-[#05bdb8] bg-white dark:bg-[#071918]"
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="role-indicator-register"
                          className="absolute inset-0 bg-gradient-to-br from-[#20d7cf]/10 to-transparent"
                        />
                      )}

                      <div
                        className={`relative z-10 w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center`}
                      >
                        <RoleIcon className="w-6 h-6 text-white" />
                      </div>

                      <div className="relative z-10 text-sm font-black text-gray-800 dark:text-white mb-1">
                        {role.label}
                      </div>

                      <div className="relative z-10 text-xs text-gray-500 dark:text-gray-400">
                        {role.description}
                      </div>

                      {active && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-6 h-6 bg-[#05bdb8] rounded-full flex items-center justify-center border-2 border-white dark:border-[#0b2423]"
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {isPendingApproval ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[2rem] p-8 text-center bg-[#effefd] dark:bg-[#082f2d] border border-cyan-100 dark:border-cyan-900"
              >
                <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                  Registration Pending Approval
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your doctor account has been created successfully. Please wait
                  for the organization administrator to approve your account.
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                  You will receive an email notification once approved.
                </p>

                <Button variant="outline" onClick={() => navigate("/login")}>
                  Go to Login Page
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    icon={<User className="w-5 h-5 text-[#05bdb8]" />}
                    placeholder="Dr. John Doe"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    icon={<Mail className="w-5 h-5 text-[#05bdb8]" />}
                    placeholder="john@hospital.com"
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    icon={<Phone className="w-5 h-5 text-[#05bdb8]" />}
                    placeholder="+91 9876543210"
                  />

                  {formData.role === "doctor" && (
                    <div>
                      <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                        <Building className="w-4 h-4 inline mr-1 text-[#05bdb8]" />
                        Select Organization
                      </label>

                      <select
                        name="organizationId"
                        value={formData.organizationId}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 rounded-2xl border bg-white dark:bg-[#0b2423] text-gray-900 dark:text-white focus:outline-none transition ${
                          errors.organizationId
                            ? "border-red-500"
                            : "border-cyan-100 dark:border-cyan-900 focus:border-[#05bdb8]"
                        }`}
                      >
                        <option value="">-- Select Organization --</option>
                        {organizations.map((org) => (
                          <option key={org.id} value={org.id}>
                            {org.name}
                          </option>
                        ))}
                      </select>

                      {errors.organizationId && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.organizationId}
                        </p>
                      )}
                    </div>
                  )}

                  {formData.role === "doctor" && (
                    <>
                      <Input
                        label="Organization Secret Code"
                        type="text"
                        name="secretCode"
                        value={formData.secretCode}
                        onChange={handleChange}
                        error={errors.secretCode}
                        icon={<Key className="w-5 h-5 text-[#05bdb8]" />}
                        placeholder="Enter 8-character code"
                        maxLength={8}
                      />

                      <Input
                        label="Medical Specialty"
                        type="text"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        error={errors.specialty}
                        icon={
                          <Stethoscope className="w-5 h-5 text-[#05bdb8]" />
                        }
                        placeholder="e.g., Hematology, Pathology"
                      />

                      <Input
                        label="Medical License Number"
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        error={errors.licenseNumber}
                        icon={
                          <ShieldCheck className="w-5 h-5 text-[#05bdb8]" />
                        }
                        placeholder="e.g., MD123456"
                      />
                    </>
                  )}
                </div>

                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  icon={<Lock className="w-5 h-5 text-[#05bdb8]" />}
                  placeholder="••••••••"
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  icon={<Lock className="w-5 h-5 text-[#05bdb8]" />}
                  placeholder="••••••••"
                />

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 mt-1 rounded border-cyan-200 text-[#05bdb8] focus:ring-[#05bdb8]"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-[#039b97] dark:text-[#5af7ee] font-bold hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-[#039b97] dark:text-[#5af7ee] font-bold hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </div>

                {formData.role === "doctor" && (
                  <div className="rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900 p-4">
                    <p className="text-sm text-cyan-800 dark:text-cyan-300">
                      <strong>Note:</strong> After registration, your account
                      will be pending approval by the organization
                      administrator.
                    </p>
                  </div>
                )}

                {formData.role === "admin" && (
                  <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4">
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      <strong>Admin Access:</strong> Admin accounts must be
                      created by the system owner.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={isLoading}
                  disabled={formData.role === "admin"}
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {formData.role === "admin"
                    ? "Contact Support"
                    : "Create Account"}
                </Button>
              </form>
            )}
          </div>
        </div>

        {!isPendingApproval && (
          <div className="mt-7 space-y-3">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#039b97] dark:text-[#5af7ee] font-black hover:underline"
              >
                Sign in
              </Link>
            </p>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Patient?{" "}
              <Link
                to="/public-reports"
                className="text-[#039b97] dark:text-[#5af7ee] font-black hover:underline"
              >
                View your test reports
              </Link>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RegisterPage;