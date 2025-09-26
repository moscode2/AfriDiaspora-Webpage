import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Globe } from "lucide-react";

interface Language {
  code: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", label: "English", flag: "gb" },
  { code: "de", label: "Deutsch", flag: "de" },
  { code: "fr", label: "Français", flag: "fr" },
  { code: "es", label: "Español", flag: "es" },
];

interface LanguageToggleProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export function LanguageToggle({
  currentLanguage,
  onLanguageChange,
}: LanguageToggleProps) {
  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <img
            src={`https://flagcdn.com/w20/${currentLang.flag}.png`}
            alt={currentLang.label}
            className="h-4 w-6 rounded-sm"
          />
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className="gap-3"
          >
            <img
              src={`https://flagcdn.com/w20/${language.flag}.png`}
              alt={language.label}
              className="h-4 w-6 rounded-sm"
            />
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}