import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { changePassword } from "../../utils/api";
import "./ProfileDropdown.css";

const ProfileDropdown = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const toggle = () => setOpen((s) => !s);

  const goProfile = () => {
    setOpen(false);
    navigate("/profile");
  };

  const [showChangeForm, setShowChangeForm] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [error, setError] = React.useState(null);

  const openChangePassword = () => {
    setShowChangeForm(true);
  };

  const closeChangePassword = () => {
    setShowChangeForm(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage(null);
    setError(null);
  };

  const handleLogout = () => {
    setOpen(false);
    if (typeof onLogout === "function") onLogout();
  };

  const initials = (user?.name || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="profile-container" ref={ref}>
      <button className="profile-toggle" onClick={toggle} aria-expanded={open}>
        <div className="profile-pill">
          <div className="profile-avatar">
            {user?.avatar ? <img src={user.avatar} alt="avatar" /> : initials}
          </div>
          <span className="profile-label">{user?.name || "User"}</span>
          <span className={`profile-caret ${open ? "open" : ""}`}>▾</span>
        </div>
      </button>

      {open && (
        <div className="dropdown-menu-card" role="menu">
          <div className="profile-top">
            <div className="profile-top-left">
              <div className="profile-avatar large">
                {user?.avatar ? (
                  <img src={user.avatar} alt="avatar" />
                ) : (
                  initials
                )}
              </div>
              <div className="profile-info">
                <div className="profile-name">{user?.name || "User Name"}</div>
                <div className="profile-email">{user?.email || ""}</div>
              </div>
            </div>
          </div>

          <div className="menu-section">
            <button className="menu-item" onClick={goProfile}>
              Profile
            </button>
            <button className="menu-item" onClick={openChangePassword}>
              Change Password
            </button>
            <button className="menu-item logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
          {showChangeForm && (
            <div className="change-password-form">
              <div className="form-row">
                <input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="form-row">
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form-row">
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form-actions">
                <button
                  className="menu-item"
                  onClick={async () => {
                    setError(null);
                    setMessage(null);
                    if (!currentPassword || !newPassword) {
                      setError("Please fill all fields");
                      return;
                    }
                    if (newPassword !== confirmPassword) {
                      setError("New passwords do not match");
                      return;
                    }
                    if (newPassword.length < 6) {
                      setError("New password must be at least 6 characters");
                      return;
                    }
                    setLoading(true);
                    try {
                      const res = await changePassword({
                        currentPassword,
                        newPassword,
                      });
                      setMessage(res.message || "Password changed");
                      setTimeout(() => {
                        closeChangePassword();
                        setOpen(false);
                      }, 1000);
                    } catch (err) {
                      setError(
                        err.response?.data?.message ||
                          err.message ||
                          "Failed to change password"
                      );
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button className="menu-item" onClick={closeChangePassword}>
                  Cancel
                </button>
              </div>
              {error && <div className="form-error">{error}</div>}
              {message && <div className="form-success">{message}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ProfileDropdown.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
};

export default ProfileDropdown;
