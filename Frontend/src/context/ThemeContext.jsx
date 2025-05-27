import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for stored preference or system preference
    const savedPreference = localStorage.getItem('darkMode')
    if (savedPreference !== null) {
      return savedPreference === 'true'
    }
    
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode)
  }
  
  // Update localStorage when darkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    
    // Update body class
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])
  
  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      // Only apply if user hasn't manually set a preference
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches)
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useDarkMode = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a ThemeProvider')
  }
  return context
}