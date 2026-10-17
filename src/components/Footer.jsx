import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  FileSearch,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", path: "/#features" },
      { name: "AI Detection", path: "/detection" },
      { name: "How It Works", path: "/#how-it-works" },
      { name: "Reports", path: "/public-reports" },
    ],
    platform: [
      { name: "Doctor Dashboard", path: "/dashboard/doctor" },
      { name: "Patient Dashboard", path: "/dashboard/patient" },
      { name: "Admin Dashboard", path: "/dashboard/admin" },
      { name: "Public Reports", path: "/public-reports" },
    ],
    resources: [
      { name: "Documentation", path: "/docs" },
      { name: "API Reference", path: "/api" },
      { name: "Support", path: "/support" },
      { name: "FAQs", path: "/faqs" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Clinical Disclaimer", path: "/compliance" },
      { name: "Security", path: "/security" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/", label: "Twitter" },
  ];

  const highlights = [
    {
      icon: Brain,
      title: "AI Screening",
      text: "Real-time malaria detection",
    },
    {
      icon: FileSearch,
      title: "Smart Reports",
      text: "Doctor-ready result summaries",
    },
    {
      icon: ShieldCheck,
      title: "Secure Workflow",
      text: "Built for medical data safety",
    },
  ];

  const linkClass =
    "text-sm text-slate-300 hover:text-[#5af7ee] transition-colors inline-flex items-center gap-1 group";

  return (
    <footer className="relative mt-20 overflow-hidden bg-[#061414] text-slate-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(32,215,207,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(5,189,184,0.2),transparent_35%)]" />
      <div className="absolute -top-24 left-10 w-72 h-72 rounded-full bg-[#20d7cf]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#05bdb8]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 rounded-[2rem] border border-cyan-400/20 bg-white/8 backdrop-blur-xl p-6 sm:p-8 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#20d7cf]/15 text-[#5af7ee] text-sm font-bold mb-4">
                <Sparkles className="w-4 h-4" />
                MediVue AI — See Beyond Symptoms
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                Start smarter malaria screening today
              </h2>

              <p className="mt-3 max-w-2xl text-slate-300">
                Upload blood smear images, get AI-assisted results, and create
                clinical-ready reports in one modern healthcare platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/detection">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#02aaa5] to-[#20d7cf] text-white font-extrabold shadow-lg shadow-cyan-500/20"
                >
                  Upload Sample
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link to="/public-reports">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-cyan-300/30 text-[#8dfcf5] font-bold hover:bg-white/10 transition-colors"
                >
                  View Reports
                  <FileSearch className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center space-x-3 group mb-5">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.08 }}
                transition={{ duration: 0.65 }}
                className="relative bg-gradient-to-br from-[#04bdb7] via-[#18d6cf] to-[#91fff7] p-3 rounded-2xl shadow-lg shadow-cyan-500/20"
              >
                <Activity className="w-7 h-7 text-white" />
                <span className="absolute -right-1 -top-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#061414]" />
              </motion.div>

              <div className="flex flex-col">
                <span className="text-2xl font-display font-extrabold text-white">
                  MediVue AI
                </span>
                <span className="text-xs text-[#8dfcf5] font-medium">
                  See Beyond Symptoms
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 mb-6 max-w-md leading-relaxed">
              AI-powered medical diagnostics platform for malaria screening,
              clinical insights, report generation, and faster healthcare
              decisions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 mb-6">
              {highlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center gap-3 rounded-2xl bg-white/6 border border-white/10 p-3"
                  >
                    <div className="p-2 rounded-xl bg-[#20d7cf]/15">
                      <Icon className="w-5 h-5 text-[#5af7ee]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-400">{item.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-2xl bg-white/8 hover:bg-[#20d7cf] text-slate-300 hover:text-white border border-white/10 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className={linkClass}>
                      {link.name}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className={linkClass}>
                      {link.name}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className={linkClass}>
                      {link.name}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className={linkClass}>
                      {link.name}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="py-9 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-start space-x-3 rounded-2xl bg-white/6 border border-white/10 p-4"
            >
              <Mail className="w-5 h-5 text-[#5af7ee] mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">Email</p>
                <a
                  href="mailto:support@medivue.ai"
                  className="text-sm text-slate-400 hover:text-[#5af7ee] transition-colors"
                >
                  support@medivue.ai
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-start space-x-3 rounded-2xl bg-white/6 border border-white/10 p-4"
            >
              <Phone className="w-5 h-5 text-[#5af7ee] mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">Phone</p>
                <a
                  href="tel:+918418069880"
                  className="text-sm text-slate-400 hover:text-[#5af7ee] transition-colors"
                >
                  +91 84180 69880
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-start space-x-3 rounded-2xl bg-white/6 border border-white/10 p-4"
            >
              <MapPin className="w-5 h-5 text-[#5af7ee] mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">Location</p>
                <p className="text-sm text-slate-400">
                  India • Cloud Medical Workspace
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} MediVue AI. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#5af7ee]" />
              Made for smarter healthcare
            </span>
            <span className="hidden sm:inline">•</span>
            <span>AI screening support only</span>
            <span className="hidden sm:inline">•</span>
            <span>Clinical confirmation required</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;