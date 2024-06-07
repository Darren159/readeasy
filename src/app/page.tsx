import WebGazerControl from "./WebGazerControl";
import Passage from "./Passage";
import GazeDataOverlay from "./GazeDataOverlay";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center min-h-screen py-12 px-6">
      <WebGazerControl />

      <Passage />
      <GazeDataOverlay />
    </main>
  );
}
