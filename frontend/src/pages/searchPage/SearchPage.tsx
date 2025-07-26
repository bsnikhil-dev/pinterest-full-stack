import type React from "react"
import { useSearchParams } from "react-router"
import Gallery from "../../components/gallery/Gallery";

const SearchPage = (): React.ReactElement => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    return (
        <Gallery searchQuery={query as string} />
    )
}

export default SearchPage