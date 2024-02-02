import { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ArticleEditor, ArticleList, NotFound } from '@/pages'
import { MainLayout } from './layout'

function App(): ReactElement {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<ArticleList />} />
        <Route path="/add" element={<ArticleEditor key="add" />} />
        <Route path="/edit/:id" element={<ArticleEditor key="edit" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
