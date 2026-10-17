import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    patientId: "",
    dateOfBirth: "",
    role: "doctor",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      value: "doctor",
      label: "Doctor",
      icon: Stethoscope,
      color: "from-[#02aaa5] to-[#20d7cf]",
      desc: "Clinical dashboard",
    },
    {
      value: "patient",
      label: "Patient",
      icon: User,
      color: "from-emerald-500 to-teal-500",
      desc: "Report access",
    },
    {
      value: "admin",
      label: "Admin",
      icon: ShieldCheck,
      color: "from-violet-500 to-fuchsia-500",
      desc: "System control",
    },
  ];

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

    if (formData.role === "patient") {
      if (!formData.patientId) {
        newErrors.patientId = "Medical Record Number is required";
      }

      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of Birth is required";
      }
    } else {
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
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

    const { data, error } = await login(
      formData.email,
      formData.password,
      formData.role,
      formData.patientId,
      formData.dateOfBirth,
    );

    setIsLoading(false);

    if (error) {
      setErrors({
        password: error.message || "Invalid login details",
      });
      return;
    }

    if (data?.profile) {
      const role = data.profile.role;
      navigate(`/dashboard/${role}`);
    } else {
      navigate("/");
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

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 items-center">
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75 }}
          className="hidden lg:block"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-[#e1fffc] dark:bg-[#07312f] border border-[#baf8f3] dark:border-[#0d5c58] text-[#039b97] dark:text-[#5af7ee] text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            MediVue AI — Secure Clinical Access
          </div>

          <h1 className="text-6xl font-display font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Welcome to
            <br />
            <span className="bg-gradient-to-r from-[#039b97] via-[#0fcac4] to-[#38e8dd] bg-clip-text text-transparent">
              MediVue AI
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed mb-10">
            Access AI-powered malaria screening, clinical reports, patient
            dashboards, and intelligent diagnostic workflows.
          </p>

          <div className="grid grid-cols-2 gap-5 max-w-xl">
            {[
              ["AI Screening", "Real-time malaria analysis", Brain],
              ["Secure Login", "Role-based dashboard access", ShieldCheck],
              ["Doctor Ready", "Reports and recommendations", Stethoscope],
              ["Patient Access", "Public report lookup", Users],
            ].map(([title, desc, Icon], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.08 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="rounded-3xl bg-white/80 dark:bg-[#0b2423]/80 border border-cyan-100 dark:border-cyan-900 p-5 shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#02aaa5] to-[#20d7cf] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-black text-gray-900 dark:text-white">
                  {title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="relative overflow-hidden rounded-[2rem] bg-white/90 dark:bg-[#0b2423]/90 backdrop-blur-2xl border border-cyan-100 dark:border-cyan-900 shadow-2xl">
            <div className="h-1.5 bg-gradient-to-r from-[#02aaa5] via-[#12cfc7] to-[#20d7cf]" />

            <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-teal-400/10 blur-3xl" />

            <div className="relative p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 15,
                  }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#02aaa5] to-[#20d7cf] mb-5 shadow-xl shadow-cyan-500/25"
                >
                  <Users className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-3xl font-display font-black text-gray-900 dark:text-white mb-2">
                  Sign in to MediVue
                </h2>

                <p className="text-gray-600 dark:text-gray-400">
                  Select your role and access your workspace
                </p>
              </div>

              {/* Role Selection */}
              <div className="mb-7">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  Select Your Role
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {roles.map((role) => {
                    const RoleIcon = role.icon;
                    const active = formData.role === role.value;

                    return (
                      <motion.button
                        type="button"
                        key={role.value}
                        whileHover={{ y: -4, scale: 1.04 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            role: role.value,
                          }))
                        }
                        className={`relative p-4 rounded-2xl border transition-all overflow-hidden ${
                          active
                            ? "border-[#05bdb8] bg-[#effefd] dark:bg-[#082f2d] shadow-lg shadow-cyan-500/10"
                            : "border-cyan-100 dark:border-cyan-900 hover:border-[#05bdb8] bg-white dark:bg-[#071918]"
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="role-indicator"
                            className="absolute inset-0 bg-gradient-to-br from-[#20d7cf]/10 to-transparent"
                          />
                        )}

                        <div
                          className={`relative z-10 w-11 h-11 mx-auto mb-2 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center`}
                        >
                          <RoleIcon className="w-5 h-5 text-white" />
                        </div>

                        <span className="relative z-10 block text-xs font-black text-gray-800 dark:text-white">
                          {role.label}
                        </span>

                        <span className="relative z-10 hidden sm:block text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                          {role.desc}
                        </span>

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

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {formData.role === "patient" ? (
                  <>
                    <Input
                      label="Medical Record Number"
                      type="text"
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleChange}
                      error={errors.patientId}
                      icon={<User className="w-5 h-5 text-[#05bdb8]" />}
                      placeholder="MRN-12345"
                    />

                    <Input
                      label="Date of Birth"
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      error={errors.dateOfBirth}
                      icon={<Lock className="w-5 h-5 text-[#05bdb8]" />}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      icon={<Mail className="w-5 h-5 text-[#05bdb8]" />}
                      placeholder="doctor@hospital.com"
                    />

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
                  </>
                )}

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-cyan-200 text-[#05bdb8] focus:ring-[#05bdb8]"
                    />
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      Remember me
                    </span>
                  </label>

                  {formData.role !== "patient" && (
                    <Link
                      to="/forgot-password"
                      className="text-[#039b97] dark:text-[#5af7ee] font-bold hover:underline"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={isLoading}
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Sign In
                </Button>
              </form>

              {/* Footer */}
              {formData.role !== "patient" ? (
                <p className="mt-7 text-center text-sm text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-[#039b97] dark:text-[#5af7ee] font-black hover:underline"
                  >
                    Create account
                  </Link>
                </p>
              ) : (
                <p className="mt-7 text-center text-sm text-gray-600 dark:text-gray-400">
                  Patients cannot register themselves. Please contact your
                  healthcare provider.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;