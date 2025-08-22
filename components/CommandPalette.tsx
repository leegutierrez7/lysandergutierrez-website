'use client'

import React, { useState, useEffect } from 'react'
import { Command } from 'cmdk'
import { Search, Home, User, Code, Mail, FileText, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CommandPaletteProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
    const router = useRouter()
    const [search, setSearch] = useState('')

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                onOpenChange(!open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [open, onOpenChange])

    const runCommand = (command: () => void) => {
        onOpenChange(false)
        command()
    }

    const commands = [
        {
            heading: 'Navigation',
            items: [
                {
                    icon: <Home className="w-4 h-4" />,
                    title: 'Home',
                    subtitle: 'Go to homepage',
                    action: () => router.push('/'),
                },
                {
                    icon: <User className="w-4 h-4" />,
                    title: 'About',
                    subtitle: 'Learn more about me',
                    action: () => router.push('/about'),
                },
                {
                    icon: <Code className="w-4 h-4" />,
                    title: 'Projects',
                    subtitle: 'View my work',
                    action: () => router.push('/projects'),
                },
                {
                    icon: <FileText className="w-4 h-4" />,
                    title: 'Blog',
                    subtitle: 'Read my articles',
                    action: () => router.push('/blog'),
                },
                {
                    icon: <Mail className="w-4 h-4" />,
                    title: 'Contact',
                    subtitle: 'Get in touch',
                    action: () => router.push('/contact'),
                },
            ],
        },
        {
            heading: 'External Links',
            items: [
                {
                    icon: <ExternalLink className="w-4 h-4" />,
                    title: 'GitHub',
                    subtitle: 'View my code repositories',
                    action: () => window.open('https://github.com/leegutierrez7', '_blank'),
                },
                {
                    icon: <ExternalLink className="w-4 h-4" />,
                    title: 'LinkedIn',
                    subtitle: 'Professional profile',
                    action: () => window.open('https://linkedin.com/in/lysandergutierrez', '_blank'),
                },
                {
                    icon: <ExternalLink className="w-4 h-4" />,
                    title: 'Resume',
                    subtitle: 'Download my resume',
                    action: () => window.open('/Lysander-Gutierrez-Resume.pdf', '_blank'),
                },
            ],
        },
    ]

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => onOpenChange(false)}
            />
            <Command className="relative mx-4 max-w-lg w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl">
                <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-4">
                    <Search className="w-4 h-4 mr-3 text-gray-400" />
                    <Command.Input
                        value={search}
                        onValueChange={setSearch}
                        placeholder="Type a command or search..."
                        className="flex-1 py-4 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
                    />
                    <kbd className="ml-auto text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        ESC
                    </kbd>
                </div>
                <Command.List className="max-h-96 overflow-y-auto p-2">
                    <Command.Empty className="py-6 text-center text-sm text-gray-500">
                        No results found.
                    </Command.Empty>
                    {commands.map((group) => (
                        <Command.Group key={group.heading} heading={group.heading}>
                            {group.items.map((item, index) => (
                                <Command.Item
                                    key={index}
                                    value={item.title}
                                    onSelect={() => runCommand(item.action)}
                                    className="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 data-[selected=true]:bg-gray-100 dark:data-[selected=true]:bg-gray-800"
                                >
                                    {item.icon}
                                    <div className="ml-3 flex-1">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {item.title}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {item.subtitle}
                                        </div>
                                    </div>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    ))}
                </Command.List>
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
                    Press <kbd className="bg-gray-100 dark:bg-gray-800 px-1 rounded">⌘K</kbd> to toggle
                </div>
            </Command>
        </div>
    )
}
