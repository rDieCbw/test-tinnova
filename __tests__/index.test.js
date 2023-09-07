import { render, screen } from '@testing-library/react'
import Index from '../src/app/page'
 
describe('Home', () => {
  it('Home Screen', () => {
    render(<Index />)
 
    expect(screen.getAllByText("Sistema de cadastro de usuários")).toBeInTheDocument()
  })
})