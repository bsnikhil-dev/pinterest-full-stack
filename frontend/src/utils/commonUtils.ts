import type { Draft } from "@reduxjs/toolkit";

export const timeAgo = (dateString: string): string => {

    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (seconds < 60) return rtf.format(-seconds, 'second');
    if (minutes < 60) return rtf.format(-minutes, 'minute');
    if (hours < 24) return rtf.format(-hours, 'hour');
    return rtf.format(-days, 'day');
}

interface ErrorState {
    code: number | null;
    message: string | null;
}

export const resetError = (state: Draft<{ error: ErrorState }>) => {
    state.error.code = null;
    state.error.message = null;
}

interface ErrorPayload {
    code?: number;
    message?: string;
}

export const setErrorFromPayload = (
    state: Draft<{ error: ErrorState }>,
    payload?: ErrorPayload
) => {
    state.error.code = payload?.code ?? null;
    state.error.message = payload?.message ?? null;
};

export const checkErrorStatus = (error: { code: number | null; message: string | null }): boolean => {
    return !Object.values(error).every(value => !value);
}


