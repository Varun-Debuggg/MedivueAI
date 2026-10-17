import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Brain,
  CheckCircle,
  Clock,
  FileSearch,
  Globe,
  HeartPulse,
  LineChart,
  Microscope,
  ScanLine,
  Shield,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Upload,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import FeatureCard from "../components/FeatureCard";
import TestimonialCard from "../components/TestimonialCard";

const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: "Deep Learning Diagnosis",
      description:
        "MediVue AI analyzes blood smear images using advanced AI to support faster malaria screening and clinical review.",
    },
    {
      icon: Zap,
      title: "Real-Time Screening",
      description:
        "Upload a sample and receive prediction, confidence score, risk level, and recommendation within seconds.",
    },
    {
      icon: Shield,
      title: "Hospital Grade Security",
      description:
        "Designed for secure healthcare workflows with role-based access for doctors, patients, and administrators.",
    },
    {
      icon: LineChart,
      title: "Clinical Insights",
      description:
        "Track results, confidence trends, risk levels, and diagnostic history from one intelligent medical dashboard.",
    },
    {
      icon: Users,
      title: "Role-Based Platform",
      description:
        "Dedicated workflows for doctors, patients, and administrators with clean, focused medical dashboards.",
    },
    {
      icon: Microscope,
      title: "Grad-CAM Explainability",
      description:
        "Visual AI attention maps can highlight important image regions for transparent AI-assisted decisions.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Upload Sample",
      description:
        "Upload a microscopic blood smear image securely from the detection workspace.",
      icon: Upload,
    },
    {
      step: "02",
      title: "AI Screening",
      description:
        "MediVue preprocesses the image and checks for malaria parasite patterns using 7-channel analysis.",
      icon: FileSearch,
    },
    {
      step: "03",
      title: "Clinical Report",
      description:
        "Get result, confidence, risk level, recommendation, and report-ready summary.",
      icon: Award,
    },
  ];

  const benefits = [
    "Reduce diagnosis turnaround time",
    "Support malaria screening in remote areas",
    "Provide confidence score with every result",
    "Assist doctors with faster clinical decisions",
    "Enable patient report access",
    "Improve hospital and lab workflow efficiency",
  ];

  const testimonials = [
    {
      name: "Pathology Lab",
      role: "Clinical Testing",
      hospital: "Healthcare Partner",
      content:
        "MediVue AI reduced diagnosis turnaround time and made malaria screening workflow smoother for our lab team.",
    },
    {
      name: "Research Center",
      role: "AI Diagnostics",
      hospital: "Medical Institute",
      content:
        "The explainable AI reports improve confidence during clinical review, validation, and training.",
    },
    {
      name: "Rural Healthcare Unit",
      role: "Field Screening",
      hospital: "Community Program",
      content:
        "Fast malaria screening helps us serve remote patients more efficiently and prioritize urgent cases.",
    },
  ];

  const stats = [
    { value: "98.6%", label: "AI Accuracy" },
    { value: "<10s", label: "Detection Time" },
    { value: "7-Channel", label: "Image Analysis" },
    { value: "24/7", label: "Cloud Access" },
  ];

  const trustedBy = [
    "Apollo Labs",
    "MedCare",
    "AIIMS Research",
    "Rural HealthNet",
    "PathoCloud",
  ];

  const dashboardItems = [
    {
      icon: Microscope,
      title: "AI Detection",
      value: "Live",
      desc: "Blood smear screening",
    },
    {
      icon: ShieldCheck,
      title: "Risk Review",
      value: "Smart",
      desc: "Clinical decision support",
    },
    {
      icon: FileSearch,
      title: "Reports",
      value: "Ready",
      desc: "Doctor-ready summaries",
    },
    {
      icon: LineChart,
      title: "Analytics",
      value: "Visual",
      desc: "Trends and confidence",
    },
  ];

  const globalReach = [
    "India",
    "USA",
    "UK",
    "Germany",
    "Japan",
    "Canada",
  ];

  return (
    <div className="overflow-hidden bg-[#f8fffe] dark:bg-[#061414]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e9fffd] via-white to-[#dffaf8] dark:from-[#061414] dark:via-[#092322] dark:to-[#03100f]" />

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -24, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute top-24 left-10 w-80 h-80 bg-[#19d4ca] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ y: [0, 24, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-44 right-10 w-96 h-96 bg-[#6ff7ef] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
            transition={{ duration: 9, repeat: Infinity }}
            className="absolute bottom-20 left-1/2 w-80 h-80 bg-[#0caeaa] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
        </div>

        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="hidden xl:flex absolute left-12 top-44 w-16 h-16 rounded-3xl bg-white dark:bg-[#0b2423] shadow-2xl border border-cyan-100 dark:border-cyan-900 items-center justify-center"
        >
          <Brain className="w-8 h-8 text-[#05bdb8]" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 5.5, repeat: Infinity }}
          className="hidden xl:flex absolute right-16 bottom-44 w-16 h-16 rounded-3xl bg-white dark:bg-[#0b2423] shadow-2xl border border-cyan-100 dark:border-cyan-900 items-center justify-center"
        >
          <ShieldCheck className="w-8 h-8 text-[#05bdb8]" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-[#e1fffc] dark:bg-[#07312f] border border-[#baf8f3] dark:border-[#0d5c58] text-[#039b97] dark:text-[#5af7ee] text-sm font-bold"
              >
                <Sparkles className="w-4 h-4" />
                MediVue AI — See Beyond Symptoms
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                Advanced AI
                <br />
                <span className="bg-gradient-to-r from-[#039b97] via-[#0fcac4] to-[#38e8dd] bg-clip-text text-transparent">
                  Diagnostics
                </span>
                <br />
                for Modern Care
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl leading-relaxed"
              >
                Empowering doctors, hospitals, and laboratories with real-time
                malaria screening, intelligent reports, and AI-assisted clinical
                decision support.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/detection">
                  <Button
                    size="lg"
                    icon={<ArrowRight className="w-5 h-5" />}
                    className="bg-gradient-to-r from-[#02aaa5] to-[#20d7cf] hover:shadow-xl hover:shadow-cyan-500/30"
                  >
                    Start Diagnosis
                  </Button>
                </Link>

                <Link to="/public-reports">
                  <Button
                    variant="outline"
                    size="lg"
                    icon={<FileSearch className="w-5 h-5" />}
                  >
                    View Reports
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -6, scale: 1.03 }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.75 + index * 0.1 }}
                    className="rounded-2xl bg-white/80 dark:bg-[#0b2423]/80 border border-[#d7fbf8] dark:border-[#124945] p-5 shadow-lg"
                  >
                    <div className="text-2xl font-extrabold bg-gradient-to-r from-[#039b97] to-[#1bd9cf] bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="relative rounded-[2.5rem] bg-white dark:bg-[#0b2423] border border-[#d7fbf8] dark:border-[#124945] shadow-2xl overflow-hidden"
              >
                <div className="h-12 bg-gradient-to-r from-[#04bdb7] to-[#24ded3] flex items-center gap-2 px-6">
                  <span className="w-3 h-3 rounded-full bg-white/80" />
                  <span className="w-3 h-3 rounded-full bg-white/60" />
                  <span className="w-3 h-3 rounded-full bg-white/40" />
                  <span className="ml-auto text-white text-sm font-bold">
                    MediVue Clinical Console
                  </span>
                </div>

                <div className="p-7 space-y-5">
                  <div className="rounded-3xl bg-[#effefd] dark:bg-[#082f2d] p-5 border border-[#c8f8f4] dark:border-[#155b56]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          AI Result
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Malaria Screening
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="p-3 rounded-2xl bg-[#05bdb8]"
                      >
                        <Brain className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-white dark:bg-[#0e3936] p-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Confidence
                        </p>
                        <p className="text-3xl font-black text-[#039b97]">
                          98.6%
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white dark:bg-[#0e3936] p-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Time
                        </p>
                        <p className="text-3xl font-black text-[#039b97]">
                          8s
                        </p>
                      </div>
                    </div>
                  </div>

                  {[
                    ["Upload smear image", "Completed", CheckCircle],
                    ["AI preprocessing", "7-channel analysis", Microscope],
                    ["Clinical report", "Ready for doctor review", FileSearch],
                  ].map(([title, desc, Icon]) => (
                    <motion.div
                      whileHover={{ x: 6 }}
                      key={title}
                      className="flex items-center gap-4 rounded-2xl bg-gray-50 dark:bg-[#071918] p-4 border border-gray-100 dark:border-[#123b38]"
                    >
                      <div className="p-3 rounded-xl bg-[#dffdfa] dark:bg-[#0d4a46]">
                        <Icon className="w-5 h-5 text-[#039b97] dark:text-[#5af7ee]" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#071918] border-y border-cyan-50 dark:border-cyan-950">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 font-bold tracking-[0.2em] text-xs">
            TRUSTED BY MODERN HEALTHCARE WORKFLOWS
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {trustedBy.map((hospital, index) => (
              <motion.div
                key={hospital}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ delay: index * 0.07 }}
                className="rounded-2xl bg-[#f8fffe] dark:bg-[#0b2423] border border-cyan-100 dark:border-cyan-900 p-5 text-center font-black text-gray-700 dark:text-white shadow-lg"
              >
                {hospital}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#071918]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#039b97] font-bold">MediVue Features</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mt-3 mb-4">
              Built for Smart Medical Workflows
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything needed for fast, clean, and AI-assisted malaria
              screening in one platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#effefd] dark:bg-[#061414]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#039b97] font-bold">Clinical Dashboard</span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mt-3 mb-6">
                One workspace for AI diagnosis, reports, and clinical review
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                MediVue gives doctors, labs, and administrators a clean workflow
                to upload samples, review AI results, generate reports, and
                monitor screening activity.
              </p>

              <div className="space-y-4">
                {[
                  "Doctor-ready malaria reports",
                  "Patient report lookup",
                  "Admin analytics and system logs",
                  "Explainable AI support with Grad-CAM",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-[#05bdb8] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 text-lg">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] bg-[#081c1b] p-5 shadow-2xl border border-cyan-900"
            >
              <div className="h-12 bg-gradient-to-r from-[#04bdb7] to-[#24ded3] rounded-2xl flex items-center gap-2 px-5 mb-5">
                <span className="w-3 h-3 rounded-full bg-white/80" />
                <span className="w-3 h-3 rounded-full bg-white/60" />
                <span className="w-3 h-3 rounded-full bg-white/40" />
                <span className="ml-auto text-white text-sm font-bold">
                  Dashboard Preview
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dashboardItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      whileHover={{ y: -6, scale: 1.02 }}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="rounded-3xl bg-[#0d2b29] border border-cyan-900 p-5"
                    >
                      <div className="flex items-center justify-between mb-5">
                        <div className="p-3 rounded-2xl bg-[#143d3a]">
                          <Icon className="w-6 h-6 text-[#5af7ee]" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#20d7cf]/15 text-[#5af7ee] text-xs font-bold">
                          {item.value}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-lg">{item.title}</h3>
                      <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#071918]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#039b97] font-bold">Simple Process</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mt-3 mb-4">
              How MediVue Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Upload, analyze, and review results in three clear steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-[#05bdb8] to-[#7ef8f0] -translate-x-4" />
                )}

                <motion.div
                  whileHover={{ y: -8 }}
                  className="rounded-[2rem] p-8 text-center bg-[#effefd] dark:bg-[#0b2423] border border-[#d7fbf8] dark:border-[#124945] shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#02aaa5] to-[#20d7cf] text-white text-2xl font-black mb-6">
                    {step.step}
                  </div>
                  <step.icon className="w-12 h-12 mx-auto mb-4 text-[#039b97] dark:text-[#5af7ee]" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Strip */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#effefd] dark:bg-[#061414]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { value: "50K+", label: "Images Analyzed", icon: Microscope },
            { value: "98.6%", label: "AI Accuracy", icon: Brain },
            { value: "120+", label: "Clinical Workflows", icon: Stethoscope },
            { value: "24/7", label: "Cloud Availability", icon: Globe },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] bg-white dark:bg-[#0b2423] border border-cyan-100 dark:border-cyan-900 p-6 text-center shadow-xl"
              >
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#02aaa5] to-[#20d7cf] flex items-center justify-center">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-4xl font-black text-[#039b97]">{item.value}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#071918]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#039b97] font-bold">Hospital Benefits</span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mt-3 mb-6">
                Better Screening, Faster Decisions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                MediVue AI helps doctors and labs reduce delay, improve
                workflow, and support clinical decision-making.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-[#05bdb8] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 text-lg">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[2rem] p-8 space-y-6 bg-[#effefd] dark:bg-[#0b2423] border border-[#d7fbf8] dark:border-[#124945] shadow-2xl">
                {[
                  [Clock, "Time Saved", "95%"],
                  [CheckCircle, "AI Confidence", "98.6%"],
                  [Users, "Workflow Support", "24/7"],
                  [HeartPulse, "Clinical Review", "Smart"],
                ].map(([Icon, label, value]) => (
                  <motion.div
                    whileHover={{ x: 6 }}
                    key={label}
                    className="flex items-center justify-between p-5 bg-white dark:bg-[#071918] rounded-2xl border border-[#d7fbf8] dark:border-[#124945]"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6 text-[#039b97]" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {label}
                      </span>
                    </div>
                    <span className="text-2xl font-black text-[#039b97]">
                      {value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#effefd] dark:bg-[#061414]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#039b97] font-bold">Global Reach</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mt-3 mb-4">
              Built for distributed healthcare teams
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              MediVue is designed for hospitals, labs, field programs, and
              remote healthcare screening environments.
            </p>
          </motion.div>

          <div className="rounded-[2.5rem] bg-white dark:bg-[#0b2423] border border-cyan-100 dark:border-cyan-900 shadow-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {globalReach.map((country, index) => (
                <motion.div
                  key={country}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-2xl bg-[#effefd] dark:bg-[#082f2d] border border-cyan-100 dark:border-cyan-900 p-5 text-center"
                >
                  <div className="mx-auto mb-3 w-3 h-3 rounded-full bg-[#05bdb8] shadow-lg shadow-cyan-400/40" />
                  <p className="font-bold text-gray-900 dark:text-white">
                    {country}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#071918]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#039b97] font-bold">Healthcare Feedback</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mt-3 mb-4">
              Designed for Real Clinical Use
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Useful for labs, clinics, hospitals, and rural healthcare teams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#effefd] dark:bg-[#061414]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden max-w-5xl mx-auto text-center rounded-[2.5rem] p-12 shadow-2xl bg-gradient-to-br from-[#02aaa5] via-[#20d7cf] to-[#b9fff9]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/30"
          />

          <ScanLine className="mx-auto w-12 h-12 text-white mb-5" />

          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
            Ready to Experience MediVue AI?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            AI-powered malaria detection, explainable reports, and intelligent
            healthcare workflows in one platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/detection">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#039b97] hover:bg-gray-100"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Upload Sample
              </Button>
            </Link>

            <Link to="/public-reports">
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10"
                icon={<FileSearch className="w-5 h-5" />}
              >
                View Reports
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
