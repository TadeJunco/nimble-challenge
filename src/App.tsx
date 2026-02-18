import { useState } from "react";
import { getCandidate, getJobs } from "./services/api";
import JobList from "./components/JobList";

export default function App() {
  const [email, setEmail] = useState("");
  const [candidate, setCandidate] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLoad() {
    try {
      setLoading(true);
      setError("");

      const c = await getCandidate(email);
      const j = await getJobs();

      setCandidate(c);
      setJobs(j);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  if (!candidate) {
    return (
      <main>
        <h1>Nimble Gravity Challenge</h1>

        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleLoad} disabled={loading}>
          {loading ? "Loading..." : "Start"}
        </button>

        {error && <p>{error}</p>}
      </main>
    );
  }

  return (
    <main>
      <h1>Welcome {candidate.firstName}</h1>
      <JobList jobs={jobs} candidate={candidate} />
    </main>
  );
}
