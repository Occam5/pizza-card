'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ProfileEditProps {
  initialUrls: Array<{ platform: string; url: string }>
  onSave: (urls: Array<{ platform: string; url: string }>) => void
}

const connectionPlatforms = ['wechat', 'QQ', 'email', 'telegram', 'discord', 'phonenumber']
const socialMediaPlatforms = ['twitter', 'Facebook', 'ins', 'steam', 'GitHub', 'bilibili', '微博', '豆瓣', '小红书', '抖音']

export default function ProfileEdit({ initialUrls, onSave }: ProfileEditProps) {
  const [urls, setUrls] = useState(initialUrls)
  const [connectionOpen, setConnectionOpen] = useState(false)
  const [socialMediaOpen, setSocialMediaOpen] = useState(false)
  const [changedUrls, setChangedUrls] = useState<Set<string>>(new Set())

  useEffect(() => {
    setUrls(initialUrls)
  }, [initialUrls])

  const handleUrlChange = (platform: string, value: string) => {
    const index = urls.findIndex(url => url.platform === platform)
    if (index !== -1) {
      const newUrls = [...urls]
      newUrls[index].url = value
      setUrls(newUrls)
    } else {
      setUrls([...urls, { platform, url: value }])
    }
    setChangedUrls(new Set(changedUrls).add(platform))
  }

  const handleSave = (type: 'connection' | 'socialMedia') => {
    onSave(urls)
    setChangedUrls(new Set())
  }

  const renderUrlInputs = (platforms: string[]) => {
    return platforms.map(platform => {
      const url = urls.find(u => u.platform === platform)?.url || ''
      const isChanged = changedUrls.has(platform)
      return (
        <div key={platform} className="mb-2">
          <label className="block text-sm font-medium text-gray-700">{platform}</label>
          <input
            type="text"
            value={url}
            onChange={(e) => handleUrlChange(platform, e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
              isChanged ? 'text-gray-400' : 'text-gray-900'
            }`}
          />
        </div>
      )
    })
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <button
          onClick={() => setConnectionOpen(!connectionOpen)}
          className="w-full p-4 text-left font-semibold flex justify-between items-center bg-pizzapurple text-white rounded-lg"
        >
          Connection
          {connectionOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {connectionOpen && (
          <div className="p-4">
            {renderUrlInputs(connectionPlatforms)}
            <button
              onClick={() => handleSave('connection')}
              className="mt-4 w-full p-2 bg-blue-500 text-white rounded"
            >
              Save Connection
            </button>
          </div>
        )}
      </div>
      <div className="border rounded-md">
        <button
          onClick={() => setSocialMediaOpen(!socialMediaOpen)}
          className="w-full p-4 text-left font-semibold flex justify-between items-center bg-pizzapurple text-white rounded-lg"
        >
          Social Media
          {socialMediaOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {socialMediaOpen && (
          <div className="p-4">
            {renderUrlInputs(socialMediaPlatforms)}
            <button
              onClick={() => handleSave('socialMedia')}
              className="mt-4 w-full p-2 bg-blue-500 text-white rounded"
            >
              Save Social Media
            </button>
          </div>
        )}
      </div>
    </div>
  )
}