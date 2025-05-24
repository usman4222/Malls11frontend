import React, { useState, useEffect } from 'react'
import { Input } from "../../SiteComponents/ui/input"
import { Badge } from "../..//SiteComponents/ui/badge"
import { Button } from "../..//SiteComponents/ui/button"

const skills = [
  "Adobe Photoshop", "Artist", "Digital Marketing", "Support Agent",
  "Adobe XD", "Computer", "Front end Developer", "Translator",
  "Android Developer", "Developer", "IOS Developer", "Writer"
]


export function SkillsSearch({ onSkillsChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])

  useEffect(() => {
    const filteredSkills = skills.filter(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSuggestions(filteredSkills)
  }, [searchTerm])

  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill]
      setSelectedSkills(newSkills)
      onSkillsChange(newSkills)
    }
    setSearchTerm('')
  }

  const handleRemoveSkill = (skill) => {
    const newSkills = selectedSkills.filter(s => s !== skill)
    setSelectedSkills(newSkills)
    onSkillsChange(newSkills)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
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
          <Badge key={index} variant="secondary">
            {skill}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-4 w-4 p-0"
              onClick={() => handleRemoveSkill(skill)}
            >
              ×
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}

