import { useEffect, useState } from "react";
import { getCandidate, getJobs } from "./services/api";
import JobList from "./components/JobList";


export default function App() {
  const [candidate, setCandidate] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const email = prompt("Enter your email") || "";
        const c = await getCandidate(email);
        const j = await getJobs();

        setCandidate(c);
        setJobs(j);
      } catch (err) {
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
  <main>
    <h1>Welcome {candidate.firstName}</h1>
    <JobList jobs={jobs} candidate={candidate} />
  </main>
);

}
