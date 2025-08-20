
import React, { useContext, useState } from 'react';
import { ContentContext, DesktopContext } from '../App';
import type { Content, FileItem, Skills, About, EducationItem, Contact } from '../types';

// --- Reusable Styles ---
const inputStyle: React.CSSProperties = { width: '100%', padding: '8px', backgroundColor: 'var(--surface-light)', border: '2px inset var(--border-color-dark)', borderRadius: '0px', color: 'var(--text-primary)', marginBottom: '12px', fontFamily: 'var(--font-body)', fontSize: '18px' };
const textareaStyle: React.CSSProperties = { ...inputStyle, minHeight: '80px', resize: 'vertical' };
const buttonStyle: React.CSSProperties = { padding: '8px 16px', borderStyle: 'solid', borderWidth: '3px', borderColor: 'var(--border-color-light) var(--border-color-dark) var(--border-color-dark) var(--border-color-light)', backgroundColor: 'var(--surface-light)', color: 'var(--text-primary)', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontSize: '10px' };
const deleteButtonStyle: React.CSSProperties = { ...buttonStyle, backgroundColor: '#e94560', color: '#000', marginLeft: '8px' };
const sectionHeaderStyle: React.CSSProperties = { 
    marginTop: '24px', 
    backgroundColor: 'var(--surface-light)',
    padding: '8px 12px', 
    marginBottom: '16px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    border: '2px solid var(--border-color-dark)',
};
const itemBoxStyle: React.CSSProperties = { background: 'var(--surface)', padding: '12px', border: '2px solid var(--border-color-dark)', marginBottom: '12px' };
const labelStyle: React.CSSProperties = { fontFamily: 'var(--font-heading)', fontSize: '10px', display: 'block', marginBottom: '4px' };
// --- ---

const AdminPanelApp: React.FC = () => {
    const { content, setContent } = useContext(ContentContext);
    const { setAdminPassword } = useContext(DesktopContext);

    const [localContent, setLocalContent] = useState<Content>(content);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newSkillCategory, setNewSkillCategory] = useState('');

    const handleFileChange = (section: 'projects' | 'certificates', index: number, field: keyof FileItem, value: string) => {
        const updatedSection = [...localContent[section]];
        updatedSection[index] = { ...updatedSection[index], [field]: value };
        setLocalContent(prev => ({ ...prev, [section]: updatedSection }));
    };

    const handleAddItem = (section: 'projects' | 'certificates') => {
        const newItem: FileItem = { id: `${section.slice(0, 4)}-${Date.now()}`, title: 'New Item', description: '', url: '' };
        setLocalContent(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
    };

    const handleDeleteItem = (section: 'projects' | 'certificates', id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const updatedSection = localContent[section].filter(item => item.id !== id);
            setLocalContent(prev => ({ ...prev, [section]: updatedSection }));
        }
    };
    
    const handleEducationChange = (index: number, field: keyof EducationItem, value: string | string[]) => {
        const updatedEducation = [...localContent.education];
        updatedEducation[index] = { ...updatedEducation[index], [field]: value };
        setLocalContent(prev => ({ ...prev, education: updatedEducation }));
    };
    const handleAddEducation = () => {
        const newItem: EducationItem = { id: `edu-${Date.now()}`, degree: 'New Degree', institution: 'New Institution', period: '', details: [] };
        setLocalContent(prev => ({...prev, education: [...prev.education, newItem]}));
    };
    const handleDeleteEducation = (id: string) => {
        if (window.confirm('Are you sure you want to delete this education entry?')) {
            const updatedEducation = localContent.education.filter(item => item.id !== id);
            setLocalContent(prev => ({...prev, education: updatedEducation}));
        }
    };

    const handleSkillsChange = (category: keyof Skills, value: string) => {
        const skillsArray = value.split(',').map(s => s.trim());
        setLocalContent(prev => ({ ...prev, skills: { ...prev.skills, [category]: skillsArray } }));
    };
    const handleAddSkillCategory = () => {
        if (newSkillCategory && !localContent.skills[newSkillCategory]) {
            setLocalContent(prev => ({...prev, skills: {...prev.skills, [newSkillCategory]: []}}));
            setNewSkillCategory('');
        }
    };
    const handleDeleteSkillCategory = (category: string) => {
        if (window.confirm(`Are you sure you want to delete the "${category}" skill category?`)) {
            const newSkills = {...localContent.skills};
            delete newSkills[category];
            setLocalContent(prev => ({...prev, skills: newSkills}));
        }
    };
    
    const handleAboutChange = <K extends keyof About>(field: K, value: About[K]) => {
        setLocalContent(prev => ({ ...prev, about: { ...prev.about, [field]: value } }));
    };

    const handleAchievementChange = (index: number, value: string) => {
        const newAchievements = [...localContent.about.achievements];
        newAchievements[index] = value;
        handleAboutChange('achievements', newAchievements);
    };

    const handleAddAchievement = () => {
        const newAchievements = [...localContent.about.achievements, 'New Achievement'];
        handleAboutChange('achievements', newAchievements);
    };

    const handleDeleteAchievement = (index: number) => {
        if (window.confirm('Delete this achievement?')) {
            const newAchievements = localContent.about.achievements.filter((_, i) => i !== index);
            handleAboutChange('achievements', newAchievements);
        }
    };

    const handleContactChange = <K extends keyof Contact>(field: K, value: Contact[K]) => {
        setLocalContent(prev => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
    };

    const handlePasswordChange = () => {
        if (newPassword && newPassword === confirmPassword) {
            setAdminPassword(newPassword);
            setNewPassword(''); setConfirmPassword('');
            alert('Password changed successfully!');
        } else {
            alert('Passwords do not match or are empty.');
        }
    };
    const handleSave = () => {
        setContent(localContent);
        alert('Content saved!');
    };

    return (
        <div className="no-drag" style={{ height: '100%', overflowY: 'auto', paddingRight: '8px' }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
              <h2 style={{marginTop: 0, borderBottom: 'none', fontSize: '14px', margin: 0}}>CONTENT MANAGEMENT</h2>
              <button style={buttonStyle} onClick={handleSave}>Save All Changes</button>
            </div>
            
            <div style={sectionHeaderStyle}><h3 style={{fontSize: '12px', margin: 0}}>About Section</h3></div>
            <div style={itemBoxStyle}>
                <label style={labelStyle}>Name</label><input style={inputStyle} type="text" value={localContent.about.name} onChange={e => handleAboutChange('name', e.target.value)} />
                <label style={labelStyle}>Tagline</label><input style={inputStyle} type="text" value={localContent.about.tagline} onChange={e => handleAboutChange('tagline', e.target.value)} />
                <label style={labelStyle}>Professional Statement</label><textarea style={textareaStyle} value={localContent.about.professionalStatement} onChange={e => handleAboutChange('professionalStatement', e.target.value)} />
                <label style={labelStyle}>Photo URL</label><input style={inputStyle} type="text" value={localContent.about.photoUrl} onChange={e => handleAboutChange('photoUrl', e.target.value)} />
                
                <label style={{...labelStyle, marginTop: '12px'}}>Achievements</label>
                {localContent.about.achievements.map((ach, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <input style={{...inputStyle, marginBottom: 0, flexGrow: 1}} type="text" value={ach} onChange={e => handleAchievementChange(index, e.target.value)} />
                        <button style={{...deleteButtonStyle, marginLeft: '8px'}} onClick={() => handleDeleteAchievement(index)}>X</button>
                    </div>
                ))}
                <button style={{...buttonStyle, marginTop: '8px'}} onClick={handleAddAchievement}>Add Achievement</button>
            </div>

            <div style={sectionHeaderStyle}><h3 style={{fontSize: '12px', margin: 0}}>Contact & Socials</h3></div>
            <div style={itemBoxStyle}>
                <label style={labelStyle}>Email</label><input style={inputStyle} type="email" value={localContent.contact.email} onChange={e => handleContactChange('email', e.target.value)} />
                <label style={labelStyle}>Phone</label><input style={inputStyle} type="text" value={localContent.contact.phone} onChange={e => handleContactChange('phone', e.target.value)} />
                <label style={labelStyle}>LinkedIn URL</label><input style={inputStyle} type="text" value={localContent.contact.linkedin} onChange={e => handleContactChange('linkedin', e.target.value)} />
                <label style={labelStyle}>GitHub URL</label><input style={inputStyle} type="text" value={localContent.contact.github} onChange={e => handleContactChange('github', e.target.value)} />
            </div>

            <div style={sectionHeaderStyle}><h3 style={{fontSize: '12px', margin: 0}}>Skills</h3> <button style={buttonStyle} onClick={handleAddSkillCategory}>Add Category</button></div>
            <input style={inputStyle} type="text" value={newSkillCategory} onChange={e => setNewSkillCategory(e.target.value)} placeholder="New skill category name"/>
             {Object.entries(localContent.skills).map(([category, skills]) => (
                <div key={category} style={itemBoxStyle}>
                    <label style={labelStyle}>{category}</label>
                    <input style={inputStyle} type="text" value={skills.join(', ')} onChange={e => handleSkillsChange(category, e.target.value)} placeholder="Comma-separated skills"/>
                    <button style={deleteButtonStyle} onClick={() => handleDeleteSkillCategory(category)}>Delete Category</button>
                </div>
            ))}

            <div style={sectionHeaderStyle}><h3 style={{fontSize: '12px', margin: 0}}>Education</h3> <button style={buttonStyle} onClick={handleAddEducation}>Add Education</button></div>
             {localContent.education.map((item, index) => (
                <div key={item.id} style={itemBoxStyle}>
                    <label style={labelStyle}>Degree</label><input style={inputStyle} type="text" value={item.degree} onChange={e => handleEducationChange(index, 'degree', e.target.value)} />
                    <label style={labelStyle}>Institution</label><input style={inputStyle} type="text" value={item.institution} onChange={e => handleEducationChange(index, 'institution', e.target.value)} />
                    <label style={labelStyle}>Period</label><input style={inputStyle} type="text" value={item.period} onChange={e => handleEducationChange(index, 'period', e.target.value)} />
                    <label style={labelStyle}>Details (one per line)</label><textarea style={textareaStyle} value={item.details.join('\n')} onChange={e => handleEducationChange(index, 'details', e.target.value.split('\n'))} />
                    <button style={deleteButtonStyle} onClick={() => handleDeleteEducation(item.id)}>Delete</button>
                </div>
            ))}

            <div style={sectionHeaderStyle}><h3 style={{fontSize: '12px', margin: 0}}>Projects</h3> <button style={buttonStyle} onClick={() => handleAddItem('projects')}>Add Project</button></div>
            {localContent.projects.map((item, index) => (
                <div key={item.id} style={itemBoxStyle}>
                    <input style={inputStyle} type="text" value={item.title} onChange={e => handleFileChange('projects', index, 'title', e.target.value)} placeholder="Project Title"/>
                    <textarea style={textareaStyle} value={item.description} onChange={e => handleFileChange('projects', index, 'description', e.target.value)} placeholder="Description"/>
                    <input style={inputStyle} type="text" value={item.url || ''} onChange={e => handleFileChange('projects', index, 'url', e.target.value)} placeholder="Document URL"/>
                    <button style={deleteButtonStyle} onClick={() => handleDeleteItem('projects', item.id)}>Delete</button>
                </div>
            ))}
            
            <div style={sectionHeaderStyle}><h3 style={{fontSize: '12px', margin: 0}}>Certificates</h3> <button style={buttonStyle} onClick={() => handleAddItem('certificates')}>Add Certificate</button></div>
             {localContent.certificates.map((item, index) => (
                <div key={item.id} style={itemBoxStyle}>
                    <input style={inputStyle} type="text" value={item.title} onChange={e => handleFileChange('certificates', index, 'title', e.target.value)} placeholder="Certificate Title" />
                    <textarea style={textareaStyle} value={item.description} onChange={e => handleFileChange('certificates', index, 'description', e.target.value)} placeholder="Description"/>
                    <input style={inputStyle} type="text" value={item.url || ''} onChange={e => handleFileChange('certificates', index, 'url', e.target.value)} placeholder="Document URL"/>
                    <button style={deleteButtonStyle} onClick={() => handleDeleteItem('certificates', item.id)}>Delete</button>
                </div>
            ))}
            
            <div style={sectionHeaderStyle}><h3 style={{fontSize: '12px', margin: 0}}>Security</h3></div>
            <div style={itemBoxStyle}>
                <label style={labelStyle}>New Password</label>
                <input style={inputStyle} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" />
                <label style={labelStyle}>Confirm New Password</label>
                <input style={inputStyle} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
                <button style={buttonStyle} onClick={handlePasswordChange}>Change Password</button>
            </div>
        </div>
    );
};

export default AdminPanelApp;
