import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Brain,
  CheckCircle,
  Download,
  Microscope,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../components/Alert";
import Button from "../components/Button";
import ImageUpload from "../components/ImageUpload";
import ProgressBar from "../components/ProgressBar";
import ResultCard from "../components/ResultCard";

import { useAuth } from "../contexts/AuthContext";
import { mlService, predictionService, testService } from "../services";

import { generateDoctorReport } from "../utils/pdfGenerator";
import { formatTestForDoctorReport } from "../utils/reportHelpers";

const DetectionPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [rawResult, setRawResult] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const handleUpload = (file, preview) => {
    setUploadedFile(file);
    setUploadedImage(preview);
    setResult(null);
    setRawResult(null);
    setError(null);
  };

  const startAnalysis = async () => {
    if (!uploadedFile) {
      setError("Please upload a blood smear image first.");
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setError(null);
    setResult(null);
    setRawResult(null);

    let progressInterval;

    try {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 12;
        });
      }, 350);

      let apiResult = null;
      let predictionError = null;

      try {
        const response = await predictionService.createPrediction({
          imageFile: uploadedFile,
          patientId: 1,
          doctorId: profile?.role === "doctor" ? profile.id : null,
          useDetailed: true,
          useTTA: false,
        });

        apiResult = response.data;
        predictionError = response.error;
      } catch (completeFlowError) {
        console.warn("Complete prediction failed, trying demo endpoint:", completeFlowError);

        const response = await mlService.predictDemo(uploadedFile, false);
        apiResult = response.data;
        predictionError = response.error;
      }

      clearInterval(progressInterval);
      setProgress(100);

      if (predictionError) {
        throw new Error(predictionError.message || "Failed to analyze image");
      }

      const transformedResult = mlService.transformDetailedPrediction(
        apiResult,
        uploadedImage,
      );

      try {
        const testResult = {
          patient_id: 1,
          doctor_id:
            profile?.role === "doctor" || profile?.role === "admin"
              ? user?.id
              : null,
          result:
            transformedResult.status === "infected" ? "positive" : "negative",
          confidence: transformedResult.confidence,
          status: "completed",
          parasite_species:
            transformedResult.details?.predicted_class || "General",
          image_url:
            apiResult?.blood_sample?.storage_url ||
            apiResult?.storage_url ||
            uploadedImage,
          parasitized_probability:
            transformedResult.details?.parasitized_probability || null,
          uninfected_probability:
            transformedResult.details?.uninfected_probability || null,
          image_quality:
            transformedResult.details?.image_quality ||
            transformedResult.qualityScore ||
            "Good",
          additional_notes: `Analysis performed on ${new Date().toLocaleString()}`,
        };

        const { data: savedTest, error: saveError } =
          await testService.createTest(testResult);

        if (saveError) {
          console.error("Failed to save test result:", saveError);
        } else if (savedTest?.id) {
          transformedResult.testId = savedTest.id;
        }
      } catch (saveErr) {
        console.error("Error saving test result:", saveErr);
      }

      setTimeout(() => {
        setRawResult(apiResult);
        setResult(transformedResult);
        setIsAnalyzing(false);
      }, 450);
    } catch (err) {
      console.error("Analysis error:", err);

      let errorMessage = err.message || "An error occurred during analysis";

      if (
        errorMessage.includes("LocalTunnel") ||
        errorMessage.includes("407") ||
        errorMessage.includes("511")
      ) {
        errorMessage = `LocalTunnel setup required. Open ${
          import.meta.env.VITE_ML_API_URL
        } in a new browser tab, continue once, then try again.`;
      } else if (
        errorMessage.includes("fetch") ||
        errorMessage.includes("Failed to fetch")
      ) {
        errorMessage =
          "Cannot connect to AI server. Please ensure FastAPI backend is running on http://127.0.0.1:8000";
      }

      clearInterval(progressInterval);
      setError(errorMessage);
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setResult(null);
    setRawResult(null);
    setProgress(0);
    setIsAnalyzing(false);
    setError(null);
  };

  const handleDownloadReport = () => {
    if (!result) return;

    const testData = formatTestForDoctorReport(
      {
        id: result.testId || rawResult?.prediction?.id || null,
        patientName: "Patient",
        patientId: "TMP-001",
        testDate: new Date().toLocaleDateString(),
        testType: "Malaria Detection Test",
        result: result.status === "infected" ? "Positive" : "Negative",
        confidence: result.confidence,
        status: "Completed",
        predictedClass: result.details?.predicted_class || result.status,
        parasitizedProb: result.details?.parasitized_probability || "N/A",
        uninfectedProb: result.details?.uninfected_probability || "N/A",
        imageQuality:
          result.details?.image_quality || result.qualityScore || "Good",
        notes: `AI screening report generated on ${new Date().toLocaleString()}`,
      },
      profile,
    );

    generateDoctorReport(testData);
  };

  const isPositive = result?.status === "infected";

  return (
    <div className="min-h-screen bg-[#f7fbfb] dark:bg-[#081414] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0bb8b6] via-[#25d6c9] to-[#eafffb] dark:from-[#062626] dark:via-[#073c3a] dark:to-[#09211f] border border-cyan-100 dark:border-cyan-900 shadow-2xl"
        >
          <div className="relative p-7 sm:p-10">
            <div className="absolute right-8 top-8 hidden md:block opacity-20">
              <Microscope className="w-36 h-36 text-white" />
            </div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-white/90 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-5 backdrop-blur">
                  <Sparkles className="w-4 h-4" />
                  MalariNet AI Screening
                </div>

                <h1 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight">
                  AI Malaria Detection
                </h1>

                <p className="mt-4 max-w-2xl text-white/90 text-lg">
                  Upload a microscopic blood smear image and get instant AI
                  screening with confidence score, risk level, and clinical
                  recommendation.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 min-w-full md:min-w-[360px]">
                <div className="rounded-2xl bg-white/20 p-4 text-white backdrop-blur">
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-xs opacity-90">Input Channels</p>
                </div>
                <div className="rounded-2xl bg-white/20 p-4 text-white backdrop-blur">
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-xs opacity-90">Model Accuracy</p>
                </div>
                <div className="rounded-2xl bg-white/20 p-4 text-white backdrop-blur">
                  <p className="text-2xl font-bold">AI</p>
                  <p className="text-xs opacity-90">Fast Screening</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
                <div className="rounded-[2rem] bg-white dark:bg-[#0d1f1f] border border-cyan-100 dark:border-cyan-900 shadow-xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-900/40">
                      <Microscope className="w-7 h-7 text-[#00aaa6]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Upload Blood Sample
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        JPG, PNG, WEBP supported. Max 10MB.
                      </p>
                    </div>
                  </div>

                  <ImageUpload onUpload={handleUpload} maxSize={10} />

                  {uploadedImage && !isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-7 rounded-3xl bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/30 border border-cyan-100 dark:border-cyan-800 p-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Ready for AI Analysis
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Your image is ready. Start analysis to detect possible
                        malaria parasite patterns.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={startAnalysis}
                          variant="primary"
                          size="lg"
                          icon={<Brain className="w-5 h-5" />}
                          className="bg-[#05bdb8] hover:bg-[#059f9b]"
                        >
                          Start AI Analysis
                        </Button>

                        <Button
                          onClick={resetAnalysis}
                          variant="outline"
                          size="lg"
                        >
                          Upload Different Image
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="rounded-[2rem] bg-white dark:bg-[#0d1f1f] border border-cyan-100 dark:border-cyan-900 shadow-xl p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
                    Clinical AI Workflow
                  </h3>

                  <div className="space-y-4">
                    {[
                      ["Image Preprocessing", "CLAHE + edge detection"],
                      ["CNN Inference", "7-channel microscopy input"],
                      ["Risk Analysis", "Confidence and quality scoring"],
                      ["Report Output", "Doctor-ready summary"],
                    ].map(([title, desc], index) => (
                      <div
                        key={title}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900"
                      >
                        <div className="w-9 h-9 rounded-full bg-[#07bdb8] text-white flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-5 rounded-2xl bg-[#eefdfb] dark:bg-[#062626] border border-cyan-100 dark:border-cyan-900">
                    <div className="flex items-center gap-3 text-[#059f9b]">
                      <ShieldCheck className="w-6 h-6" />
                      <strong>Medical Disclaimer</strong>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      AI result is for screening support only. Final diagnosis
                      should be confirmed by certified clinical professionals.
                    </p>
                  </div>
                </div>
              </div>

              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 rounded-[2rem] bg-white dark:bg-[#0d1f1f] border border-cyan-100 dark:border-cyan-900 shadow-xl p-8"
                >
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.08, 1] }}
                      transition={{
                        rotate: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: {
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#02b8b3] to-[#66eee4] mb-6 shadow-lg"
                    >
                      <Brain className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      Analyzing Sample...
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      MalariNet is examining the smear image.
                    </p>
                  </div>

                  <ProgressBar
                    progress={progress}
                    label="Analysis Progress"
                    color="primary"
                  />

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-3">
                    {[
                      [25, "Image preprocessing complete"],
                      [50, "Blood cell features extracted"],
                      [75, "Parasite pattern detection"],
                      [100, "Final report generated"],
                    ].map(([step, text]) => (
                      <div
                        key={text}
                        className={`p-4 rounded-2xl border ${
                          progress >= step
                            ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                            : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                        }`}
                      >
                        <CheckCircle
                          className={`w-5 h-5 mb-2 ${
                            progress >= step
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {!uploadedImage && !isAnalyzing && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {[
                    {
                      icon: Brain,
                      title: "AI-Powered",
                      desc: "Deep learning model trained for blood smear analysis.",
                      color: "cyan",
                    },
                    {
                      icon: CheckCircle,
                      title: "Fast Screening",
                      desc: "Get result and confidence score within seconds.",
                      color: "green",
                    },
                    {
                      icon: AlertTriangle,
                      title: "Clinical Support",
                      desc: "Risk level and recommendation for doctor review.",
                      color: "amber",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + index * 0.1 }}
                        className="p-6 rounded-[1.5rem] bg-white dark:bg-[#0d1f1f] border border-cyan-100 dark:border-cyan-900 shadow-lg"
                      >
                        <Icon className="w-10 h-10 text-[#05aaa6] mb-4" />
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="space-y-6"
            >
              <div
                className={`rounded-[2rem] p-6 sm:p-8 border shadow-xl ${
                  isPositive
                    ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                    : "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-4 rounded-2xl ${
                      isPositive ? "bg-red-500" : "bg-emerald-500"
                    }`}
                  >
                    {isPositive ? (
                      <AlertTriangle className="w-8 h-8 text-white" />
                    ) : (
                      <ShieldCheck className="w-8 h-8 text-white" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      AI Screening Result
                    </p>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                      {result.prediction || result.details?.predicted_class}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Confidence:{" "}
                      <strong>{result.confidence || "N/A"}%</strong> • Risk:{" "}
                      <strong>{result.riskLevel || "N/A"}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <ResultCard {...result} />

              <div className="rounded-[2rem] bg-white dark:bg-[#0d1f1f] border border-cyan-100 dark:border-cyan-900 shadow-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  AI Recommendation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {result.recommendation ||
                    "Please confirm this AI screening result with a medical professional."}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={resetAnalysis}
                  variant="primary"
                  size="lg"
                  className="flex-1 bg-[#05bdb8] hover:bg-[#059f9b]"
                  icon={<Brain className="w-5 h-5" />}
                >
                  Analyze Another Sample
                </Button>

                <Button
                  onClick={handleDownloadReport}
                  variant="outline"
                  size="lg"
                  icon={<Download className="w-5 h-5" />}
                >
                  Download Report
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  icon={<Share2 className="w-5 h-5" />}
                >
                  Share Results
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DetectionPage;