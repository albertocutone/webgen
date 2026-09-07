import { render, screen } from '@testing-library/react'
import App from '../../src/App.jsx'

describe('App', () => {
  it('renders the venue name as the page heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Masseria Mastrangelo')
  })
})
