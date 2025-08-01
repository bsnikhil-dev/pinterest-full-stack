import React, { type ReactElement } from "react";

interface AsyncLoaderComponentProps {
    isLoading: boolean | null;
    loaderComponent: ReactElement;
    isError?: boolean;
    errorComponent?: ReactElement;
    contentComponent: ReactElement;
}

const AsyncLoaderComponent: React.FC<AsyncLoaderComponentProps> =
    ({ isLoading, loaderComponent, isError = false, errorComponent, contentComponent }) => {

        if (isLoading) return loaderComponent;
        if (isError) return errorComponent;
        return contentComponent;
    };

export default AsyncLoaderComponent;
