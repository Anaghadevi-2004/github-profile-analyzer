function RepoList({ repos }) {
  return (
    <div className="repo-list">
      <h2>Top Repositories</h2>
      {repos.map((repo) => (
        <div key={repo.id} className="repo-card">
          <h3>{repo.name}</h3>
          <p>{repo.description}</p>
          <p>⭐ {repo.stargazers_count}</p>
        </div>
      ))}
    </div>
  );
}

export default RepoList;