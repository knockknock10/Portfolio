export function SiteFooter({ name }: { name: string }) {
  return (
    <footer className="sk-footer">
      <div className="sk-footer__inner">
        <span>
          © {new Date().getFullYear()} {name}
        </span>
        <span>
          Built with Next.js. Source on{" "}
          <a href="https://github.com/knockknock10/Portfolio" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </span>
      </div>
    </footer>
  )
}
