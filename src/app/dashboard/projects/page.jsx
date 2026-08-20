"use client";

import { useState, useEffect } from "react";
import { FolderGit2, Plus, Trash2, Edit2, X } from "lucide-react";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingTitle, setEditingTitle] = useState(null);
  
  const initialFormState = {
    title: "",
    desc: "",
    tech: "",
    accent: "#C800DF",
    github: "",
    live: ""
  };
  
  const [formData, setFormData] = useState(initialFormState);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      }
    } catch (e) {
      console.error("Failed to fetch projects", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchProjects();
  }, []);

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const formattedProject = {
      ...formData,
      tech: formData.tech.split(',').map(t => t.trim())
    };

    if (editingTitle) {
      await fetch('/api/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalTitle: editingTitle, updatedProject: formattedProject })
      });
    } else {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedProject)
      });
    }

    setFormData(initialFormState);
    setIsAdding(false);
    setEditingTitle(null);
    fetchProjects();
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      tech: project.tech.join(', ')
    });
    setEditingTitle(project.title);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (title) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        const res = await fetch(`/api/projects?title=${encodeURIComponent(title)}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (res.ok) {
          if (Array.isArray(data.projects)) {
            setProjects(data.projects);
          } else {
            setProjects(prev => prev.filter(p => p.title.trim() !== title.trim()));
          }
        } else {
          alert(data.error || "Failed to delete project");
        }
      } catch (err) {
        console.error("Delete error:", err);
      } finally {
        fetchProjects();
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
            <FolderGit2 className="text-[#C800DF]" /> Projects
          </h1>
          <p className="text-[#9ca3af]">Manage your portfolio projects dynamically.</p>
        </div>
        <button 
          onClick={() => {
            if (isAdding) {
               setIsAdding(false);
               setEditingTitle(null);
               setFormData(initialFormState);
            } else {
               setIsAdding(true);
            }
          }}
          className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
        >
          {isAdding ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add New Project</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSaveProject} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingTitle ? "Edit Project" : "Add Project Details"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#9ca3af] mb-1">Title</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-[#C800DF] outline-none transition-colors" placeholder="e.g. Next.js Dashboard" />
            </div>
            <div>
              <label className="block text-sm text-[#9ca3af] mb-1">Accent Color</label>
              <div className="flex gap-2">
                 <input type="color" value={formData.accent} onChange={e => setFormData({...formData, accent: e.target.value})} className="h-12 w-12 rounded cursor-pointer bg-transparent border-0" />
                 <input required value={formData.accent} onChange={e => setFormData({...formData, accent: e.target.value})} className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-[#C800DF] outline-none transition-colors font-mono" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#9ca3af] mb-1">Description</label>
            <textarea required value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-[#C800DF] outline-none transition-colors min-h-[100px]" placeholder="Brief project description..." />
          </div>
          <div>
            <label className="block text-sm text-[#9ca3af] mb-1">Technologies (comma separated)</label>
            <input required value={formData.tech} onChange={e => setFormData({...formData, tech: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-[#C800DF] outline-none transition-colors" placeholder="React, Node.js, Tailwind" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#9ca3af] mb-1">GitHub URL</label>
              <input value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-[#C800DF] outline-none transition-colors" placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="block text-sm text-[#9ca3af] mb-1">Live URL</label>
              <input value={formData.live} onChange={e => setFormData({...formData, live: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-[#C800DF] outline-none transition-colors" placeholder="https://..." />
            </div>
          </div>
          <button type="submit" className="w-full mt-4 bg-gradient-to-r from-[#C800DF] to-[#E60076] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">
            {editingTitle ? "Save Changes" : "Save Project"}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center text-[#9ca3af] py-12">Loading projects...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map(project => (
            <div key={project.title} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex justify-between items-start group">
              <div className="flex-1">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.accent }} />
                   <h3 className="text-lg font-bold text-white">{project.title}</h3>
                 </div>
                 <p className="text-sm text-[#9ca3af] line-clamp-2 mb-3">{project.desc}</p>
                 <div className="flex gap-2 text-xs text-[#6b7280]">
                    {project.tech.slice(0, 3).join(', ')} {project.tech.length > 3 && '...'}
                 </div>
                 {(project.github || project.live) && (
                   <div className="mt-3 flex gap-3 text-xs">
                     {project.github && project.github !== '#' && <span className="text-[#C800DF]">GitHub Link Added</span>}
                     {project.live && project.live !== '#' && <span className="text-[#00b074]">Live Link Added</span>}
                   </div>
                 )}
              </div>
              <div className="flex gap-2 shrink-0 ml-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(project)}
                  className="p-2 text-[#9ca3af] hover:text-[#C800DF] hover:bg-[#C800DF]/10 rounded-lg transition-colors"
                  title="Edit Project"
                >
                   <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(project.title)}
                  className="p-2 text-[#9ca3af] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete Project"
                >
                   <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
