'use client'

import React, { useState } from 'react'
import CommandPalette from './CommandPalette'

export default function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            {children}
            <CommandPalette open={open} onOpenChange={setOpen} />
        </>
    )
}
