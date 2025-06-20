// import React, { useRef, useEffect, useState } from "react";
// import { motion, useScroll, AnimatePresence } from "framer-motion";
// import rocketIcon from "../assets/osmedia-logo.webp";
// import stars from "../assets/stars.webp";

// const steps = [
//   { id: 1, title: "Book Your Strategy Call" },
//   { id: 2, title: "Get Your Growth Blueprint" },
//   { id: 3, title: "Launch & Scale" },
// ];

// const stepDescriptions = [
//   "Book a call with our team and tell us about your goals, needs, and vision.",
//   "We craft a custom strategy tailored to your business and timeline.",
//   "Launch your project with precision, speed, and scalable results.",
// ];

// export default function ProcessTimeline() {
//   const containerRef = useRef(null);
//   const pathRef = useRef(null);
//   const [pathLength, setPathLength] = useState(0);
//   const [rocketPosition, setRocketPosition] = useState({
//     x: 0,
//     y: 0,
//     angle: 0,
//   });
//   // const [activeSteps, setActiveSteps] = useState([false, false, false]);
//   const [currentStepIndex, setCurrentStepIndex] = useState(-1);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Initialize path length and set initial positions
//   useEffect(() => {
//     if (pathRef.current) {
//       const length = pathRef.current.getTotalLength();
//       setPathLength(length);

//       // Set initial rocket position
//       const startPoint = pathRef.current.getPointAtLength(0);
//       console.log(startPoint);

//       setRocketPosition({
//         x: (startPoint.x / 1200) * 100,
//         y: (startPoint.y / 500) * 100,
//         angle: 0,
//       });
//     }
//   }, []);

//   // Update rocket position and step activation during scroll
//   useEffect(() => {
//     return scrollYProgress.onChange((progress) => {
//       if (pathRef.current && pathLength) {
//         const lengthAtProgress = progress * pathLength;
//         const currentPoint = pathRef.current.getPointAtLength(lengthAtProgress);

//         // Calculate angle using adjacent points
//         const lookAheadPoint = pathRef.current.getPointAtLength(
//           Math.min(lengthAtProgress + 0.1, pathLength)
//         );
//         const dx = lookAheadPoint.x - currentPoint.x;
//         const dy = lookAheadPoint.y - currentPoint.y;
//         const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

//         // Convert SVG coordinates to percentages
//         setRocketPosition({
//           x: (currentPoint.x / 1200) * 100,
//           y: (currentPoint.y / 500) * 100,
//           angle,
//         });

//         // Update active steps
//         if (progress > 0.85) {
//           setCurrentStepIndex(2);
//         } else if (progress > 0.55) {
//           setCurrentStepIndex(1);
//         } else if (progress > 0.25) {
//           setCurrentStepIndex(0);
//         } else {
//           setCurrentStepIndex(-1);
//         }
//       }
//     });
//   }, [scrollYProgress, pathLength]);

//   return (
//     <div
//       ref={containerRef}
//       className="bg-[#0B0B1E] text-white py-20 relative"
//       style={{
//         height: "400vh",
//         backgroundImage: `url(${stars})`,
//         backgroundRepeat: "repeat",
//         backgroundAttachment: "scroll",
//       }}
//     >
//       <div className="sticky top-[-18px] h-screen flex flex-col justify-center items-center max-w-7xl mx-auto">
//         <div className="text-center mb-16 px-4">
//           <h2 className="text-4xl font-bold">
//             A Seamless <span className="text-red-500">Process</span>
//           </h2>
//           <p className="text-2xl font-semibold mt-2">
//             Built for Speed, Clarity, and Results
//           </p>
//           <AnimatePresence mode="wait">
//             <motion.p
//               key={currentStepIndex}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.5 }}
//               className="text-sm mt-4 max-w-xl mx-auto text-gray-400"
//             >
//               {stepDescriptions[currentStepIndex]}
//             </motion.p>
//           </AnimatePresence>
//         </div>

//         <div className="relative w-full h-80 md:h-96 lg:h-[28rem]">
//           <svg
//             viewBox="0 0 1200 500"
//             preserveAspectRatio="none"
//             className="absolute w-full h-full"
//           >
//             {/* Red dashed background path */}
//             <path
//               d="M125.5 8.5C122.3 10.9 117 17.8333 106.5 31C-81.0004 270 32.2191 468.258 184.765 473.5C322.662 478.238 375.766 331 567.765 327.5C759.765 324 898.765 451 1069.76 453.5"
//               stroke="#ef4444"
//               strokeWidth="4"
//               strokeDasharray="10,10"
//               fill="none"
//             />

//             {/* Blue animated path */}
//             <motion.path
//               ref={pathRef}
//               d="M125.5 8.5C122.3 10.9 117 17.8333 106.5 31C-81.0004 270 32.2191 468.258 184.765 473.5C322.662 478.238 375.766 331 567.765 327.5C759.765 324 898.765 451 1069.76 453.5"
//               stroke="#00a2ff"
//               strokeWidth="5"
//               fill="none"
//               strokeLinecap="round"
//               strokeDasharray="10,10"
//               style={{
//                 pathLength: scrollYProgress,
//               }}
//             />
//           </svg>

//           {/* Rocket with precise path following */}
//           <motion.img
//             src={rocketIcon}
//             alt="rocket"
//             className="w-22 h-22 absolute z-20 object-contain drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]"
//             style={{
//               left: `${rocketPosition.x}%`,
//               top: `${rocketPosition.y}%`,
//               x: "-50%",
//               y: "-50%",
//               rotate: `${rocketPosition.angle + 50}deg`,
//               transformOrigin: "center center",
//             }}
//           />

//           {/* Step markers with activation states */}
//           <div className="absolute top-0 left-0 w-full h-full">
//             {steps.map((step, index) => {
//               const positions = [
//                 { left: "14%", bottom: "-38px" },
//                 { left: "45.3%", bottom: "90.5px" },
//                 { left: "85.5%", bottom: "1px" },
//               ];
//               return (
//                 <div
//                   key={step.id}
//                   className="absolute flex flex-col items-center justify-center text-center"
//                   style={positions[index]}
//                 >
//                   <div className="relative z-10">
//                     <div
//                       className={`w-8 h-8 text-lg rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300 ${
//                         currentStepIndex !== -1 && currentStepIndex >= index
//                           ? "bg-[#00a2ff]"
//                           : "bg-[#ff0032]"
//                       }`}
//                     >
//                       {step.id}
//                     </div>
//                   </div>
//                   <div
//                     className={`text-sm mt-2 w-28 text-white transition-opacity duration-300 ${
//                       currentStepIndex !== -1 && currentStepIndex >= index
//                         ? "opacity-100"
//                         : "opacity-10"
//                     }  `}
//                   >
//                     {step.title}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
