"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, routing } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

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
                    variant={locale === l ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => handleLocaleChange(l)}
                    className="uppercase"
                >
                    {l}
                </Button>
            ))}
        </div>
    );
}
