export function Footer() {
  return (
    <footer className="hidden border-t bg-gray-100 md:block">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} Energy Monitoring System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
