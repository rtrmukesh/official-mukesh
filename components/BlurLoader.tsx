import { CSSProperties } from "react";
import Spinner from "./Spinner";

type LoaderName =
  | "ScaleLoader"
  | "BarLoader"
  | "BeatLoader"
  | "BounceLoader"
  | "CircleLoader"
  | "ClimbingBoxLoader"
  | "ClipLoader"
  | "ClockLoader"
  | "DotLoader"
  | "FadeLoader"
  | "GridLoader"
  | "HashLoader"
  | "MoonLoader"
  | "PacmanLoader"
  | "PropagateLoader"
  | "PulseLoader"
  | "RingLoader"
  | "RiseLoader"
  | "RotateLoader"
  | "ScaleLoader"
  | "SyncLoader";

type BlurLoaderProps = {
  isLoading: boolean;
  name?: LoaderName;
  color?: string;
};

const BlurLoader = ({
  isLoading,
  name = "ScaleLoader",
  color = "black",
}: BlurLoaderProps) => {
  if (!isLoading) return null;

  return (
    <div style={styles.overlay}>
      <Spinner name={name} color={color} />
    </div>
  );
};

const styles: { overlay: CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

// Add keyframes globally via style tag (only once in your app)
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export default BlurLoader;
