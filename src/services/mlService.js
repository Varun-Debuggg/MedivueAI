/**
 * Machine Learning API Service
 * Handles all interactions with the FastAPI ML model endpoints
 * Works without Supabase auth (optional bearer token support)
 */

// Ensure ML_API_URL has proper protocol
const ensureProtocol = (url) => {
  if (!url) return "http://127.0.0.1:8000";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // If no protocol, add https (works for production)
  return `https://${url}`;
};

const ML_API_URL = ensureProtocol(
  import.meta.env.VITE_ML_API_URL ||
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000",
);

const STATIC_BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN || "";

/**
 * Get optional bearer token from env/localStorage.
 */
const getAuthToken = () => {
  if (STATIC_BEARER_TOKEN) return STATIC_BEARER_TOKEN;
  try {
    return localStorage.getItem("api_bearer_token") || "";
  } catch {
    return "";
  }
};

/**
 * Common fetch options with JWT and bypass headers
 */
const getFetchOptions = async (
  method,
  body = null,
  isFormData = false,
  skipAuth = false,
) => {
  const options = {
    method,
    headers: {
      "Bypass-Tunnel-Reminder": "true",
      "User-Agent": "MalariaDetectionApp/1.0",
    },
  };

  if (!skipAuth) {
    const token = getAuthToken();
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  if (!isFormData) {
    options.headers["Content-Type"] = "application/json";
  }

  if (body) {
    options.body = isFormData ? body : JSON.stringify(body);
  }

  return options;
};

export const mlService = {
  /**
   * Health check endpoint
   * GET /health
   */
  async checkHealth() {
    try {
      console.log("Checking health at:", `${ML_API_URL}/health`);
      const options = await getFetchOptions("GET");
      const response = await fetch(`${ML_API_URL}/health`, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Health check failed (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("ML API health check error:", error);
      return { data: null, error };
    }
  },

  /**
   * System status endpoint
   * GET /system/status
   */
  async getSystemStatus() {
    try {
      const options = await getFetchOptions("GET");
      const response = await fetch(`${ML_API_URL}/system/status`, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`System status failed (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("ML API system status error:", error);
      return { data: null, error };
    }
  },

  /**
   * Get model information
   * GET /model/info
   */
  async getModelInfo() {
    try {
      const options = await getFetchOptions("GET");
      const response = await fetch(`${ML_API_URL}/model/info`, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Model info fetch failed (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("ML API model info error:", error);
      return { data: null, error };
    }
  },

  /**
   * Basic prediction
   * POST /predict
   */
  async predict(imageFile, patientId = null) {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      if (patientId) {
        formData.append("patient_id", patientId);
      }

      const options = await getFetchOptions("POST", formData, true, false);
      const response = await fetch(`${ML_API_URL}/predict`, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Prediction failed (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("ML API prediction error:", error);
      return { data: null, error };
    }
  },

  /**
   * Public Demo Prediction
   * POST /predict/demo
   * No DB, no patient required
   */
  async predictDemo(imageFile, useGradCAM = false) {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const options = await getFetchOptions("POST", formData, true, true);
      const response = await fetch(
        `${ML_API_URL}/predict/demo?prediction_type=detailed&use_gradcam=${useGradCAM}`,
        options,
      );

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Demo prediction failed (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("ML API demo prediction error:", error);
      return { data: null, error };
    }
  },

  /**
   * Complete Prediction Workflow
   * POST /predict/complete?patient_id={patient_id}
   */
  async predictComplete({
    imageFile,
    patientId,
    doctorId = null,
    imagePath = null,
    storageUrl = null,
    imageMetadata = null,
    useTTA = false,
    useGradCAM = false,
  }) {
    const executeCompletePrediction = async ({
      ttaEnabled,
      gradcamEnabled,
      allowRetryFallback,
    }) => {
      const formData = new FormData();
      formData.append("file", imageFile);

      if (imagePath) formData.append("image_path", imagePath);
      if (storageUrl) formData.append("storage_url", storageUrl);
      if (imageMetadata) {
        formData.append("image_metadata", JSON.stringify(imageMetadata));
      }
      if (doctorId) formData.append("doctor_id", doctorId);

      formData.append("use_tta", ttaEnabled.toString());
      formData.append("use_gradcam", gradcamEnabled.toString());

      const predictionType = gradcamEnabled ? "detailed" : "basic";
      const url = `${ML_API_URL}/predict/complete?patient_id=${patientId}&prediction_type=${predictionType}`;

      console.log("Calling API:", url);

      const options = await getFetchOptions("POST", formData, true, false);
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        console.error("Error response body:", errorText);

        if (allowRetryFallback && response.status >= 500 && gradcamEnabled) {
          console.warn("Retrying complete prediction in basic mode...");
          return executeCompletePrediction({
            ttaEnabled: false,
            gradcamEnabled: false,
            allowRetryFallback: false,
          });
        }

        if (response.status === 401) {
          throw new Error("Authentication required. Please login again.");
        }

        throw new Error(`Complete prediction failed (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    };

    try {
      console.log("=== Starting complete prediction workflow ===");
      console.log("ML API URL:", ML_API_URL);
      console.log("Patient ID:", patientId);
      console.log("Doctor ID:", doctorId);
      console.log("Image file:", imageFile?.name, imageFile?.type, imageFile?.size);

      const { data, error } = await executeCompletePrediction({
        ttaEnabled: useTTA,
        gradcamEnabled: useGradCAM,
        allowRetryFallback: true,
      });

      if (error) throw error;

      console.log("Prediction successful:", data);
      return { data, error: null };
    } catch (error) {
      if (error?.name === "TypeError" && useGradCAM) {
        console.warn("Network error detected. Retrying in basic mode...");
        try {
          return await executeCompletePrediction({
            ttaEnabled: false,
            gradcamEnabled: false,
            allowRetryFallback: false,
          });
        } catch (retryError) {
          console.error("Basic mode retry also failed:", retryError);
        }
      }

      console.error("=== ML API complete prediction error ===");
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      return { data: null, error };
    }
  },

  /**
   * Prediction with Test-Time Augmentation
   * Kept for compatibility. If backend endpoint missing, use predictComplete with useTTA.
   */
  async predictWithTTA(imageFile, patientId = null) {
    try {
      if (patientId) {
        return await this.predictComplete({
          imageFile,
          patientId,
          useTTA: true,
          useGradCAM: false,
        });
      }

      return await this.predictDemo(imageFile, false);
    } catch (error) {
      console.error("ML API TTA prediction error:", error);
      return { data: null, error };
    }
  },

  /**
   * Batch prediction
   * Kept for compatibility. Runs sequential demo predictions if backend batch endpoint is unavailable.
   */
  async predictBatch(imageFiles, patientId = null) {
    try {
      const results = [];

      for (const file of imageFiles) {
        const result = patientId
          ? await this.predictComplete({ imageFile: file, patientId })
          : await this.predictDemo(file);

        results.push({
          filename: file.name,
          ...result,
        });
      }

      return { data: results, error: null };
    } catch (error) {
      console.error("ML API batch prediction error:", error);
      return { data: null, error };
    }
  },

  async getPredictionById(predictionId) {
    try {
      const options = await getFetchOptions("GET");
      const response = await fetch(`${ML_API_URL}/predictions/${predictionId}`, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Failed to fetch prediction (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("Get prediction error:", error);
      return { data: null, error };
    }
  },

  async getPatientHistory(patientId) {
    try {
      const options = await getFetchOptions("GET");
      const response = await fetch(`${ML_API_URL}/patients/${patientId}/history`, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Failed to fetch patient history (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("Get patient history error:", error);
      return { data: null, error };
    }
  },

  async getPatientPredictions(patientId) {
    try {
      const options = await getFetchOptions("GET");
      const response = await fetch(`${ML_API_URL}/predictions/patient/${patientId}`, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Failed to fetch patient predictions (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("Get patient predictions error:", error);
      return { data: null, error };
    }
  },

  async getMyPredictions() {
    try {
      const options = await getFetchOptions("GET");
      const response = await fetch(`${ML_API_URL}/doctor/predictions`, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Failed to fetch my predictions (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("Get my predictions error:", error);
      return { data: null, error };
    }
  },

  async getDoctorStats() {
    try {
      const options = await getFetchOptions("GET");
      const response = await fetch(`${ML_API_URL}/doctor/stats`, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Failed to fetch doctor stats (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("Get doctor stats error:", error);
      return { data: null, error };
    }
  },

  async getDoctorProfile() {
    try {
      const options = await getFetchOptions("GET");
      const response = await fetch(`${ML_API_URL}/doctor/profile`, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Failed to fetch doctor profile (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("Get doctor profile error:", error);
      return { data: null, error };
    }
  },

  async getOrganizationStats(orgId = 1) {
    try {
      const options = await getFetchOptions("GET");
      const response = await fetch(`${ML_API_URL}/organization/${orgId}/stats`, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Failed to fetch organization stats (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("Get organization stats error:", error);
      return { data: null, error };
    }
  },

  async getPublicReports(patientId, dob) {
    try {
      const options = await getFetchOptions("GET", null, false, true);
      const response = await fetch(
        `${ML_API_URL}/public/reports?patient_id=${encodeURIComponent(
          patientId,
        )}&dob=${encodeURIComponent(dob)}`,
        options,
      );

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Failed to fetch public reports (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("Get public reports error:", error);
      return { data: null, error };
    }
  },

  transformPredictionToResult(prediction, imageUrl) {
    const normalized = prediction?.result || prediction?.prediction || prediction || {};

    const predictedClass =
      normalized.predicted_class ||
      normalized.prediction ||
      prediction?.predicted_class ||
      prediction?.prediction ||
      "Unknown";

    const isInfected = predictedClass?.toLowerCase() === "parasitized";

    const confidence =
      normalized.confidence_percent ||
      prediction?.confidence_percent ||
      Math.round(((normalized.confidence || normalized.confidence_score || 0) * 100));

    const probabilities = normalized.probabilities || prediction?.probabilities || {};

    const parasitizedProb = probabilities.Parasitized
      ? `${(probabilities.Parasitized * 100).toFixed(2)}%`
      : "N/A";

    const uninfectedProb = probabilities.Uninfected
      ? `${(probabilities.Uninfected * 100).toFixed(2)}%`
      : "N/A";

    return {
      status: isInfected ? "infected" : "healthy",
      prediction: predictedClass,
      confidence,
      riskLevel:
        normalized.risk_level ||
        prediction?.details?.risk_level ||
        prediction?.risk_level ||
        "N/A",
      recommendation:
        normalized.recommendation ||
        prediction?.details?.recommendation ||
        prediction?.recommendation ||
        "Please confirm this AI screening result with a medical professional.",
      qualityScore:
        normalized.quality_score ||
        prediction?.details?.image_quality_score ||
        prediction?.quality_score ||
        "N/A",
      details: {
        parasites_detected: isInfected ? "Yes" : "No",
        predicted_class: predictedClass,
        parasitized_probability: parasitizedProb,
        uninfected_probability: uninfectedProb,
        blood_cells_analyzed: "Analyzed",
        image_quality: normalized.quality_warning ? "Needs Review" : "Good",
      },
      timestamp:
        prediction?.metadata?.timestamp ||
        prediction?.timestamp ||
        prediction?.created_at ||
        new Date().toISOString(),
      imageUrl,
      raw: prediction,
    };
  },

  transformDetailedPrediction(prediction, imageUrl) {
    const normalized = prediction?.result || prediction?.prediction || prediction || {};
    const baseResult = this.transformPredictionToResult(prediction, imageUrl);

    return {
      ...baseResult,
      uncertainty: normalized.uncertainty,
      confidence_level: normalized.confidence_level,
      recommendation: normalized.recommendation || baseResult.recommendation,
      gradcam_image: normalized.gradcam_image,
      medical_disclaimer: normalized.medical_disclaimer,
    };
  },
};