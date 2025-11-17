import { Logo } from "./logo";

export default function Footer() {
  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex justify-center items-center mb-4">
          <Logo className="h-8 w-auto" />
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Bonito Landing. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
