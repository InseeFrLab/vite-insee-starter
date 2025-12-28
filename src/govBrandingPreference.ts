const GOV_BRANDING_SESSION_KEY = "govBrandingEnabled";

export const getStoredGovBrandingPreference = (): boolean | undefined => {
    const storedValue = sessionStorage.getItem(GOV_BRANDING_SESSION_KEY);

    if (storedValue === null) {
        return undefined;
    }

    return storedValue === "true";
};

export const persistGovBrandingPreference = (value: boolean) => {
    sessionStorage.setItem(GOV_BRANDING_SESSION_KEY, String(value));
};

export const shouldUseGovBranding = (): boolean => {
    const storedPreference = getStoredGovBrandingPreference();

    if (storedPreference !== undefined) {
        return storedPreference;
    }

    return import.meta.env.VITE_IS_GOV_INSTANCE === "true";
};
