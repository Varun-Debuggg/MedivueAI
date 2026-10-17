import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  FileSearch,
  Hash,
  Search,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";

import Alert from "../components/Alert";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { supabase } from "../lib/supabase";
import { predictionService } from "../services";

const PublicReportPage = () => {
  const [searchData, setSearchData] = useState({
    patientId: "",
    registrationDate: "",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchData.patientId.trim()) {
      setError("Patient ID is required");
      return;
    }

    if (!searchData.registrationDate) {
      setError("Registration Date is required for verification");
      return;
    }

    setIsSearching(true);
    setError(null);
    setResults(null);

    try {
      const { data: patientData, error: patientError } = await supabase
        .from("patients")
        .select(
          "id, patient_id, name, age, gender, date_registered, medical_record_number",
        )
        .eq("patient_id", searchData.patientId.trim())
        .eq("date_registered", searchData.registrationDate)
        .single();

      if (patientError || !patientData) {
        throw new Error(
          "Patient not found or incorrect registration date. Please check your Patient ID and Registration Date.",
        );
      }

      const { data: predictions, error: predictionsError } =
        await predictionService.getPatientPredictions(patientData.id);

      if (predictionsError) throw predictionsError;

      if (!predictions || predictions.length === 0) {
        setError("No test results found for this patient.");
        setIsSearching(false);
        return;
      }

      setResults({
        patient: patientData,
        predictions,
      });
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Failed to fetch reports. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setSearchData({ patientId: "", registrationDate: "" });
    setResults(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fffe] dark:bg-[#061414] py-12 px-4 sm:px-6 lg:px-8">
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -22 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-5 py-2.5 rounded-full bg-[#e1fffc] dark:bg-[#07312f] border border-[#baf8f3] dark:border-[#0d5c58] text-[#039b97] dark:text-[#5af7ee] text-sm font-bold">
            <ShieldCheck className="w-4 h-4" />
            MediVue Patient Report Portal
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#02aaa5] to-[#20d7cf] mb-5 shadow-xl shadow-cyan-500/25"
          >
            <FileSearch className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-display font-black text-gray-900 dark:text-white mb-4">
            View Your Test Reports
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Securely access malaria screening reports using your Patient ID and
            registration date.
          </p>
        </motion.div>

        {!results && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="max-w-lg mx-auto" glassmorphism>
              <div className="text-center mb-7">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                  Patient Verification
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Enter your patient details to view available reports.
                </p>
              </div>

              {error && (
                <div className="mb-6">
                  <Alert
                    type="error"
                    message={error}
                    onClose={() => setError(null)}
                  />
                </div>
              )}

              <form onSubmit={handleSearch} className="space-y-6">
                <Input
                  label="Patient ID"
                  type="text"
                  name="patientId"
                  value={searchData.patientId}
                  onChange={handleChange}
                  placeholder="Enter your Patient ID e.g. P000123"
                  icon={<Hash className="w-5 h-5 text-[#05bdb8]" />}
                  required
                />

                <Input
                  label="Registration Date"
                  type="date"
                  name="registrationDate"
                  value={searchData.registrationDate}
                  onChange={handleChange}
                  icon={<Calendar className="w-5 h-5 text-[#05bdb8]" />}
                  required
                  helperText="Required for secure identity verification"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={isSearching}
                  icon={<Search className="w-5 h-5" />}
                >
                  View My Reports
                </Button>
              </form>

              <div className="mt-7 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900 p-4">
                <p className="text-sm text-cyan-800 dark:text-cyan-300">
                  <strong>Note:</strong> Your Patient ID can be found on your
                  patient card or test report shared by your doctor.
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#02aaa5] to-[#20d7cf] flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <User className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                      {results.patient.name}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400">
                      MRN: {results.patient.medical_record_number || "N/A"}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <Badge variant="primary">
                        Patient ID: {results.patient.patient_id}
                      </Badge>
                      <Badge variant="info">Age: {results.patient.age}</Badge>
                      <Badge variant="success">
                        {results.patient.gender}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" onClick={handleReset}>
                  New Search
                </Button>
              </div>
            </Card>

            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-5">
                Test Results ({results.predictions.length})
              </h3>

              <div className="grid gap-6">
                {results.predictions.map((sample, index) => (
                  <motion.div
                    key={sample.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Card>
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-5">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Test Date
                          </p>

                          <h4 className="text-xl font-black text-gray-900 dark:text-white">
                            {new Date(sample.sample_date).toLocaleDateString()}
                          </h4>
                        </div>

                        <Badge
                          variant={
                            sample.processing_status === "completed"
                              ? "success"
                              : sample.processing_status === "processing"
                              ? "pending"
                              : "danger"
                          }
                          pulse={sample.processing_status === "processing"}
                        >
                          {sample.processing_status}
                        </Badge>
                      </div>

                      {sample.predictions && sample.predictions.length > 0 ? (
                        <div className="space-y-4">
                          {sample.predictions.map((prediction) => {
                            const predicted =
                              prediction.predicted_class || "Unknown";

                            const isPositive =
                              predicted.toLowerCase() === "parasitized" ||
                              predicted.toLowerCase() === "infected";

                            return (
                              <div
                                key={prediction.id}
                                className="rounded-3xl bg-[#effefd] dark:bg-[#082f2d] border border-cyan-100 dark:border-cyan-900 p-5"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-sm">
                                  <div>
                                    <span className="text-gray-600 dark:text-gray-400 block mb-1">
                                      Result
                                    </span>
                                    <span
                                      className={`font-black ${
                                        isPositive
                                          ? "text-red-600 dark:text-red-400"
                                          : "text-green-600 dark:text-green-400"
                                      }`}
                                    >
                                      {predicted}
                                    </span>
                                  </div>

                                  <div>
                                    <span className="text-gray-600 dark:text-gray-400 block mb-1">
                                      Confidence
                                    </span>
                                    <span className="font-black text-gray-900 dark:text-white">
                                      {(
                                        prediction.confidence_score * 100
                                      ).toFixed(1)}
                                      %
                                    </span>
                                  </div>

                                  <div>
                                    <span className="text-gray-600 dark:text-gray-400 block mb-1">
                                      Tested By
                                    </span>
                                    <span className="font-bold text-gray-900 dark:text-white">
                                      {prediction.doctor?.name || "N/A"}
                                    </span>
                                  </div>

                                  <div>
                                    <span className="text-gray-600 dark:text-gray-400 block mb-1">
                                      Test ID
                                    </span>
                                    <span className="font-mono text-xs text-gray-900 dark:text-white">
                                      #{prediction.id}
                                    </span>
                                  </div>
                                </div>

                                {sample.storage_url && (
                                  <div className="mt-5">
                                    <img
                                      src={sample.storage_url}
                                      alt="Blood sample"
                                      className="w-40 h-40 object-cover rounded-2xl border border-cyan-100 dark:border-cyan-900"
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm mt-2">
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                          Test results pending...
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-1" />
                <div>
                  <h4 className="font-black text-amber-800 dark:text-amber-200 mb-2">
                    Important Medical Disclaimer
                  </h4>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 list-disc list-inside">
                    <li>
                      These results are AI-generated and should be confirmed by
                      a medical professional.
                    </li>
                    <li>
                      Please consult your doctor for proper diagnosis and
                      treatment.
                    </li>
                    <li>
                      Do not make medical decisions based solely on these
                      results.
                    </li>
                    <li>
                      Contact your healthcare provider if you have any
                      questions.
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PublicReportPage;