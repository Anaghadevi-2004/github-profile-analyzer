import { useState } from "react";
import axios from "axios";
import ProfileCard from "./components/ProfileCard";
import RepoList from "./components/RepoList";
import LanguageChart from "./components/LanguageChart";
import StatsCard from "./components/StatsCard";

function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGitHubData = async () => {
    if (!username) return;

    setLoading(true);

    try {
      const profileRes = await axios.get(
        `https://api.github.com/users/${username}`
      );

      const reposRes = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=10`
      );

      setProfile(profileRes.data);
      setRepos(reposRes.data);

      const langCount = {};

      reposRes.data.forEach((repo) => {
        if (repo.language) {
          langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
      });

      const chartData = Object.keys(langCount).map((lang) => ({
        name: lang,
        value: langCount[lang],
      }));

      setLanguageData(chartData);
    } catch (error) {
      alert("User not found!");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>GitHub Profile Analyzer</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchGitHubData}>Analyze</button>
      </div>

      {loading && <p>Loading...</p>}

      {profile && (
        <>
          <ProfileCard profile={profile} />

          <div className="stats-container">
            <StatsCard title="Repos" value={profile.public_repos} />
            <StatsCard title="Followers" value={profile.followers} />
            <StatsCard title="Following" value={profile.following} />
          </div>

          <LanguageChart data={languageData} />

          <RepoList repos={repos} />
        </>
      )}
    </div>
  );
}

export default App;