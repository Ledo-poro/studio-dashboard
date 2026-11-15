"use client";

import { FormEvent, useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { KeyRound, UserRound } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    setName(session?.user?.name || "");
  }, [session?.user?.name]);

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileMessage("");
    setProfileError("");
    setSavingProfile(true);
    try {
      const result = await authClient.updateUser({ name: name.trim() });
      if (result.error) setProfileError(result.error.message || "Could not update your profile.");
      else setProfileMessage("Your profile has been updated.");
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : "Could not update your profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const updatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordError("");
    if (newPassword.length < 8) {
      setPasswordError("Use at least 8 characters for your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("The new passwords do not match.");
      return;
    }
    setSavingPassword(true);
    try {
      const result = await authClient.changePassword({ currentPassword, newPassword, revokeOtherSessions: true });
      if (result.error) setPasswordError(result.error.message || "Could not update your password.");
      else {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordMessage("Your password has been updated.");
      }
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : "Could not update your password.");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="workspace-page settings-page">
        <div className="page-heading"><div><p className="page-eyebrow">YOUR ACCOUNT</p><h1>Settings</h1><p>Manage your profile and account security.</p></div></div>
        <section className="settings-section">
          <div className="settings-section-heading"><span className="settings-icon"><UserRound size={17} /></span><div><h2>Profile</h2><p>Your name appears across your workspace.</p></div></div>
          <form className="settings-form" onSubmit={saveProfile}>
            <div className="settings-fields">
              <div className="auth-field"><label htmlFor="profile-name">Full name</label><input id="profile-name" autoComplete="name" required minLength={2} maxLength={100} value={name} onChange={(event) => setName(event.target.value)} /></div>
              <div className="auth-field"><label htmlFor="profile-email">Email address</label><input id="profile-email" type="email" value={session?.user?.email || ""} disabled /><small>Email changes require verification and aren&apos;t available here.</small></div>
            </div>
            <div className="settings-form-footer"><span className="settings-feedback" role="status">{profileMessage || profileError}</span><button className="workspace-button" type="submit" disabled={savingProfile || !name.trim()}>{savingProfile ? "Saving..." : "Save profile"}</button></div>
          </form>
        </section>

        <section className="settings-section">
          <div className="settings-section-heading"><span className="settings-icon security"><KeyRound size={17} /></span><div><h2>Password & security</h2><p>Change your password and sign out other sessions.</p></div></div>
          <form className="settings-form" onSubmit={updatePassword}>
            <div className="settings-fields password-fields">
              <div className="auth-field"><label htmlFor="current-password">Current password</label><input id="current-password" autoComplete="current-password" type="password" required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} /></div>
              <div className="auth-field"><label htmlFor="new-password">New password</label><input id="new-password" autoComplete="new-password" type="password" required minLength={8} maxLength={128} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} /></div>
              <div className="auth-field"><label htmlFor="confirm-password">Confirm new password</label><input id="confirm-password" autoComplete="new-password" type="password" required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></div>
            </div>
            <div className="settings-form-footer"><span className="settings-feedback" role="status">{passwordMessage || passwordError}</span><button className="workspace-button" type="submit" disabled={savingPassword || !currentPassword || !newPassword || !confirmPassword}>{savingPassword ? "Updating..." : "Update password"}</button></div>
          </form>
        </section>
        <p className="sample-note">Account settings are saved securely through Better Auth.</p>
      </div>
    </DashboardLayout>
  );
}
