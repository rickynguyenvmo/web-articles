import { Container, Logo, LinkButton } from '@/components'

export const Header = () => {
  return (
    <div className="flex items-center h-16 bg-sky-100/50">
      <Container className="flex items-center gap-4 justify-between md:justify-start">
        <LinkButton to="/">
          <Logo height={56} width={56} />
        </LinkButton>
        <div>
          <LinkButton to="/" className="inline mr-4">
            Articles
          </LinkButton>
          <LinkButton to="/add" className="inline">
            Add new article
          </LinkButton>
        </div>
      </Container>
    </div>
  )
}
