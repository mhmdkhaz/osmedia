import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import rocketIcon from "../assets/osmedia-logo.webp";
import stars from "../assets/stars.webp";

const steps = [
  { id: 1, title: "Book Your Strategy Call" },
  { id: 2, title: "Get Your Growth Blueprint" },
  { id: 3, title: "Launch & Scale" },
];

const stepDescriptions = [
  "Book a call with our team and tell us about your goals, needs, and vision.",
  "We craft a custom strategy tailored to your business and timeline.",
  "Launch your project with precision, speed, and scalable results.",
];

// SVG paths
const desktopPath =
  "M125.5 8.5C122.3 10.9 117 17.8333 106.5 31C-81.0004 270 32.2191 468.258 184.765 473.5C322.662 478.238 375.766 331 567.765 327.5C759.765 324 898.765 451 1069.76 453.5";

// Original wavy mobile path
const mobilePath = "M150 0 C50 100, 50 200, 150 300";

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [rocketPosition, setRocketPosition] = useState({
    x: 0,
    y: 0,
    angle: 0,
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  const viewBoxWidth = isMobile ? 300 : 1200;
  const viewBoxHeight = isMobile ? 300 : 500;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activePath = isMobile ? mobilePath : desktopPath;

  // Update pathLength on mount
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);

      // Initialize rocket position and angle
      const startPoint = pathRef.current.getPointAtLength(0);
      const lookAheadPoint = pathRef.current.getPointAtLength(10);
      const dx = lookAheadPoint.x - startPoint.x;
      const dy = lookAheadPoint.y - startPoint.y;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      setRocketPosition({
        x: (startPoint.x / viewBoxWidth) * 100,
        y: (startPoint.y / viewBoxHeight) * 100,
        angle,
      });
    }
  }, [isMobile, viewBoxWidth, viewBoxHeight]);

  useEffect(() => {
    return scrollYProgress.onChange((progress) => {
      if (pathRef.current && pathLength) {
        const lengthAtProgress = progress * pathLength;
        const currentPoint = pathRef.current.getPointAtLength(lengthAtProgress);
        const lookAheadPoint = pathRef.current.getPointAtLength(
          Math.min(lengthAtProgress + 10, pathLength)
        );
        const dx = lookAheadPoint.x - currentPoint.x;
        const dy = lookAheadPoint.y - currentPoint.y;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        setRocketPosition({
          x: (currentPoint.x / viewBoxWidth) * 100,
          y: (currentPoint.y / viewBoxHeight) * 100,
          angle,
        });

        // Update current step based on scroll progress
        if (progress > 0.85) {
          setCurrentStepIndex(2);
        } else if (progress > 0.55) {
          setCurrentStepIndex(1);
        } else if (progress > 0.25) {
          setCurrentStepIndex(0);
        } else {
          setCurrentStepIndex(-1);
        }
      }
    });
  }, [scrollYProgress, pathLength, viewBoxWidth, viewBoxHeight]);

  const positions = isMobile
    ? [
        { left: "45%", top: "33%", transform: "translate(-50%, 0)" },
        { left: "48%", top: "65%", transform: "translate(-50%, 0)" },
        { left: "70%", top: "98%", transform: "translate(-50%, 0)" },
      ]
    : [
        { left: "14%", top: "90%" },
        { left: "45.3%", top: "62%" },
        { left: "85.5%", top: "87%" },
      ];

  return (
    <div
      ref={containerRef}
      className="bg-[#0B0B1E] text-white py-20 relative"
      style={{
        height: isMobile ? "300vh" : "400vh",
        backgroundImage: `url(${stars})`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-[1.5rem] md:text-4xl font-bold">
            A Seamless <span className="text-red-500">Process</span>
          </h2>
          <p className="text-[1.5rem] md:text-2xl font-semibold mt-2">
            Built for Speed, Clarity, and Results
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-sm mt-4 max-w-md md:max-w-xl mx-auto text-gray-400"
            >
              {currentStepIndex >= 0
                ? stepDescriptions[currentStepIndex]
                : stepDescriptions[0]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div
          className={`relative w-full ${
            isMobile ? "h-[65vh]" : "h-96 lg:h-[26rem]"
          }`}
        >
          <svg
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            preserveAspectRatio="none"
            className="absolute w-full h-full"
          >
            <path
              d={activePath}
              stroke="#ef4444"
              strokeWidth="4"
              strokeDasharray="10,10"
              fill="none"
            />

            <motion.path
              ref={pathRef}
              d={activePath}
              stroke="#00a2ff"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              style={{
                pathLength: scrollYProgress,
              }}
            />
          </svg>

          <motion.div
            className="absolute z-20 will-change-transform"
            style={{
              left: `${rocketPosition.x}%`,
              top: `${rocketPosition.y}%`,
              transform: `translate(-50%, -50%) rotate(${
                rocketPosition.angle + 45
              }deg)`,
              transformOrigin: "center center",
              width: isMobile ? "50px" : "88px",
              height: isMobile ? "50px" : "88px",
            }}
          >
            <img
              src={rocketIcon}
              alt="rocket"
              className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]"
            />
          </motion.div>

          <div className="absolute top-0 left-0 w-full h-full">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`absolute flex ${
                  isMobile ? "flex-row" : "flex-col"
                }  items-center justify-center text-center`}
                style={positions[index]}
              >
                <div className="relative z-10">
                  <div
                    className={` ${
                      isMobile ? "w-5 h-5 text-[12px]" : "w-8 h-8 text-lg"
                    }   rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300 ${
                      currentStepIndex !== -1 && currentStepIndex >= index
                        ? "bg-[#00a2ff]"
                        : "bg-[#ff0032]"
                    }`}
                  >
                    {step.id}
                  </div>
                </div>
                <div
                  className={`text-xs md:text-sm mt-2  ${
                    isMobile ? "w-32" : "w-24"
                  } md:w-28 text-white transition-opacity duration-300 ${
                    currentStepIndex !== -1 && currentStepIndex >= index
                      ? "opacity-100"
                      : "opacity-10"
                  }`}
                >
                  {step.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
