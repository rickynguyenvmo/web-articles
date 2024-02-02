import React from 'react'
import { Header } from '@/components'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => (
  <div className="h-screen w-full flex flex-col bg-sky-200/5">
    <Header />
    <Outlet />
  </div>
)
