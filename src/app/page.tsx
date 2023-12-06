import Image from "next/image";
import Dashboard from "./Dashboard";

export default function Home() {
  return (
    <div>
      <p className="text-3xl font-bold text-blue-600">
        Acá ira el dashboard incrustado:
      </p>
      <Dashboard />
    </div>
  );
}
