"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, routing } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex gap-2">
            {routing.locales.map((l) => (
                <Button
                    key={l}
                    variant={locale === l ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => handleLocaleChange(l)}
                    className={cn(
                        "uppercase font-medium",
                        locale !== l && "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                >
                    {l}
                </Button>
            ))}
        </div>
    );
}
