// src/components/HumanSilhouette.js
import React from "react";

/**
 * A simplified, placeholder human silhouette using an SVG.
 * Each rectangle or circle is a "clickable" region.
 * You can replace these shapes with more detailed paths or polygons.
 */
const HumanSilhouette = ({ onRegionSelect }) => {
  const handleClick = (region) => {
    // The parent component (SymptomForm) will receive the chosen region
    onRegionSelect(region);
  };

  return (
    <svg
      width="200"
      height="600"
      viewBox="0 0 200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ border: "1px solid #ccc", cursor: "pointer" }}
    >
      {/* HEAD */}
      <circle
        cx="100"
        cy="50"
        r="20"
        fill="#aaa"
        onClick={() => handleClick("Head")}
      />

      {/* CHEST */}
      <rect
        x="80"
        y="80"
        width="40"
        height="60"
        fill="#ccc"
        onClick={() => handleClick("Chest")}
      />

      {/* ABDOMEN */}
      <rect
        x="80"
        y="140"
        width="40"
        height="80"
        fill="#bbb"
        onClick={() => handleClick("Abdomen")}
      />

      {/* LEFT ARM */}
      <rect
        x="40"
        y="80"
        width="20"
        height="80"
        fill="#aaa"
        onClick={() => handleClick("Left Arm")}
      />

      {/* RIGHT ARM */}
      <rect
        x="140"
        y="80"
        width="20"
        height="80"
        fill="#aaa"
        onClick={() => handleClick("Right Arm")}
      />

      {/* LEFT LEG */}
      <rect
        x="80"
        y="220"
        width="15"
        height="80"
        fill="#999"
        onClick={() => handleClick("Left Leg")}
      />

      {/* RIGHT LEG */}
      <rect
        x="105"
        y="220"
        width="15"
        height="80"
        fill="#999"
        onClick={() => handleClick("Right Leg")}
      />
    </svg>
  );
};

export default HumanSilhouette;
