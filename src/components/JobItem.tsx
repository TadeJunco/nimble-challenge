import { useState } from "react";
import { applyToJob } from "../services/api";

export default function JobItem({ job, candidate }: any) {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit() {
    try {
      setStatus("Submitting...");

      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl,
      });

      setStatus("✅ Applied!");
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Failed to apply!" + err.message)
    }
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      <h3>{job.title}</h3>

      <input
        placeholder="GitHub repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>

      <p>{status}</p>
    </div>
  );
}
