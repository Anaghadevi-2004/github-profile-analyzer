function ProfileCard({ profile }) {
  return (
    <div className="profile-card">
      <img src={profile.avatar_url} alt={profile.login} />
      <h2>{profile.name || profile.login}</h2>
      <p>{profile.bio}</p>
      <p>📍 {profile.location || "Not specified"}</p>
    </div>
  );
}

export default ProfileCard;