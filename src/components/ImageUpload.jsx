import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  ImageIcon,
  Microscope,
  Scan,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

const ImageUpload = ({
  onUpload,
  accept = "image/*",
  maxSize = 10,
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be below ${maxSize} MB`);
      return false;
    }

    return true;
  };

  const processFile = (selectedFile) => {
    if (!validateFile(selectedFile)) return;

    setError(null);
    setFile(selectedFile);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);

      if (onUpload) {
        onUpload(selectedFile, reader.result);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative
              overflow-hidden
              cursor-pointer
              rounded-[32px]
              border-2
              border-dashed
              transition-all
              duration-500
              ${
                isDragging
                  ? "border-[#05bdb8] bg-[#effefd] dark:bg-[#082f2d] scale-[1.02]"
                  : "border-cyan-200 dark:border-cyan-900 bg-white dark:bg-[#0b2423]"
              }
              shadow-2xl
              min-h-[420px]
              flex
              items-center
              justify-center
            `}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#20d7cf]/10 via-transparent to-[#05bdb8]/10" />

            {/* Floating Orbs */}
            <motion.div
              animate={{
                y: [0, -25, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              className="absolute top-10 left-10 w-24 h-24 rounded-full bg-cyan-300/20 blur-2xl"
            />

            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
              className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-teal-400/20 blur-3xl"
            />

            {/* Scanner Line */}
            {isDragging && (
              <motion.div
                initial={{ y: -200 }}
                animate={{ y: 400 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                }}
                className="
                  absolute
                  left-0
                  right-0
                  h-[4px]
                  bg-gradient-to-r
                  from-transparent
                  via-[#05bdb8]
                  to-transparent
                "
              />
            )}

            <div className="relative z-10 text-center p-8">
              {/* Icon Area */}
              <motion.div
                animate={{
                  rotateY: [0, 10, -10, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="
                  relative
                  w-36
                  h-36
                  mx-auto
                  mb-8
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    bg-gradient-to-br
                    from-[#04bdb7]
                    via-[#18d6cf]
                    to-[#91fff7]
                    shadow-2xl
                    shadow-cyan-500/30
                  "
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <Microscope className="w-16 h-16 text-white" />
                </div>

                {/* Orbit Ring */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
                    absolute
                    -inset-4
                    rounded-full
                    border-2
                    border-dashed
                    border-cyan-300
                  "
                />
              </motion.div>

              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3">
                Upload Blood Smear Image
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
                Drag & drop a microscopy image or click to browse.
                MediVue AI will analyze the sample for malaria parasite
                detection.
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[
                  "AI Screening",
                  "7-Channel Analysis",
                  "Clinical Report",
                  "Grad-CAM Ready",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-[#effefd]
                      dark:bg-[#082f2d]
                      text-[#039b97]
                      dark:text-[#5af7ee]
                      text-sm
                      font-bold
                    "
                  >
                    {item}
                  </div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-8
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#02aaa5]
                  to-[#20d7cf]
                  text-white
                  font-bold
                  shadow-xl
                "
              >
                <Upload className="w-5 h-5" />
                Select Image
              </motion.div>

              <p className="mt-5 text-sm text-gray-500">
                JPG • PNG • JPEG • WEBP • Max {maxSize}MB
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              className="hidden"
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="
              overflow-hidden
              rounded-[32px]
              bg-white
              dark:bg-[#0b2423]
              border
              border-cyan-100
              dark:border-cyan-900
              shadow-2xl
            "
          >
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="
                  w-full
                  h-[420px]
                  object-contain
                  bg-[#f8fffe]
                  dark:bg-[#061414]
                "
              />

              {/* Scanner Overlay */}
              <motion.div
                animate={{
                  y: [-400, 400],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear",
                }}
                className="
                  absolute
                  left-0
                  right-0
                  h-[3px]
                  bg-gradient-to-r
                  from-transparent
                  via-[#05bdb8]
                  to-transparent
                "
              />

              <div className="absolute top-5 left-5">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white font-bold">
                  <CheckCircle className="w-4 h-4" />
                  Image Ready
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRemove}
                className="
                  absolute
                  top-5
                  right-5
                  p-3
                  rounded-full
                  bg-red-500
                  text-white
                "
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="p-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <ImageIcon className="w-6 h-6 text-[#05bdb8]" />

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {file?.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {(file?.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#039b97] font-bold">
                <Scan className="w-5 h-5" />
                Ready For AI Analysis
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            mt-5
            p-4
            rounded-2xl
            bg-red-50
            dark:bg-red-950/20
            border
            border-red-200
            dark:border-red-900
            flex
            items-center
            gap-3
            text-red-600
          "
        >
          <AlertCircle className="w-5 h-5" />
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default ImageUpload;