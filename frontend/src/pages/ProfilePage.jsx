import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, updateProfile } from "../utils/api";
import "./ProfilePage.css";
import "../components/CreateFinancialPlan.css";

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        fullNameAsPerPAN: "",
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        companyName: "",
        designation: "",
        isSmoker: false,
        hasChildren: false,
        numberOfChildren: 0,
        hasDependents: false,
        numberOfDependents: 0,
    });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getMe();
                const u = res.user || {};
                setForm((f) => ({
                    ...f,
                    fullNameAsPerPAN: u.fullNameAsPerPAN || u.name || "",
                    dateOfBirth: u.dateOfBirth ? new Date(u.dateOfBirth).toISOString().slice(0, 10) : "",
                    gender: u.gender || "",
                    maritalStatus: u.maritalStatus || "",
                    companyName: u.companyName || "",
                    designation: u.designation || "",
                    isSmoker: !!u.isSmoker,
                    hasChildren: !!u.hasChildren,
                    numberOfChildren: u.numberOfChildren || 0,
                    hasDependents: !!u.hasDependents,
                    numberOfDependents: u.numberOfDependents || 0,
                }));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const handleChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        try {
            // Validate date of birth: user must be at least 18 years old
            if (form.dateOfBirth) {
                const dob = new Date(form.dateOfBirth);
                const today = new Date();
                const age = today.getFullYear() - dob.getFullYear() - (today < new Date(dob.getFullYear() + (today.getFullYear() - dob.getFullYear()), dob.getMonth(), dob.getDate()) ? 1 : 0);
                const ageYears = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
                if (ageYears < 18) {
                    setError('You must be at least 18 years old');
                    return;
                }
            }
            const payload = { ...form };
            // convert date
            if (payload.dateOfBirth === "") delete payload.dateOfBirth;
            const res = await updateProfile(payload);
            setMessage('Profile updated successfully');
            // optionally update local user
            localStorage.setItem('user', JSON.stringify(res.user));
            setTimeout(() => navigate('/dashboard'), 900);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to save');
        }
    };

    if (loading) return <div className="page-loading">Loading...</div>;

    return (
        <div className="create-financial-plan">
            <div className="plan-header">
                <h2>Profile</h2>
                <p>Fill your personal details (as per PAN and other IDs)</p>
            </div>

            <div className="plan-content">
                <form className="profile-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Full Name (As per PAN)</label>
                            <input value={form.fullNameAsPerPAN} onChange={(e) => handleChange('fullNameAsPerPAN', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input type="date" value={form.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e.target.value)} />
                        </div>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Gender</label>
                            <select value={form.gender} onChange={(e) => handleChange('gender', e.target.value)}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Marital Status</label>
                            <select value={form.maritalStatus} onChange={(e) => handleChange('maritalStatus', e.target.value)}>
                                <option value="">Select</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Company Name</label>
                            <input value={form.companyName} onChange={(e) => handleChange('companyName', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <input value={form.designation} onChange={(e) => handleChange('designation', e.target.value)} />
                        </div>
                    </div>

                    <div className="form-row">
                        <label>
                            Are you a smoker?
                            <div className="radio-row">
                                <label><input type="radio" checked={form.isSmoker === true} onChange={() => handleChange('isSmoker', true)} /> Yes</label>
                                <label><input type="radio" checked={form.isSmoker === false} onChange={() => handleChange('isSmoker', false)} /> No</label>
                            </div>
                        </label>
                    </div>

                    <div className="form-row">
                        <label>
                            Are you blessed with children?
                            <div className="radio-row">
                                <label><input type="radio" checked={form.hasChildren === true} onChange={() => handleChange('hasChildren', true)} /> Yes</label>
                                <label><input type="radio" checked={form.hasChildren === false} onChange={() => handleChange('hasChildren', false)} /> No</label>
                            </div>
                        </label>
                    </div>

                    {form.hasChildren && (
                        <div className="form-row">
                            <label>
                                Number of Children
                                <input type="number" min="0" value={form.numberOfChildren} onChange={(e) => handleChange('numberOfChildren', Number(e.target.value))} />
                            </label>
                        </div>
                    )}

                    <div className="form-row">
                        <label>
                            Do you have any dependants?
                            <div className="radio-row">
                                <label><input type="radio" checked={form.hasDependents === true} onChange={() => handleChange('hasDependents', true)} /> Yes</label>
                                <label><input type="radio" checked={form.hasDependents === false} onChange={() => handleChange('hasDependents', false)} /> No</label>
                            </div>
                        </label>
                    </div>

                    {form.hasDependents && (
                        <div className="form-row">
                            <label>
                                Number of Dependents
                                <input type="number" min="0" value={form.numberOfDependents} onChange={(e) => handleChange('numberOfDependents', Number(e.target.value))} />
                            </label>
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
                    </div>

                    {error && <div className="form-error">{error}</div>}
                    {message && <div className="form-success">{message}</div>}
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
