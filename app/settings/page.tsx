"use client";

import { FormEvent, useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { KeyRound, UserRound } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { LanguagePreference, ThemePreference, usePreferences } from "@/components/PreferencesProvider";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { theme, language, loading: preferencesLoading, savePreferences, t } = usePreferences();
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
  const [selectedTheme, setSelectedTheme] = useState<ThemePreference>("light");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguagePreference>("en");
  const [preferencesMessage, setPreferencesMessage] = useState("");
  const [preferencesError, setPreferencesError] = useState("");
  const [savingPreferences, setSavingPreferences] = useState(false);

  useEffect(() => {
    setName(session?.user?.name || "");
  }, [session?.user?.name]);

  useEffect(() => {
    setSelectedTheme(theme);
    setSelectedLanguage(language);
  }, [theme, language]);

  const updatePreferences = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPreferencesMessage("");
    setPreferencesError("");
    setSavingPreferences(true);
    try {
      await savePreferences(selectedTheme, selectedLanguage);
      setPreferencesMessage(t("Your preferences have been saved."));
    } catch (error) {
      setPreferencesError(error instanceof Error ? error.message : "Could not save your preferences.");
    } finally {
      setSavingPreferences(false);
    }
  };

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
        <div className="page-heading"><div><p className="page-eyebrow">{t("YOUR ACCOUNT")}</p><h1>{t("Settings")}</h1><p>{t("Manage your profile and account security.")}</p></div></div>
        <section className="settings-section">
          <div className="settings-section-heading"><span className="settings-icon"><UserRound size={17} /></span><div><h2>{t("Appearance & language")}</h2><p>{t("Choose how your workspace looks and reads.")}</p></div></div>
          <form className="settings-form" onSubmit={updatePreferences}>
            <div className="settings-fields">
              <div className="auth-field"><label htmlFor="theme-preference">{t("Theme")}</label><select id="theme-preference" className="settings-select" value={selectedTheme} onChange={(event) => setSelectedTheme(event.target.value as ThemePreference)} disabled={preferencesLoading}><option value="light">{t("Light")}</option><option value="dark">{t("Dark")}</option></select></div>
              <div className="auth-field"><label htmlFor="language-preference">{t("Language")}</label><select id="language-preference" className="settings-select" value={selectedLanguage} onChange={(event) => setSelectedLanguage(event.target.value as LanguagePreference)} disabled={preferencesLoading}><option value="en">{t("English")}</option><option value="ar">{t("Arabic")}</option><option value="es">{t("Spanish")}</option><option value="fr">{t("French")}</option></select></div>
            </div>
            <div className="settings-form-footer"><span className="settings-feedback" role="status">{preferencesMessage || preferencesError}</span><button className="workspace-button" type="submit" disabled={savingPreferences || preferencesLoading}>{savingPreferences ? t("Saving...") : t("Save preferences")}</button></div>
          </form>
        </section>

        <section className="settings-section">
          <div className="settings-section-heading"><span className="settings-icon"><UserRound size={17} /></span><div><h2>{t("Profile")}</h2><p>{t("Your name appears across your workspace.")}</p></div></div>
          <form className="settings-form" onSubmit={saveProfile}>
            <div className="settings-fields">
              <div className="auth-field"><label htmlFor="profile-name">{t("Full name")}</label><input id="profile-name" autoComplete="name" required minLength={2} maxLength={100} value={name} onChange={(event) => setName(event.target.value)} /></div>
              <div className="auth-field"><label htmlFor="profile-email">{t("Email address")}</label><input id="profile-email" type="email" value={session?.user?.email || ""} disabled /><small>{t("Email changes require verification and aren't available here.")}</small></div>
            </div>
            <div className="settings-form-footer"><span className="settings-feedback" role="status">{profileMessage || profileError}</span><button className="workspace-button" type="submit" disabled={savingProfile || !name.trim()}>{savingProfile ? t("Saving...") : t("Save profile")}</button></div>
          </form>
        </section>

        <section className="settings-section">
          <div className="settings-section-heading"><span className="settings-icon security"><KeyRound size={17} /></span><div><h2>{t("Password & security")}</h2><p>{t("Change your password and sign out other sessions.")}</p></div></div>
          <form className="settings-form" onSubmit={updatePassword}>
            <div className="settings-fields password-fields">
              <div className="auth-field"><label htmlFor="current-password">{t("Current password")}</label><input id="current-password" autoComplete="current-password" type="password" required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} /></div>
              <div className="auth-field"><label htmlFor="new-password">{t("New password")}</label><input id="new-password" autoComplete="new-password" type="password" required minLength={8} maxLength={128} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} /></div>
              <div className="auth-field"><label htmlFor="confirm-password">{t("Confirm new password")}</label><input id="confirm-password" autoComplete="new-password" type="password" required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></div>
            </div>
            <div className="settings-form-footer"><span className="settings-feedback" role="status">{passwordMessage || passwordError}</span><button className="workspace-button" type="submit" disabled={savingPassword || !currentPassword || !newPassword || !confirmPassword}>{savingPassword ? t("Updating...") : t("Update password")}</button></div>
          </form>
        </section>
        <p className="sample-note">{t("Account settings are saved securely through Better Auth.")}</p>
      </div>
    </DashboardLayout>
  );
}
