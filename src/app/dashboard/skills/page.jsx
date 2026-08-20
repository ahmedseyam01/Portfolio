"use client";

import { useState, useEffect } from "react";
import { Code2, Plus, Trash2 } from "lucide-react";

export default function ManageSkills() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSkill, setNewSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("frontend");

  const fetchSkills = async () => {
    setLoading(true);
    const res = await fetch('/api/skills');
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchSkills();
  }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedCategory, newSkill: newSkill.trim() })
    });

    setNewSkill("");
    fetchSkills();
  };

  const handleDelete = async (categoryId, skillName) => {
    if (confirm(`Remove ${skillName}?`)) {
      await fetch(`/api/skills?id=${categoryId}&skill=${encodeURIComponent(skillName)}`, {
        method: 'DELETE'
      });
      fetchSkills();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
            <Code2 className="text-[#C800DF]" /> Skills
          </h1>
          <p className="text-[#9ca3af]">Manage your technical stack and tools.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <form onSubmit={handleAddSkill} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl space-y-4 sticky top-6">
            <h2 className="text-xl font-bold text-white mb-4">Add New Skill</h2>
            <div>
              <label className="block text-sm text-[#9ca3af] mb-1">Category</label>
              <select 
                value={selectedCategory} 
                onChange={e => setSelectedCategory(e.target.value)} 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-[#C800DF] outline-none transition-colors"
              >
                {categories.map(c => (
                   <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#9ca3af] mb-1">Skill Name</label>
              <input 
                required 
                value={newSkill} 
                onChange={e => setNewSkill(e.target.value)} 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-[#C800DF] outline-none transition-colors" 
                placeholder="e.g. GraphQL" 
              />
            </div>
            <button type="submit" className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#C800DF] to-[#E60076] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">
               <Plus size={18} /> Add Skill
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="text-center text-[#9ca3af] py-12">Loading skills...</div>
          ) : (
            categories.map(category => (
              <div key={category.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">{category.emoji}</span> {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <div key={skill} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/5 group transition-all hover:border-[#C800DF]/30">
                      <span className="text-sm text-white/80">{skill}</span>
                      <button 
                        onClick={() => handleDelete(category.id, skill)}
                        className="text-[#9ca3af] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                         <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {category.skills.length === 0 && <span className="text-sm text-[#9ca3af]">No skills added yet.</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
