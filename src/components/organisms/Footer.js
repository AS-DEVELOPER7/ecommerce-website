export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container px-4 py-10 text-sm text-muted">
        © {new Date().getFullYear()} Aura Jewels. All rights reserved.
      </div>
    </footer>
  );
}
