import React, { useState, useEffect } from 'react'
import { Input } from "../../SiteComponents/ui/input"
import { Badge } from "../..//SiteComponents/ui/badge"
import { Button } from "../../SiteComponents/ui/button"
import data from '../../../data/job_skills.json';
const skills = data.skills || [];

export function SkillsSearch({ selectedSkills = [], onSkillsChange, ...props }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const filteredSkills = skills.filter(skill =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filteredSkills);
  }, [searchTerm]);

  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      onSkillsChange(newSkills);
    }
    setSearchTerm('');
  };

  const handleRemoveSkill = (skill) => {
    const newSkills = selectedSkills.filter(s => s !== skill);
    onSkillsChange(newSkills);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          {...props}
        />
        {searchTerm && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((skill, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleAddSkill(skill)}
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedSkills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="bg-gray-200">
            {skill}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-4 w-4 p-0 hover:bg-gray-300 cursor-pointer"
              onClick={() => handleRemoveSkill(skill)}
            >
              ×
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}