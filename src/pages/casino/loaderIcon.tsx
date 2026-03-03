import React, { useEffect, useState } from "react";

interface LoaderIconProps {
  img?: string;
  title?: string;
  style?: React.CSSProperties;
}

const LoaderIcon: React.FC<LoaderIconProps> = ({
  img = "https://chicken-road.inout.games/static/svg/inoutLogo.0df66995.svg",
  title = "Loading...",
  style = { width: "180px", marginBottom: "40px" },
}) => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, #0b1118 0%, #0e1622 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      {/* LOGO */}
      <img
        src={showIntro ? "/imgs/logo.png" : img}
        alt={title}
        className={showIntro ? "blink" : ""}
        style={
          showIntro
            ? { width: "220px" }
            : style
        }
      />

      {/* Spinner only after intro */}
      {!showIntro && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              border: "3px solid rgba(255,255,255,0.2)",
              borderTop: "3px solid #ffffff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />

          <p
            style={{
              color: "#fff",
              fontSize: "16px",
              opacity: 0.85,
              margin: 0,
            }}
          >
            {title}
          </p>
        </div>
      )}
    </div>
  );
};

export default LoaderIcon;
