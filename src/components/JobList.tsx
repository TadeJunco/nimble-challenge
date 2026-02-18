import JobItem from "./JobItem";

export default function JobList({ jobs, candidate }: any) {
  return (
    <div>
      <h2>Open positions</h2>

      {jobs.map((job: any) => (
        <JobItem
          key={job.id}
          job={job}
          candidate={candidate}
        />
      ))}
    </div>
  );
}
