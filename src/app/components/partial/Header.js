'use client'
import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">

                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>

            <div className="navbar-end">
                <Link href='/admin' className='btn'>Admin</Link>
            </div>
        </div>
    )
}
