import { Logo } from "./logo";

export default function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-muted-foreground">
        <div className="flex items-center mb-4 sm:mb-0">
          <Logo className="h-8 w-auto text-foreground" />
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Roberto. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
